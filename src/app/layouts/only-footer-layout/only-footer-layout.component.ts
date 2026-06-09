import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-just-footer-layout',
  standalone: true,
  imports: [RouterOutlet, FooterComponent],
  templateUrl: './only-footer-layout.component.html',
  styleUrl: './only-footer-layout.component.css',
})
export class OnlyFooterLayoutComponent {}
