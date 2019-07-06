import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { NinoModel } from '../login/nino.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private url = 'https://agendapp-apirest.herokuapp.com/api';
  constructor(private http: HttpClient) { }

  // Obtener dias de agenda activa para un idnino
  getDiasActiva(id: number) {
    return this.http.get(`${this.url}/tareas/getactiva/${id}`);
  }

  // Obtener tareas para un iddia
  getTareasManana(id: number) {
    return this.http.get(`${this.url}/tareas/getmanana/${id}`);
  }

  getTareasTarde(id: number) {
    return this.http.get(`${this.url}/tareas/gettarde/${id}`);
  }

  getTareasNoche(id: number) {
    return this.http.get(`${this.url}/tareas/getnoche/${id}`);
  }

  completar(id: number) {
    return this.http.get(`${this.url}/tareas/completar/${id}`);
  }

  marcarPendiente(id: number) {
    return this.http.get(`${this.url}/tareas/marcarpendiente/${id}`);
  }

  login(nino: NinoModel) {
    const authData = {
      ...nino
    };

    return this.http.post(
      `${ this.url }/auth/loginapp`, authData
      ).pipe(
      map( resp => {
        // tslint:disable-next-line:no-string-literal
        this.guardarToken(resp['token']);
        return resp;
      })
    );
  }

  private guardarToken( token: string) {
    localStorage.setItem('tokenNino', token);
  }
}
