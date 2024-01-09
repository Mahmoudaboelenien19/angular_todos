import { Component, Input, OnInit } from '@angular/core';
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
export class TodosComponent implements OnInit {
  @Input() todos: Todo[] = [];
  constructor() {}
  ngOnInit(): void {}
}
