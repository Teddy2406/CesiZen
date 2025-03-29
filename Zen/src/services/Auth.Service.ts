import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'authToken';

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
      .post(`${environment.loginUrl}/login`, credential, { responseType: 'text' })
      .subscribe({
        next: (response: string) => {
          if (response) {
            localStorage.setItem(this.tokenKey, response);
            this.router.navigate(['/']);
          } else {
            console.error('Aucun token reçu');
          }
        },
        error: (err) => {
          console.error('Erreur de connexion:', err);
          throw new Error('Échec de la connexion. Vérifiez vos identifiants.');
        },
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

  isAdmin(): boolean {
    return this.getRole() === 'Admin';
  }


}
