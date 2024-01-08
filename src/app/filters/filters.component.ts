import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  filters = ['All', 'Active', 'Completed'];
}
