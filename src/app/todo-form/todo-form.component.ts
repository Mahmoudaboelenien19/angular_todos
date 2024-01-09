import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../todo.service';
import { Todo } from '../../shared/models/Todo';

@Component({
  selector: 'todo-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  @Output() addTodoEv = new EventEmitter<Todo>();
  userId: string = localStorage.getItem('userId') || '';
  constructor(private todoService: TodoService) {}
  btnContent: string = 'Add';
  inpVal = '';
  addTodo() {
    if (this.inpVal === '') return;
    this.todoService
      .addTodo({
        content: this.inpVal,
        userId: this.userId,
        isCompleted: false,
        createdAt: new Date(),
      })
      .subscribe((d: any) => {
        this.addTodoEv.emit(d as Todo);
        this.inpVal = '';
      });
  }
}
