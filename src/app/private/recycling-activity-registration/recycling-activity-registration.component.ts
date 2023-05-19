import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ActividadReciclaje } from 'src/app/public/model/ActividadReciclaje';
import { PuntoReciclajeInterface } from 'src/app/public/model/PuntoReciclaje';
import { RecyclingActivityRegistrationService } from 'src/app/public/service/usuario/recycling-activity-registration.service';
import { RecyclingPointsService } from 'src/app/public/service/usuario/recycling-points.service';

@Component({
  selector: 'app-recycling-activity-registration',
  templateUrl: './recycling-activity-registration.component.html',
  styleUrls: ['./recycling-activity-registration.component.css']
})
export class RecyclingActivityRegistrationComponent implements OnInit {

  listPuntoReciclaje : PuntoReciclajeInterface[] = [];

  constructor(private recyclingPoints : RecyclingPointsService,
              private formBuilder: FormBuilder,
              private recyclingActivityRegistrationService : RecyclingActivityRegistrationService) { }

  xd = this.formBuilder.group({
    material: [''],
    cantidad: [1],
    puntoReciclaje: [''],
    fecha: ['']
  })

  ngOnInit(): void {
    this.listarPuntos();
  }

  async listarPuntos()
  {
    await firstValueFrom(this.recyclingPoints.listar()).then(data=>
    {
      this.listPuntoReciclaje = data;
      console.log(this.listPuntoReciclaje);
    });
  }

  registrar()
  {
    let puntoReciclaje = this.listPuntoReciclaje.find(elemento => elemento.nombre.toUpperCase() === this.xd.get('puntoReciclaje').value.toUpperCase().trim())
    console.log(puntoReciclaje)
    console.log(this.xd.value)

    let actividadReciclaje : ActividadReciclaje = new ActividadReciclaje();
    actividadReciclaje.cantidad = this.xd.get('cantidad').value;
    actividadReciclaje.fecha = this.xd.get('fecha').value;
    actividadReciclaje.tipoMaterial = 1;

    this.recyclingActivityRegistrationService.guardar(actividadReciclaje).subscribe(data =>
    {
      console.log(data);
    });
  }
}
