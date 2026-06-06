export const CATEGORIAS = [
  'Desayuno',
  'Entrante',
  'Plato principal',
  'Segundo plato',
  'Postre',
] as const;

export const DIFICULTADES = ['Fácil', 'Media', 'Difícil'] as const;

export const UNIDADES_TIEMPO = ['minutos', 'horas'] as const;

export type Categoria = (typeof CATEGORIAS)[number];
export type Dificultad = (typeof DIFICULTADES)[number];
export type UnidadTiempo = (typeof UNIDADES_TIEMPO)[number];

export const PRODUCTOS = [
  'Carnes',
  'Verduras y Hortalizas',
  'Pescados y Mariscos',
  'Frutas',
] as const;

export type Producto = (typeof PRODUCTOS)[number];
