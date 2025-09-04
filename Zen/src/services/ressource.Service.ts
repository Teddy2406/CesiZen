import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';
import {UpdateRessource} from '../app/interface/UpdateRessouce';
import {AddRessource} from '../app/interface/addRessource';
import {Ressource} from '../app/interface/Ressource';

@Injectable({
  providedIn: 'root'
})
export class RessourceService{

  constructor(private httpClient: HttpClient) {}
  getAllRessource(): Observable<Ressource[]> {
    return this.httpClient.get<Ressource[]>(`${environment.backendUrl}/ressource`);
  }

  updateRessource(ressourceUpdate: UpdateRessource): Observable<UpdateRessource> {
    return this.httpClient.patch<UpdateRessource>(`${environment.backendUrl}/ressource/${ressourceUpdate.id}`, ressourceUpdate);
  }

  deleteRessourceById(id: number): Observable<Ressource> {
    return this.httpClient.delete<Ressource>(`${environment.backendUrl}/ressource${id}`);
  }

  AddRessource(addRessource: AddRessource): Observable<Ressource>{
    return this.httpClient.post<Ressource>(`${environment.backendUrl}/ressource`, addRessource)
  }

}
