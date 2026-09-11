import { Extension, textInputRule } from '@tiptap/core';
import { FRACCIONES } from '../../models/fracciones';

/** Sustituye 1/2, 1/4… por ½, ¼… al escribir, como el autocorrector de Word. */
export const Fracciones = Extension.create({
  name: 'fracciones',

  addInputRules() {
    return Object.entries(FRACCIONES).map(([texto, simbolo]) =>
      textInputRule({
        // El espacio final evita convertir mientras se escribe un número mayor (1/25).
        find: new RegExp(`(?:^|\\s)(${texto.replace('/', '\\/')})\\s$`),
        replace: simbolo,
      }),
    );
  },
});
