import { Component, OnInit, ViewChild } from '@angular/core';
import { PuntoReciclaje, PuntoReciclajeDTO, PuntoReciclajeInterface } from 'src/app/public/model/PuntoReciclaje';
import { RecyclingPointsService } from 'src/app/public/service/usuario/recycling-points.service';
import { MensajeService } from 'src/app/util/service/mensaje.service';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from 'src/app/util/components/delete/delete.component';

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
  prselect : PuntoReciclajeInterface = 
  {
    id: 0,
    direccion: '',
    horarioAtencion: '',
    latitud: 0,
    longitud: 0,
    telefono: '',
    nombre: ''
  };
  
  constructor(private recyclingPoints : RecyclingPointsService,
              private mensaje: MensajeService,
              private dialogo: MatDialog) { }

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
    this.pR.usuario_id = 1;
    console.log(this.pR);

    this.recyclingPoints.guardar(this.pR).subscribe(
    { 
      next: data =>
      {
        this.mensaje.MostrarMensaje(data?.mensaje);
        this.listarPuntos();
      }, 
      error: error => this.mensaje.MostrarMensaje("Ocurrió un error!")
    });


  }

  listarPuntos()
  {
    this.recyclingPoints.listar().subscribe(data=>
    {
      this.listPuntoReciclaje = data;
      console.log(this.listPuntoReciclaje)
      this.crearTabla(this.listPuntoReciclaje);
    });
  }

  crearTabla(data : PuntoReciclajeInterface[])
  {
    this.dataSource = new MatTableDataSource<PuntoReciclajeInterface>(data);
    this.dataSource.paginator = this.paginator;
  }

  seleccionar()
  {
    let data = this.listPuntoReciclaje.find(elem => elem.id == this.prselect.id);
    this.prselect.nombre = data.nombre;
    this.prselect.direccion = data.direccion;
    this.prselect.telefono = data.telefono;
    this.prselect.horarioAtencion = data.horarioAtencion;
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
    
    modal.afterClosed().subscribe((mensaje : string) =>
    {
      // if (mensaje == undefined) return;
      if (mensaje != 'CONFIRMAR') return;
      this.mensaje.MostrarMensaje(mensaje);
    });

  }
}
