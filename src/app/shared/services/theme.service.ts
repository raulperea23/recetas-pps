import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly STORAGE_KEY = 'pps-theme';
  isDark = signal<boolean>(false);

  constructor() {
    this.init();
  }

  private init(): void {
    const guardado = localStorage.getItem(this.STORAGE_KEY);
    if (guardado) {
      this.setDark(guardado === 'dark');
    } else {
      const prefiereDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      this.setDark(prefiereDark);
    }
  }

  toggle(): void {
    this.setDark(!this.isDark());
  }

  private setDark(dark: boolean): void {
    this.isDark.set(dark);
    if (dark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem(this.STORAGE_KEY, dark ? 'dark' : 'light');
  }
}
