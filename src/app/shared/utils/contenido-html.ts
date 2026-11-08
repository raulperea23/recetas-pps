const PARECE_HTML = /<[a-z][\s\S]*>/i;

/** Recetas antiguas guardan texto plano: se escapa para que el HTML lo muestre tal cual. */
export function aHtml(valor: string | null | undefined): string {
  if (!valor) return '';
  if (PARECE_HTML.test(valor)) return valor;
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/** Quita las etiquetas HTML para poder comparar o buscar por texto. */
export function textoPlano(valor: string): string {
  return valor
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
}
