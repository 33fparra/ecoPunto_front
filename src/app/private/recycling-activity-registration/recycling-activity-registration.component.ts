import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { ActividadReciclajeDTO } from 'src/app/public/model/ActividadReciclaje';
import { MaterialReciclable } from 'src/app/public/model/Material';
import { PuntoReciclajeInterface } from 'src/app/public/model/PuntoReciclaje';
import { PuntoReciclajeYMaterial } from 'src/app/public/model/PuntoReciclajeYMaterial';
import { RecyclingActivityRegistrationService } from 'src/app/public/service/usuario/recycling-activity-registration.service';
import { RecyclingPointsService } from 'src/app/public/service/usuario/recycling-points.service';
import { MensajeService } from 'src/app/util/service/mensaje.service';

@Component({
  selector: 'app-recycling-activity-registration',
  templateUrl: './recycling-activity-registration.component.html',
  styleUrls: ['./recycling-activity-registration.component.css']
})
export class RecyclingActivityRegistrationComponent implements OnInit {

  listPuntoReciclaje : PuntoReciclajeInterface[] = [];

  constructor(private recyclingPoints : RecyclingPointsService,
              private formBuilder: FormBuilder,
              private recyclingActivityRegistrationService : RecyclingActivityRegistrationService,
              private mensajeService : MensajeService) { }

  listaMateriales : MaterialReciclable[] = [];
  listaPuntosReciclajeYMaterial : PuntoReciclajeYMaterial[] = [];

  formulario = this.formBuilder.group({
    material: [],
    cantidad: [1],
    puntoReciclaje: [],
    fecha: ['']
  })


  ngOnInit(): void {
    this.listarPuntos();
    this.recyclingActivityRegistrationService.listarMaterialReciclable().subscribe(data =>
    {
      this.listaMateriales = data;
      this.formulario.get('material').setValue(this.listaMateriales[0]?.materialReciclableId);
    });

    this.recyclingActivityRegistrationService.listarPuntosMaterialYReciclaje().subscribe((data : PuntoReciclajeYMaterial[]) =>
    {
     this.listaPuntosReciclajeYMaterial = data;
     this.formulario.get('puntoReciclaje').setValue(this.listaPuntosReciclajeYMaterial[0]?.puntoMaterialId);
    })

    const fechaActual = new Date();
    const fechaActualISO = fechaActual.toISOString().substring(0, 10); // Obtener la fecha en formato ISO

    this.formulario.get('fecha').setValue(fechaActualISO);
  }

  async listarPuntos()
  {
    await firstValueFrom(this.recyclingPoints.listar()).then(data=>
    {
      this.listPuntoReciclaje = data;
    });

  }

  registrar()
  {
    let puntoReciclajeYMaterial = this.listaPuntosReciclajeYMaterial.find(item => item.puntoMaterialId == this.formulario.get('puntoReciclaje').value)

    if (puntoReciclajeYMaterial == undefined)
    {
      this.mensajeService.MostrarMensaje("Seleccione un punto reciclaje");
      return;
    }

    let actividadReciclaje : ActividadReciclajeDTO = new ActividadReciclajeDTO();
    actividadReciclaje.cantidad = this.formulario.get('cantidad').value;
    actividadReciclaje.fecha = this.formulario.get('fecha').value;
    actividadReciclaje.materialesReciclableId = this.formulario.get('material').value;
    actividadReciclaje.puntoMaterialId = puntoReciclajeYMaterial.puntoMaterialId;
    actividadReciclaje.usuario_id = Number(localStorage.getItem('id'));
    this.recyclingActivityRegistrationService.guardar(actividadReciclaje).subscribe(
    {

      next: data =>
      {
        this.mensajeService.MostrarMensaje(data?.mensaje);
      }, 
      error: error =>
      {
        if(error.error.mensaje != undefined)
        {
          this.mensajeService.MostrarMensaje(error.error.mensaje); 
          return;
        }

        this.mensajeService.MostrarMensaje("Ocurrió un error, por favor intente más tarde!");
      }
      
    });
  }
}
