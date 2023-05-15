import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PuntoReciclaje, PuntoReciclajeDTO } from '../../model/PuntoReciclaje';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class RecyclingPointsService {

  constructor(private http: HttpClient) { }

  listar(): Observable<PuntoReciclaje[]> {
    return this.http.get<PuntoReciclaje[]>(baseUrl + '/' + 'puntoReciclaje' + '/' + 'listar');
  }

  guardar(puntoReciclaje : PuntoReciclajeDTO): Observable<any>
  {
    return this.http.post<any>(baseUrl + '/' + 'puntoReciclaje' + '/' + 'guardar', puntoReciclaje);
  }

  actualizar(puntoReciclaje : PuntoReciclajeDTO): Observable<any>
  {
    return this.http.put<any>(baseUrl + '/' + 'puntoReciclaje' + '/' + 'actualizar/' + puntoReciclaje.id, puntoReciclaje);
  }

  eliminar(id : number)
  {
    return this.http.delete<any>(baseUrl + '/' + 'puntoReciclaje' + '/' + 'eliminar/' + id);
  }
}
