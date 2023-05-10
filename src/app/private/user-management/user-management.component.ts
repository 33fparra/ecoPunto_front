import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  constructor() { }

  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
              
  ngOnInit(): void {
    // this.listarPuntos();
  }

  

  // markerPositions: google.maps.LatLngLiteral[] = [];
  // addMarker(event: google.maps.MapMouseEvent) {
  //   console.log(event)
  //   if (event.latLng != null)
  //   {
  //     let datos = event.latLng.toJSON();
  //     console.log(datos);
  //     this.pR.latitud = datos.lat;
  //     this.pR.longitud = datos.lng;
  //     this.pR.direccion = "lat " + datos.lat + " - lng " + datos.lng;
  //     this.markerPositions = [];
  //     this.markerPositions.push(event.latLng.toJSON());
  //   }
  // }

  // guardarPunto()
  // {
  //   this.pR.usuario_id = 1;
  //   console.log(this.pR);

  //   this.recyclingPoints.guardar(this.pR).subscribe(
  //   { 
  //     next: data =>
  //     {
  //       this.mensaje.MostrarMensaje(data?.mensaje);
  //       this.listarPuntos();
  //     }, 
  //     error: error => this.mensaje.MostrarMensaje("Ocurrió un error!")
  //   });


  // }

  // listarPuntos()
  // {
  //   this.recyclingPoints.listar().subscribe(data=>
  //   {
  //     this.listPuntoReciclaje = data;
  //     this.crearTabla(this.listPuntoReciclaje);
  //   });
  // }

  // crearTabla(data : PuntoReciclajeInterface[])
  // {
  //   this.dataSource = new MatTableDataSource<PuntoReciclajeInterface>(data);
  //   this.dataSource.paginator = this.paginator;
  // }
}


