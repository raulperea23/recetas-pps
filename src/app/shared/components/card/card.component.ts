import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { trigger, transition, style, animate } from '@angular/animations';
import { Receta } from '../../models/receta.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatIcon],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate(
          '400ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class CardComponent {
  @Input() receta!: Receta;
  @Input() delay: number = 0;
}
