import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  anio: number = new Date().getFullYear();
  anchoVentana: number = window.innerWidth;

  constructor(public themeService: ThemeService) {}

  @HostListener('window:resize')
  onResize(): void {
    this.anchoVentana = window.innerWidth;
  }
}
