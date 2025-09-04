import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient: HttpClient) {}

  createEmail(emailData: { email: string }): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.resetUrl}/generate-email?email=${emailData.email}`,
      {}
    );
  }

  updateEmail(emailData: { token: string; newPassword: string }): Observable<any> {
    return this.httpClient.put<any>(
      `${environment.resetUrl}/update-password?token=${emailData.token}&newPassword=${emailData.newPassword}`,
      {}
    );
  }
}
