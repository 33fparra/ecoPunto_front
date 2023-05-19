import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActividadReciclaje } from '../../model/ActividadReciclaje';


const baseUrl = environment.HOST;

@Injectable({
  providedIn: 'root'
})
export class RecyclingActivityRegistrationService {

  constructor(private http: HttpClient) { }

  guardar(actividadReciclaje: ActividadReciclaje): Observable<any> {
    return this.http.post<any>(baseUrl + '/' + 'actividadReciclaje' + '/' + 'guardar', actividadReciclaje);
  }
}
