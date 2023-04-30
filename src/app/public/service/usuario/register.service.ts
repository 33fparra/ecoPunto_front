import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { register } from '../../model/usuario';
import { environment } from 'src/environments/environment';

const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario : register)
  {
    return this.http.post<any>(baseUrl + '/' + 'usuarios' + '/' + 'registrarse', usuario)
  }
}
