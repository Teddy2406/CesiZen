import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {AuthService} from '../../services/Auth.Service';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],

})
export class LoginComponent {
  credentials = {
    username: '',
    password: '',
  };


  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.credentials);
  }
}
