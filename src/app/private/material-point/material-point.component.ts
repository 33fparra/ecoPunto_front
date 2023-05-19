import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MaterialReciclable } from 'src/app/public/model/Material';
import { PuntoMaterialDTO } from 'src/app/public/model/PuntoMaterial';
import { PuntoReciclajeInterface } from 'src/app/public/model/PuntoReciclaje';
import { RecyclingActivityRegistrationService } from 'src/app/public/service/usuario/recycling-activity-registration.service';
import { RecyclingPointsService } from 'src/app/public/service/usuario/recycling-points.service';
import { MensajeService } from 'src/app/util/service/mensaje.service';

@Component({
  selector: 'app-material-point',
  templateUrl: './material-point.component.html',
  styleUrls: ['./material-point.component.css']
})
export class MaterialPointComponent implements OnInit {

  constructor(private formBuilder : FormBuilder,
            private recyclingActivityRegistrationService : RecyclingActivityRegistrationService,
            private recyclingPoints : RecyclingPointsService,
            private mensajeService : MensajeService) { }


  listaMateriales : MaterialReciclable[] = [];
  listPuntoReciclaje : PuntoReciclajeInterface[] = [];

  formulario = this.formBuilder.group({
    nombre : [''],
    descripcion : [''],
    reciclaje : [0],
    material : [0]
  })

  ngOnInit(): void 
  {
    this.recyclingActivityRegistrationService.listarMaterialReciclable().subscribe(data =>
    {
      this.listaMateriales = data;
      this.formulario.get('material').setValue(this.listaMateriales[0]?.materialReciclableId);
    });

    this.recyclingPoints.listar().subscribe(data =>
    {
      this.listPuntoReciclaje = data;
      this.formulario.get('reciclaje').setValue(this.listPuntoReciclaje[0]?.id);
    })
  }

  registrar()
  {
    let puntoMaterialDTO : PuntoMaterialDTO = new PuntoMaterialDTO();
    puntoMaterialDTO.nombre = this.formulario.get('nombre').value.trim();
    puntoMaterialDTO.descripcion = this.formulario.get('descripcion').value.trim();
    puntoMaterialDTO.puntoReciclajeId = Number(this.formulario.get('reciclaje').value);
    puntoMaterialDTO.materialReciclableId = Number(this.formulario.get('material').value);
    console.log(puntoMaterialDTO);

    this.recyclingActivityRegistrationService.guardarPuntoMaterial(puntoMaterialDTO).subscribe(
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
    })
  }
}
