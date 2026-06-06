import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-foto-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './foto-dialog.component.html',
  styleUrl: './foto-dialog.component.css',
})
export class FotoDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { foto: string; nombre: string },
  ) {}
}
