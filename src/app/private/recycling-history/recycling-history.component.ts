import { Component, OnInit } from '@angular/core';
import { HistorialReciclajePorUsuario } from 'src/app/public/model/ActividadReciclaje';
import { RecyclingActivityRegistrationService } from 'src/app/public/service/usuario/recycling-activity-registration.service';

@Component({
  selector: 'app-recycling-history',
  templateUrl: './recycling-history.component.html',
  styleUrls: ['./recycling-history.component.css']
})
export class RecyclingHistoryComponent implements OnInit {

  constructor(private recyclingActivityRegistrationService : RecyclingActivityRegistrationService) { }

  listaHistorialReciclajePorUsuario : HistorialReciclajePorUsuario[] = [];

  ngOnInit(): void {
    this.recyclingActivityRegistrationService.historialReciclajePorUsuario(Number(localStorage.getItem('id'))).subscribe(data =>
    {
      this.listaHistorialReciclajePorUsuario = data;
    })
  }

}
