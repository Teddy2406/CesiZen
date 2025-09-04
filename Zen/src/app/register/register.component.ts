import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {User} from '../login/user';
import {NgForOf, NgIf} from '@angular/common';
import {RegisterService} from '../../services/register.Service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  users!: User[];
  isSubmitting = false;
  appliForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    phone_number: new FormControl('')
  });

  constructor(private registerService: RegisterService, private router: Router) {}


  submitUser(form: FormGroup) {
    if (form.valid) {
      const user: User = {
        username: form.value.username ?? '',
        email: form.value.email ?? '',
        password: form.value.password ?? '',
        phone_number: form.value.phone_number ?? ''
      };
      this.registerService.createUser(user).subscribe({
        next: (user) => {
          console.log('Utilisateur créé avec succès :', user);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Erreur lors de la création de l\'utilisateur :', err);
        }
      });
      form.reset();
    } else {
      console.error("Erreur dans le formulaire");
    }
  }
  trackByUser(index: number, user: any): any {
    return user.id || user.username || index;
  }

}
