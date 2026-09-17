import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    CommonModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  private logoClickCount = 0;
  private logoClickTimer: any;

  constructor(private router: Router) {}

  onLogoClick(): void {
    this.logoClickCount++;
    if (this.logoClickCount === 1) {
      this.logoClickTimer = setTimeout(() => {
        this.router.navigate(['/']);
        this.logoClickCount = 0;
      }, 250);
    } else if (this.logoClickCount === 2) {
      clearTimeout(this.logoClickTimer);
      this.router.navigate(['/admin']);
      this.logoClickCount = 0;
    }
  }
}
