import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import {Observable} from 'rxjs';
import {User} from '../app/login/user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private httpClient: HttpClient) {}

  createUser(user: User): Observable<User>{
    return this.httpClient.post<User>(`${environment.loginUrl}/register`,user);
  }
}
