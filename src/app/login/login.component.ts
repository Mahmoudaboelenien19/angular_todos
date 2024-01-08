import { User, UserService } from './../user.service';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EventService } from '../event.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatIconModule, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  login: any;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private events: EventService
  ) {}
  ngOnInit(): void {
    this.title.setTitle('Login');
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
      console.log(this.email);
    });
    this.login = new FormGroup({
      email: new FormControl(this.email, [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16),
      ]),
    });
  }

  loginSubmit() {
    const user = this.login.value;
    if (this.login.valid) {
      this.userService
        .checkEmail(user.email as string)
        .subscribe((u: User[]) => {
          if (!u.length) {
            this.toastr.warning("you aren't  registered !", '', {
              positionClass: 'toast-bottom-left',
            });
          } else {
            const checkPass = u[0].password === user.password;

            if (checkPass) {
              this.router.navigate(['/']);
              this.toastr.success('you successfully logged in !', '', {
                positionClass: 'toast-bottom-left',
              });
              localStorage.setItem('username', u[0].username);
              // i know it's bad practice to save id inside local storage
              //this a temp sol till i study ngrx/store
              localStorage.setItem('userId', String(u[0].id));
              this.events.emit('authenticateEvent', u[0]);
            } else {
              this.toastr.warning('wrong password !', '', {
                positionClass: 'toast-bottom-left',
              });
            }
          }
        });
    }
  }
}
