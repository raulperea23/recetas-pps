import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-foto-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './foto-dialog.component.html',
  styleUrl: './foto-dialog.component.css',
})
export class FotoDialogComponent {
  zoom: number = 1;
  readonly zoomMin = 0.5;
  readonly zoomMax = 4;
  readonly zoomStep = 0.25;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { foto: string; nombre: string },
  ) {}

  zoomIn(): void {
    if (this.zoom < this.zoomMax)
      this.zoom = Math.round((this.zoom + this.zoomStep) * 100) / 100;
  }

  zoomOut(): void {
    if (this.zoom > this.zoomMin)
      this.zoom = Math.round((this.zoom - this.zoomStep) * 100) / 100;
  }

  resetZoom(): void {
    this.zoom = 1;
  }
}
