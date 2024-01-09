import { EventService } from './../event.service';
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
  @Output() updateToDo = new EventEmitter<Todo>();
  userId: string = localStorage.getItem('userId') || '';
  constructor(private todoService: TodoService, private events: EventService) {
    this.events.listen('updateTodo', (todo: Todo) => {
      this.inpVal = todo.content;
      this.btnContent = 'Update';
      this.updatedTodoId = todo.id as string;
    });
  }
  btnContent: string = 'Add';
  inpVal = '';
  updatedTodoId: string = '';
  submitTodoForm() {
    if (this.inpVal === '') return;
    if (this.btnContent === 'Add') {
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
    } else {
      this.todoService
        .updateTodo(this.updatedTodoId, {
          content: this.inpVal,
          userId: this.userId,
          isCompleted: false,
          createdAt: new Date(),
        })
        .subscribe((d: any) => {
          this.updateToDo.emit({ id: this.updatedTodoId, data: d } as any);
          this.inpVal = '';
          this.btnContent = 'Add';
          this.updatedTodoId = '';
        });
    }
  }
}
