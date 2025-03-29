import { Component } from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {AuthService} from '../services/Auth.Service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Zen';
  constructor(private authService: AuthService, private router: Router) {
  }
  logout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
