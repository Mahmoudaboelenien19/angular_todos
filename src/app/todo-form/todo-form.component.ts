import { Component } from '@angular/core';

@Component({
  selector: 'todo-form',
  standalone: true,
  imports: [],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.css',
})
export class TodoFormComponent {
  btnContent: string = 'Add';
}
