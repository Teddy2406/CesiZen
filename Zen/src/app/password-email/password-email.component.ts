import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { EmailService } from '../../services/email.Service';
import { UserReset } from './userReset';
import {UserProfile} from '../interface/UserProfile';

@Component({
  selector: 'app-password-email',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgIf
  ],
  templateUrl: './password-email.component.html',
  styleUrls: ['./password-email.component.css']
})
export class PasswordEmailComponent {
  userReset!: UserReset;
  user!: UserProfile;
  step = 1;
  enteredToken = '';
  newPassword = '';
  successMessage = '';
  errorMessage = '';

  constructor(private emailService: EmailService) {}

  // Méthode pour générer un token
  onGenerateToken() {
    // On réinitialise les messages
    this.successMessage = '';
    this.errorMessage = '';

    // Vérification de l'email
    if (!this.user.email) {
      this.errorMessage = 'Veuillez saisir un email.';
      return;
    }

    // Appel au service pour générer le token
    this.emailService.createEmail({ email: this.user.email })
      .subscribe({
        next: (response: string) => {
          const prefix = 'Votre token de réinitialisation est : ';
          if (response.startsWith(prefix)) {
            this.userReset.reset_token = response.substring(prefix.length);
          } else {
            this.userReset.reset_token = response;
          }
          this.step = 2;  // Passer à l'étape 2
          this.successMessage = 'Token généré avec succès.';
        },
        error: (err) => {
          this.errorMessage = err.error || 'Une erreur est survenue lors de la génération du token.';
        }
      });
  }

  // Méthode pour mettre à jour le mot de passe
  onUpdatePassword() {
    // On réinitialise les messages
    this.successMessage = '';
    this.errorMessage = '';

    // Vérification du token et du nouveau mot de passe
    if (!this.enteredToken || !this.newPassword) {
      this.errorMessage = 'Veuillez saisir le token et le nouveau mot de passe.';
      return;
    }

    // Appel au service pour mettre à jour le mot de passe
    this.emailService.updateEmail({
      token: this.enteredToken,
      newPassword: this.newPassword
    }).subscribe({
      next: (response: string) => {
        this.successMessage = response;
        this.step = 1;  // Retour à l'étape 1
        // Réinitialisation des champs
        this.userReset.reset_token = '';
        this.enteredToken = '';
        this.newPassword = '';
      },
      error: (err) => {
        this.errorMessage = err.error || 'Une erreur est survenue lors de la mise à jour du mot de passe.';
      }
    });
  }
}
