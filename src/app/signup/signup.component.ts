import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidatorFn,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { User, UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  constructor(
    private title: Title,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.title.setTitle('Sign up');
  }
  signup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(16),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(16),
    ]),
    confirm: new FormControl('', [
      Validators.required,
      this.passwordMatchValidator(),
    ]),
  });

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.signup?.get('password')?.value;
      const confirm = control.value;
      return password === confirm ? null : { passwordMismatch: true };
    };
  }
  signupSubmit() {
    if (this.signup.valid) {
      const { confirm, ...user } = this.signup.value;

      //i do this pattern as i use json-server   these should be done on server
      this.userService.checkEmail(user.email as string).subscribe((u) => {
        if (u.length) {
          this.toastr.warning('you already registered', '', {
            positionClass: 'toast-bottom-left',
          });
        } else {
          this.userService.Signup(user as User).subscribe((data: User) => {
            if (data?.id) {
              this.signup.reset();
              this.router.navigate(['login'], {
                queryParams: { email: data.email },
              });
              this.toastr.success('you successfully registered', '', {
                positionClass: 'toast-bottom-left',
              });
            }
          });
        }
      });
    }
  }
}
