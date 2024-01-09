import { Component, Input } from '@angular/core';
import { Todo } from '../../shared/models/Todo';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';
import { TodoService } from '../todo.service';

@Component({
  selector: 'todo',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  @Input() todo!: Todo;
  constructor(private events: EventService, private todoService: TodoService) {}
  deleteTodo(id: string) {
    this.events.emit('deleteTodoEvent', this.todo);
    this.todoService.deleteTodo(id).subscribe();
  }
  checkTodo(id: string) {
    this.todoService
      .checkTodo(id, { ...this.todo, isCompleted: !this.todo.isCompleted })
      .subscribe((data) =>
        this.events.emit('checkTodo', { old: this.todo, new: data })
      );
  }
  updateTodo(id: string) {
    this.events.emit('updateTodo', this.todo);
  }
}
