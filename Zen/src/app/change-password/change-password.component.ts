import { Component } from '@angular/core';
import {AuthService} from '../../services/Auth.Service';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent {
  oldPassword = '';
  newPassword = '';

  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService) {}

  onChangePassword(): void {
    this.successMessage = '';
    this.errorMessage = '';

    this.authService.changePassword(this.oldPassword, this.newPassword).subscribe({
      next: (message: string) => {
        this.successMessage = message;
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: (error) => {
        this.errorMessage = error?.error || 'Une erreur est survenue.';
      },
    });
  }
}
