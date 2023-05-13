import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../model/usuario';
import { Observable } from 'rxjs';
const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class UseradminService {

  constructor(private http: HttpClient) { }

  getionarUsuario(): Observable<any[]> {
    return this.http.get<any[]>(baseUrl + '/' + 'usuarios' + '/' + 'listar' + "/" + 'todo')

  }
  eliminarUsuario(id: any): Observable<any[]> {
    return this.http.delete<any[]>(baseUrl + '/' + 'usuarios' + '/' + 'eliminar' + "/" + id);
  }
  editarUsuario(id: any, body: any): Observable<any[]> {
    return this.http.put<any[]>(baseUrl + '/' + 'usuarios' + '/' + 'editar' + "/" + id, body);
  }
}
