import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import {Observable, throwError} from 'rxjs';
import {UserProfile} from '../app/interface/UserProfile';
import {UserProfileUpdate} from '../app/interface/UserProfileUpdate';
import {UserUpdateAdmin} from '../app/interface/UserUpdateAdmin';
import {UserDeleteConfirmation} from '../app/interface/UserDeleteConfirmation';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getAllUser(): Observable<UserProfile[]> {
    return this.httpClient.get<UserProfile[]>(`${environment.backendUrl}/user`);
  }

  updateUser(userUpdate: UserProfileUpdate): Observable<UserProfileUpdate> {
    return this.httpClient.patch<UserProfileUpdate>(`${environment.backendUrl}/userUpdate/${userUpdate.userId}`, userUpdate);
  }

  deleteUserById(id: number): Observable<UserProfile> {
    return this.httpClient.delete<UserProfile>(`${environment.backendUrl}/user/${id}`);
  }

  getUserById(id: number): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${environment.backendUrl}/user/${id}`);
  }

  changePassword(passwordData: UserUpdateAdmin): Observable<any> {
    return this.httpClient.patch(`${environment.backendUrl}/user/${passwordData.userId}/password`, {
      currentPassword: passwordData.currentPassword,
      newPassword: passwordData.newPassword
    });
  }
}
