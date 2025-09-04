import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import {Observable} from 'rxjs';
import {UpdateRespiration} from '../app/interface/UpdateRespiration';
import {Respiration} from '../app/interface/Respiration';
import {AddRespiration} from '../app/interface/addRespiration';


@Injectable({
  providedIn: 'root'
})
export class RespirationService {

  constructor(private httpClient: HttpClient) {}

  getAllRespiration(): Observable<Respiration[]> {
    return this.httpClient.get<Respiration[]>(`${environment.backendUrl}/respiration`);
  }

  updateRespiration(respirationUpdate: UpdateRespiration): Observable<UpdateRespiration> {
    return this.httpClient.patch<UpdateRespiration>(`${environment.backendUrl}/respiration/${respirationUpdate.id}`, respirationUpdate);
  }

  deleteRespirationById(id: number): Observable<Respiration> {
    return this.httpClient.delete<Respiration>(`${environment.backendUrl}/respiration${id}`);
  }

  AddRespiration(addRespiration: AddRespiration): Observable<Respiration>{
    return this.httpClient.post<Respiration>(`${environment.backendUrl}/respiration`,addRespiration)
  }

}
