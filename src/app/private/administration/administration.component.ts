import { Component, OnInit, ViewChild } from '@angular/core';
import { PuntoReciclaje, PuntoReciclajeDTO, PuntoReciclajeInterface } from 'src/app/public/model/PuntoReciclaje';
import { RecyclingPointsService } from 'src/app/public/service/usuario/recycling-points.service';
import { MensajeService } from 'src/app/util/service/mensaje.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/util/components/delete/delete.component';
import { FormBuilder } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit 
{
  nombreDeLasColumnas : string[] = ['nombre', 'horario', 'telefono', 'direccion', 'latitud', 'longitud', 'acciones'];
  dataSource = new MatTableDataSource<PuntoReciclajeInterface>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  center: google.maps.LatLngLiteral = { lat: -27.251081979940714, lng: -70.55675856496084 };
  markerOptions: google.maps.MarkerOptions = { draggable: false };
  zoom = 6;

  tipodeUsuario: string = ""
  nombUsuario:string=""
  titleCab: string = ''

  pR : PuntoReciclajeDTO = new PuntoReciclajeDTO();
  listPuntoReciclaje : PuntoReciclajeInterface[] = [];
 
  constructor(private recyclingPoints : RecyclingPointsService,
              private mensaje: MensajeService,
              private dialogo: MatDialog,
              private formBuilder : FormBuilder) { }

  modificarForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      horaAtencion: [''],
      direccion: [''],
      latitud: [''],
      longitud: [''],
      telefono: ['']
  })

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
              
  ngOnInit(): void {
    this.listarPuntos();
    
    this.tipodeUsuario = localStorage.getItem('TipUser')
    this.nombUsuario = localStorage.getItem('user')
    this.titleCab = ` ${this.tipodeUsuario} , ${this.nombUsuario} : `
  }

  

  markerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent) {
    console.log(event)
    if (event.latLng != null)
    {
      let datos = event.latLng.toJSON();
      console.log(datos);
      this.pR.latitud = datos.lat;
      this.pR.longitud = datos.lng;
      this.pR.direccion = "lat " + datos.lat + " - lng " + datos.lng;
      this.markerPositions = [];
      this.markerPositions.push(event.latLng.toJSON());
    }
  }

  guardarPunto()
  {
    this.pR.usuario_id = Number(localStorage.getItem('id'));
    console.log(this.pR);

    this.recyclingPoints.guardar(this.pR).subscribe(
    { 
      next: async data =>
      {
        await this.listarPuntos();
        this.mensaje.MostrarMensaje(data?.mensaje);
      }, 
      error: error =>
      {
        if(error.error.mensaje != undefined)
        {
          this.mensaje.MostrarMensaje(error.error.mensaje); 
          return;
        }

        this.mensaje.MostrarMensaje("Ocurrió un error, por favor intente más tarde!");
      }
    });


  }

  async listarPuntos()
  {
    await firstValueFrom(this.recyclingPoints.listar()).then(data=>
    {
      this.listPuntoReciclaje = data;
      console.log(this.listPuntoReciclaje);
      this.crearTabla(this.listPuntoReciclaje);
    });
  }

  crearTabla(data : PuntoReciclajeInterface[])
  {
    this.dataSource = new MatTableDataSource<PuntoReciclajeInterface>(data);
    this.dataSource.paginator = this.paginator;
  }

  abrirModal(punto : PuntoReciclajeInterface)
  {
    const modal = this.dialogo.open(DeleteComponent, 
    {
      width : '400px', 
      height : '17%',
      data : {
        titulo : 'Eliminar',
        subtitulo : `¿Estas seguro que deseas eliminar ${punto.id} - ${punto.nombre}?`
      }
    })
    
    modal.afterClosed().subscribe(async (mensaje : string) =>
    {
      // if (mensaje == undefined) return;
      if (mensaje != 'CONFIRMAR') return;
      
      let data = undefined;
      await firstValueFrom(this.recyclingPoints.eliminar(punto.id)).then(async (data : any)=>
      {
        await this.listarPuntos();
        this.mensaje.MostrarMensaje(data?.mensaje);
      }, error =>
      {
        this.mensaje.MostrarMensaje("Ocurrio un error.");
      });

    });
  }

  puntoReciclaje : PuntoReciclajeDTO = new PuntoReciclajeDTO();

  llenarData(punto : PuntoReciclajeInterface)
  {
    this.puntoReciclaje.id = punto.id;
    this.modificarForm.get('nombre').setValue(punto.nombre);
    this.modificarForm.get('horaAtencion').setValue(punto.horarioAtencion);
    this.modificarForm.get('direccion').setValue(punto.direccion);
    this.modificarForm.get('telefono').setValue(punto.telefono);
    this.modificarForm.get('latitud').setValue(punto.latitud.toString());
    this.modificarForm.get('longitud').setValue(punto.longitud.toString());
  }

  modificar()
  {
    this.puntoReciclaje.nombre = this.modificarForm.get('nombre').value.trim();
    this.puntoReciclaje.horarioAtencion = this.modificarForm.get('horaAtencion').value.trim();
    this.puntoReciclaje.direccion = this.modificarForm.get('direccion').value.trim();
    this.puntoReciclaje.telefono = this.modificarForm.get('telefono').value.trim();
    this.puntoReciclaje.latitud = Number(this.modificarForm.get('latitud').value.trim());
    this.puntoReciclaje.longitud = Number(this.modificarForm.get('longitud').value.trim());
    this.puntoReciclaje.usuario_id = Number(localStorage.getItem('id'));

    console.log(this.puntoReciclaje);

    this.recyclingPoints.actualizar(this.puntoReciclaje).subscribe(async data =>
    {
      await this.listarPuntos();
      this.mensaje.MostrarMensaje(data?.msg);
    }, error =>
    {
      if(error.error.mensaje != undefined)
        {
          this.mensaje.MostrarMensaje(error.error.mensaje); 
          return;
        }

        this.mensaje.MostrarMensaje("Ocurrió un error, por favor intente más tarde!");
    })
    
  }
 
}
