import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.Service';
import { UserProfileUpdate } from '../interface/UserProfileUpdate';
import {UserProfile} from '../interface/UserProfile';
import {Router} from '@angular/router';
import {AuthService} from '../../services/Auth.Service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule]
})
export class UserProfileComponent implements OnInit {
  IdModifiable!: number;
  users!: UserProfile[];
  user!: UserProfile;
  isAdmin: boolean = false;
  usersRole!: UserProfileUpdate[];
  error = '';
  applyForm = new FormGroup({
    username: new FormControl(''),
    email: new  FormControl(''),
    phone_number: new  FormControl('')
  })


  constructor(private userService: UserService, private router: Router, private authService: AuthService) {

  }

  ngOnInit(): void {
    const id = this.authService.getCurrentUserId();
    if (!id) { this.error = 'Aucun utilisateur connecté.'; return; }

    this.userService.getUserById(id).subscribe({
      next: u => this.user = u,
      error: () => this.error = 'Impossible de charger le profil.'
    });
  }

  updateProfile(form: FormGroup){
    if (!this.isAdmin) return;
    const userUpdate: UserProfileUpdate = {
      userId: this.IdModifiable ?? '',
      username: form.value.username ?? '',
      email: form.value.email ?? '',
      phone_number: form.value.phone_number ?? '',
      role: form.value.role ?? ''
    }
    this.userService.updateUser(userUpdate).subscribe(userUpdate => {
      const userAModifier = this.usersRole.filter(userList => userList.userId == userUpdate.userId).at(0);
      if (userAModifier) {
        userAModifier.userId = userUpdate.userId;
        userAModifier.username = userUpdate.username;
        userAModifier.email = userUpdate.email;
        userAModifier.phone_number = userUpdate.phone_number;
      }
    });
    form.reset()
  }
  goBack(): void {
    this.router.navigate(['/home']);
  }



}
