import {
  Directive,
  ElementRef,
  HostListener,
  Optional,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FRACCIONES } from '../models/fracciones';

// El espacio final evita convertir mientras se escribe un número mayor (1/25).
const PATRON = /(^|\s)(\d{1,2}\/\d{1,2})\s$/;

/** Sustituye 1/2, 1/4… por ½, ¼… al escribir, como el autocorrector de Word. */
@Directive({
  selector: 'input[appFracciones], textarea[appFracciones]',
  standalone: true,
})
export class FraccionesDirective {
  constructor(
    private el: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() @Self() private control: NgControl,
  ) {}

  @HostListener('input')
  onInput(): void {
    const campo = this.el.nativeElement;
    const cursor = campo.selectionStart ?? campo.value.length;
    const coincidencia = campo.value.slice(0, cursor).match(PATRON);
    if (!coincidencia) return;

    const simbolo = FRACCIONES[coincidencia[2]];
    if (!simbolo) return;

    const inicio = cursor - coincidencia[0].length + coincidencia[1].length;
    const valor =
      campo.value.slice(0, inicio) + simbolo + ' ' + campo.value.slice(cursor);

    if (this.control?.control) {
      this.control.control.setValue(valor);
    } else {
      campo.value = valor;
    }
    const posicion = inicio + simbolo.length + 1;
    campo.setSelectionRange(posicion, posicion);
  }
}
