import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css',
})
export class FiltersComponent {
  @Output() changeFilter = new EventEmitter<any>();
  @Input() filter: string = 'all';
  filters = ['all', 'active', 'completed'];

  applyNewFilter(filter: string) {
    this.changeFilter.emit(filter);
    console.log(filter);
  }
}
