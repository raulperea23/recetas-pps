export const CATEGORIAS = [
  'Panes y masas',
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

export const CATEGORIAS_NOMBRES_IMGS = {
  'Panes y masas': 'panes-y-masas',
  'Desayunos, meriendas y sandwiches': 'desayunos-meriendas-y-sandwiches',
  'Aperitivos y entrantes': 'aperitivos-y-entrantes',
  'Guarniciones y acompañamientos': 'guarniciones',
  'Sopas, consomés y cremas': 'sopas',
  Ensaladas: 'ensaladas',
  Huevos: 'huevos',
  'Hortalizas y verduras': 'hortalizas-y-verduras',
  'Arroces y cereales': 'arroces',
  Legumbres: 'legumbres',
  Pastas: 'pastas',
  'Pollo, pavo y otras aves': 'pollo',
  Carnes: 'carnes',
  'Pescados y mariscos': 'pescados-y-mariscos',
  'Postres y helados': 'postres-y-helados',
  'Mermeladas, limonadas, batidos y licores': 'brebajes',
} as const;

export const TIPOS_DE_PLATO = [
  'Desayuno',
  'Entrante',
  'Plato principal',
  'Segundo plato',
  'Postre',
] as const;
export const TIPOS_DE_PLATO_PLURALES = {
  Desayuno: 'Desayunos',
  Entrante: 'Entrantes',
  'Plato principal': 'Platos principales',
  'Segundo plato': 'Segundos platos',
  Postre: 'Postres',
} as const;

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
