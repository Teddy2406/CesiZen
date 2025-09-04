import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/Auth.Service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router, private authService: AuthService) {
  }
  logout() {
    setTimeout(() => {
      this.authService.logout();
      this.router.navigate(['/login']);
    }, 200);
  }
}
