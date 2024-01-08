import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/models/Todo';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo!: Todo;
}
