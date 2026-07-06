import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  anio: number = new Date().getFullYear();
  anchoVentana: number = window.innerWidth;

  @HostListener('window:resize')
  onResize(): void {
    this.anchoVentana = window.innerWidth;
  }
}
