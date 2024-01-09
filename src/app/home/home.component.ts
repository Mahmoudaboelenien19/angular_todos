import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodosComponent } from '../todos/todos.component';
import { FiltersComponent } from '../filters/filters.component';
import { Todo } from '../../shared/models/Todo';
import { TodoService } from '../todo.service';
import { CommonModule } from '@angular/common';
import { EventService } from '../event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoFormComponent, TodosComponent, FiltersComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  todos: Todo[] = [];
  filter: string = 'all';
  constructor(
    private title: Title,
    private todoService: TodoService,
    events: EventService
  ) {
    events.listen('deleteTodoEvent', (todo) => {
      const i = this.todos.indexOf(todo);
      console.log(i, todo);
      this.todos.splice(i, 1);
    });
    events.listen('checkTodo', ({ old, new: newObj }) => {
      const i = this.todos.indexOf(old);

      this.todos[i] = newObj;
    });
  }
  ngOnInit(): void {
    this.title.setTitle('home');
    this.todoService.getTodos().subscribe((data) => {
      this.todos = (data as Todo[])?.reverse();
    });
  }
  get shownTodos() {
    if (this.filter === 'active') {
      return this.todos.filter((todo) => !todo.isCompleted);
    } else if (this.filter === 'completed') {
      return this.todos.filter((todo) => todo.isCompleted);
    } else {
      return this.todos;
    }
  }
  updateTodo({ id, data }: any) {
    const index = this.todos.findIndex((todo) => todo.id == id);
    this.todos[index] = data;
  }
  applyFilters(filter: string) {
    this.filter = filter;
  }
}
