import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActividadReciclaje, ActividadReciclajeDTO } from '../../model/ActividadReciclaje';
import { MaterialReciclable } from '../../model/Material';
import { PuntoReciclajeYMaterial } from '../../model/PuntoReciclajeYMaterial';


const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class RecyclingActivityRegistrationService {

  constructor(private http: HttpClient) { }

  guardar(actividadReciclaje: ActividadReciclajeDTO): Observable<any> {
    return this.http.post<any>(baseUrl + '/' + 'actividadReciclaje' + '/' + 'guardar', actividadReciclaje);
  }

  listarMaterialReciclable() : Observable<MaterialReciclable[]>
  {
    return this.http.get<MaterialReciclable[]>(baseUrl + '/' + 'materialReciclable' + '/' + 'listar');
  }

  listarPuntosMaterialYReciclaje() : Observable<PuntoReciclajeYMaterial[]>
  {
    return this.http.get<PuntoReciclajeYMaterial[]>(baseUrl + '/' + 'puntoMaterial' + '/' + 'listarPuntosMaterialYReciclaje');
  }

  historialReciclajePorUsuario(id : number)
  {
    return this.http.get<any>(baseUrl + '/' + 'actividadReciclaje' + '/' + 'historialReciclajePorUsuario/' + id);
  }
}
