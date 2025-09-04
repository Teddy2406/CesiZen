import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';
import {UserProfile} from '../app/interface/UserProfile';
import {BehaviorSubject} from 'rxjs';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';
  currentUser$ = new BehaviorSubject<UserProfile | null>(null);

  constructor(private httpClient: HttpClient, private router: Router) {}

  decodeJWT(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  login(credential: { username: string; password: string }) {
    this.httpClient
      .post<string>(`${environment.loginUrl}/login`, credential, {
        responseType: 'text' as 'json'
      })
      .subscribe({
        next: (token: string) => {
          if (!token) {
            console.error('Aucun token reçu'); return;
          }
          localStorage.setItem(this.tokenKey, token);

          /** ⤵️  On décode le JWT pour en extraire l’ID et le username  */
          const payload = JSON.parse(atob(token.split('.')[1]));
          const user: UserProfile = {
            userId: Number(payload.id),   // ou payload.id selon ton backend
            username: payload.username,
            email: payload.email,
            phone_number: payload.phone_number,
            role: payload.role
          };
          this.currentUser$.next(user);          // on pousse dans le BehaviorSubject

          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Erreur de connexion :', err);
          throw new Error('Échec de la connexion. Vérifiez vos identifiants.');
        }
      });
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = this.decodeJWT(token);
      return decodedToken.role || null;
    }
    return null;
  }
  getCurrentUserId(): number | null {
    const user = this.currentUser$.value;
    console.log('User courant récupéré :', user);
    return this.currentUser$.value?.userId ?? null;
  }

  // Nouvelle méthode pour récupérer le username depuis le JWT
  getCurrentUsername(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = this.decodeJWT(token);
        // Adapter selon la structure de votre JWT
        return decodedToken.username || decodedToken.user || decodedToken.name || null;
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }
    return null;
  }

  // Nouvelle méthode pour récupérer l'email depuis le JWT
  getCurrentUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      try {
        const decodedToken: any = this.decodeJWT(token);
        return decodedToken.email || null;
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }
    return null;
  }

  // Méthode pour récupérer toutes les infos du token décodé
  getCurrentUserInfo(): any {
    const token = this.getToken();
    if (token) {
      try {
        return this.decodeJWT(token);
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        return null;
      }
    }
    return null;
  }

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }

  changePassword(oldPassword: string, newPassword: string) {
    const url = `${environment.loginUrl}/change-password`;
    const body = { oldPassword, newPassword };

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    return this.httpClient.put(url, body, {
      headers,
      responseType: 'text',
    });
  }
  getTokenExpiration(): Date | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;

    const payload: any = jwtDecode(token);
    if (!payload.exp) return null;

    return new Date(payload.exp * 1000); // `exp` est en secondes UNIX
  }
  private expirationTimeout?: ReturnType<typeof setTimeout>;

  startAutoLogout(): void {
    const expiration = this.getTokenExpiration();
    if (!expiration) return;

    const now = new Date().getTime();
    const delay = expiration.getTime() - now;

    if (delay <= 0) {
      this.logout();
      return;
    }

    this.expirationTimeout = setTimeout(() => {
      alert("Votre session a expiré. Veuillez vous reconnecter.");
      this.logout();
    }, delay);
  }

}
