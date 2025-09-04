import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {PasswordEmailComponent} from './password-email/password-email.component';
import {AuthGuard} from './guard/AuthGuard';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {HomeComponent} from './home/home.component';
import {ActivitesComponent} from './activites/activites.component';
import {RessourcesComponent} from './ressources/ressources.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {RespirationComponent} from './respiration/respiration.component';
import {MeditationComponent} from './meditation/meditation.component';
import {AdminComponent} from './admin/admin.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {DataProtectionComponent} from './data-protection/data-protection.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login'
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register'
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    title: 'change-password',
    canActivate: [AuthGuard]
  },
  {
    path: 'password-email',
    component: PasswordEmailComponent,
    title: 'password-email',
  },
  {

    path: 'user',
    component: UserProfileComponent,
    title: 'user',
    canActivate: [AuthGuard]
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'home',
  },
  {
    path: 'admin',
    component: AdminComponent,
    title: 'admin',
    canActivate: [AuthGuard]
  },

  {
    path: 'activites',
    component: ActivitesComponent,
    title: 'activites',
    canActivate: [AuthGuard]
  },
  {
    path: 'respiration',
    component: RespirationComponent,
    title: 'respiration',
    canActivate: [AuthGuard]
  },
  {
    path: 'ressources',
    component: RessourcesComponent,
    title: 'ressources',
    canActivate: [AuthGuard]
  },
  {
    path: 'meditation',
    component: MeditationComponent,
    title: 'meditation',
    canActivate: [AuthGuard]
  },
  {
    path: 'DataProtection',
    component: DataProtectionComponent,
    title: 'DataProtection',
  },
  {
    path: 'PrivacyPolicy',
    component: PrivacyPolicyComponent,
    title: 'PrivacyPolicy'
  },
  {
    path: 'TermsOfService',
    component: TermsOfServiceComponent,
    title: 'TermsOfService',
  },
  {
    path: '**',
    redirectTo: ''
  }
];
