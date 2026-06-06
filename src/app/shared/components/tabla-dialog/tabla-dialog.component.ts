import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { allTables } from './tabla-dialog.config';

type TableKey = keyof typeof allTables;

@Component({
  selector: 'app-tabla-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './tabla-dialog.component.html',
  styleUrls: ['./tabla-dialog.component.css'],
})
export class TablaDialogComponent {
  tableConfig;

  constructor(@Inject(MAT_DIALOG_DATA) public data: TableKey) {
    this.tableConfig = allTables[data];
  }
}
