import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import {Observable} from 'rxjs';
import {UserRole} from '../app/login/UserRole';
import {UserUpdate} from '../app/login/UserUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) {}

  getAllUser(): Observable<UserRole[]>{
    return this.httpClient.get<UserRole[]>(`${environment.backendUrl}/user`);
  }
  updateUser(userUpdate: UserUpdate): Observable<UserUpdate>{
    return this.httpClient.patch<UserUpdate>(`${environment.backendUrl}/userUpdate/${userUpdate.id}`,userUpdate);

  }
}
