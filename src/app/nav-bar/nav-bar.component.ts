import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { EventService } from '../event.service';
import { User } from '../user.service';

@Component({
  selector: 'nav-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  constructor(public router: Router, private events: EventService) {
    events.listen('authenticateEvent', (user: User) => {
      this.username = user?.username;
      this.isAuthenticated = Boolean(user?.id);
    });
  }
  isAuthenticated = localStorage.getItem('userId') ? true : false;
  username = localStorage.getItem('username');

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }
}
