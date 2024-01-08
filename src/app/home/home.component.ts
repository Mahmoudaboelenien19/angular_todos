import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { TodosComponent } from '../todos/todos.component';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoFormComponent, TodosComponent, FiltersComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private title: Title) {}
  ngOnInit(): void {
    this.title.setTitle('home');
  }
}
