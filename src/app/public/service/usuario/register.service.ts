import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { register } from '../../model/usuario';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: register): Observable<register[]> {
    return this.http.post<register[]>(baseUrl + '/' + 'usuarios' + '/' + 'registrarse', usuario)
  }
}
