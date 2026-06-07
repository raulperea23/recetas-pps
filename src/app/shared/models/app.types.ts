export const CATEGORIAS = [
  'Panes y masas',
  'Salsas y vinagretas',
  'Desayunos, meriendas y sandwiches',
  'Aperitivos y entrantes',
  'Guarniciones y acompañamientos',
  'Sopas, consomés y cremas',
  'Ensaladas',
  'Huevos',
  'Hortalizas y verduras',
  'Arroces y cereales',
  'Legumbres',
  'Pastas',
  'Pollo, pavo y otras aves',
  'Carnes',
  'Pescados y mariscos',
  'Postres y helados',
  'Mermeladas, limonadas, batidos y licores',
] as const;

export const TIPOS_DE_PLATO = [
  'Desayuno',
  'Entrante',
  'Plato principal',
  'Segundo plato',
  'Postre',
] as const;

export const DIFICULTADES = ['Fácil', 'Media', 'Difícil'] as const;

export const UNIDADES_TIEMPO = ['minutos', 'horas'] as const;

export type Categoria = (typeof CATEGORIAS)[number];
export type TipoDePlato = (typeof TIPOS_DE_PLATO)[number];
export type Dificultad = (typeof DIFICULTADES)[number];
export type UnidadTiempo = (typeof UNIDADES_TIEMPO)[number];

export const PRODUCTOS = [
  'Carnes',
  'Verduras y Hortalizas',
  'Pescados y Mariscos',
  'Frutas',
] as const;

export type Producto = (typeof PRODUCTOS)[number];
