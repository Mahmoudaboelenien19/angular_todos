import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../shared/models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private http: HttpClient) {}

  getTodos(userId: string) {
    return this.http.get('http://localhost:4000/todos?userId=' + userId);
  }
  addTodo(todo: Todo) {
    return this.http.post('http://localhost:4000/todos', todo);
  }
  deleteTodo(id: string) {
    return this.http.delete(`http://localhost:4000/todos/${id}`);
  }
  checkTodo(id: string, obj: Todo) {
    return this.http.patch(`http://localhost:4000/todos/${id}`, obj);
  }
  updateTodo(id: string, obj: Todo) {
    return this.http.patch(`http://localhost:4000/todos/${id}`, obj);
  }
}
