import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import {Observable} from 'rxjs';
import {Meditation} from '../app/interface/Meditation';
import {UpdateMeditation} from '../app/interface/UpdateMeditation';
import {AddMeditation} from '../app/interface/addMeditation';

@Injectable({
  providedIn: 'root'
})
export class MeditationService {

  constructor(private httpClient: HttpClient) {}

  getAllMeditation(): Observable<Meditation[]> {
    return this.httpClient.get<Meditation[]>(`${environment.backendUrl}/meditation`);
  }

  updateMeditation(meditationUpdate: UpdateMeditation): Observable<UpdateMeditation> {
    return this.httpClient.patch<UpdateMeditation>(`${environment.backendUrl}/meditation/${meditationUpdate.id}`, meditationUpdate);
  }

  deleteMeditationById(id: number): Observable<Meditation> {
    return this.httpClient.delete<Meditation>(`${environment.backendUrl}/meditation${id}`);
  }

  AddMeditation(addMeditation: AddMeditation): Observable<Meditation>{
    return this.httpClient.post<Meditation>(`${environment.backendUrl}/meditation`,addMeditation)
  }
}
