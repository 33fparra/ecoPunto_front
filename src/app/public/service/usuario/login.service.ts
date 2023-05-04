import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { login } from '../../model/usuario';
import { Observable } from 'rxjs';

const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  
  login(crear: login): Observable<login[]> {
    return this.http.post<login[]>(baseUrl + '/' + 'usuarios' + '/' + 'login', crear)
  }
}
