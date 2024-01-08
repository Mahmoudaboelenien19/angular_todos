import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
export type User = {
  id?: number;
  username: string;
  email: string;
  password: string;
};
export type Msg = {};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  checkEmail(email: string) {
    return this.http.get<User[]>(`http://localhost:4000/users?email=${email}`);
  }
  getUsers() {
    return this.http.get<User[]>('http://localhost:4000/users');
  }
  Signup(user: User) {
    return this.http.post<User>('http://localhost:4000/users', user);
  }
  Login(email: string, password: string) {
    const users = this.getUsers().subscribe((data) => {});
  }
}
