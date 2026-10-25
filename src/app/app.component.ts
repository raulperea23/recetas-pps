import { Component, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { ThemeService } from './shared/services/theme.service';
import { RouterScrollService } from './shared/services/router-scroll.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly routerScroll = inject(RouterScrollService);
  title = 'recetas-pps';
  visible: boolean = false;

  constructor(public themeService: ThemeService) {}

  @HostListener('window:scroll')
  onScroll(): void {
    this.visible = window.scrollY > 500;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
