export interface ContenidoEnlazable {
  clave: string;
  nombre: string;
  href: string;
  exacto: boolean;
}

interface Palabra {
  texto: string;
  inicio: number;
  fin: number;
}

const PALABRAS_COMUNES = new Set(
  'a al algo bien como con consejos de del el en entre es esta este etc hora la las lo los o para por que se sin su sus truco un una unos unas y'.split(' '),
);

function palabras(texto: string): Palabra[] {
  return Array.from(texto.matchAll(/[\p{L}\p{N}_][\p{L}\p{M}\p{N}_]*/gu), (m) => ({
    texto: m[0].toLocaleLowerCase('es'),
    inicio: m.index,
    fin: m.index + m[0].length,
  }));
}

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/\p{M}/gu, '');
}

function frases(nombre: string): string[][] {
  const tokens = palabras(nombre);
  const resultado: string[][] = [];
  for (let inicio = 0; inicio < tokens.length; inicio++) {
    const frase: string[] = [];
    for (let fin = inicio; fin < tokens.length; fin++) {
      if (
        fin > inicio &&
        !/^\s+$/u.test(nombre.slice(tokens[fin - 1].fin, tokens[fin].inicio))
      ) break;
      frase.push(normalizar(tokens[fin].texto));
      if (
        frase.length >= 2 &&
        !PALABRAS_COMUNES.has(frase[0]) &&
        !PALABRAS_COMUNES.has(frase[frase.length - 1]) &&
        frase.filter((p) => !PALABRAS_COMUNES.has(p)).length >= 2
      ) {
        resultado.push([...frase]);
      }
    }
  }
  return resultado;
}

export function enlazarContenidos(
  html: string,
  contenidos: ContenidoEnlazable[],
  document: Document,
): string {
  if (!html) return html;
  const contenedor = document.createElement('div');
  contenedor.innerHTML = html;
  const pendientes = new Set(contenidos.map((c) => c.clave));
  const candidatos = contenidos.map((contenido) => ({
    contenido,
    frases: contenido.exacto ? [] : frases(contenido.nombre),
  }));
  const walker = document.createTreeWalker(contenedor, NodeFilter.SHOW_TEXT);
  const nodos: Text[] = [];
  while (walker.nextNode()) {
    const nodo = walker.currentNode;
    if (
      nodo instanceof Text &&
      !nodo.parentElement?.closest('a, script, style, code, pre, textarea')
    ) nodos.push(nodo);
  }

  for (const nodo of nodos) {
    const texto = nodo.data;
    const tokens = palabras(texto);
    const coincidencias: {
      inicio: number;
      fin: number;
      contenido: ContenidoEnlazable;
    }[] = [];
    for (const { contenido, frases } of candidatos) {
      if (contenido.exacto) {
        const escapado = contenido.nombre.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const patron = new RegExp(
          `(^|[^\\p{L}\\p{N}_])(${escapado})(?=[^\\p{L}\\p{N}_]|$)`,
          'giu',
        );
        for (const m of texto.matchAll(patron)) {
          const inicio = m.index + m[1].length;
          coincidencias.push({ inicio, fin: inicio + m[2].length, contenido });
        }
        continue;
      }
      for (let i = 0; i < tokens.length; i++) {
        for (const frase of frases) {
          if (i + frase.length > tokens.length) continue;
          const coincide = frase.every((palabra, j) =>
            normalizar(tokens[i + j].texto) === palabra &&
            (j === 0 || /^\s+$/u.test(
              texto.slice(tokens[i + j - 1].fin, tokens[i + j].inicio),
            )),
          );
          if (coincide) {
            coincidencias.push({
              inicio: tokens[i].inicio,
              fin: tokens[i + frase.length - 1].fin,
              contenido,
            });
          }
        }
      }
    }
    coincidencias.sort((a, b) =>
      a.inicio - b.inicio ||
      Number(b.contenido.exacto) - Number(a.contenido.exacto) ||
      b.fin - a.fin,
    );
    const fragmento = document.createDocumentFragment();
    let cursor = 0;
    for (const match of coincidencias) {
      if (match.inicio < cursor || !pendientes.has(match.contenido.clave)) continue;
      const ambiguo = coincidencias.some((otra) =>
        otra.inicio === match.inicio &&
        otra.fin === match.fin &&
        otra.contenido.exacto === match.contenido.exacto &&
        otra.contenido.clave !== match.contenido.clave,
      );
      if (ambiguo) continue;
      const enlace = document.createElement('a');
      enlace.href = match.contenido.href;
      enlace.className = 'enlace-salsa';
      enlace.title = match.contenido.nombre;
      enlace.textContent = texto.slice(match.inicio, match.fin);
      fragmento.append(texto.slice(cursor, match.inicio), enlace);
      cursor = match.fin;
      pendientes.delete(match.contenido.clave);
    }
    if (cursor > 0) {
      fragmento.append(texto.slice(cursor));
      nodo.replaceWith(fragmento);
    }
  }
  return contenedor.innerHTML;
}
