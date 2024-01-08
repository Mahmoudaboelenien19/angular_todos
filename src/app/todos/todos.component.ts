import { Component } from '@angular/core';
import { TodoComponent } from '../todo/todo.component';
import { CommonModule } from '@angular/common';
import { Todo } from '../../shared/models/Todo';

@Component({
  selector: 'todos',
  standalone: true,
  imports: [TodoComponent, CommonModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
})
export class TodosComponent {
  todos: Todo[] = [
    {
      content: 'todo1',
      id: 1,
      userId: 1,
      isCompleted: false,
      createdAt: '2022-11-22T10:24:37.000Z',
    },
    {
      content: 'todo1',
      id: 1,
      userId: 1,
      isCompleted: false,
      createdAt: '2022-11-22T10:24:37.000Z',
    },
  ];
  get shownTodos() {
    return this.todos;
  }
}
