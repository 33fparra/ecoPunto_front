import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from 'src/app/public/model/usuario';
import { UseradminService } from 'src/app/public/service/usuario/useradmin.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  nombreDeLasColumnas: string[] = ['id', 'nombre', 'correoElectronico','contrasena','direccion', 'telefono', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userAdmin: UseradminService) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.InicializarServicio()
  }
  listGestionarUsuario: any[] = []
  InicializarServicio() {
    this.userAdmin.getionarUsuario().subscribe(data => {
      this.listGestionarUsuario = data
      this.crearTabla(this.listGestionarUsuario);
    })
  }
  crearTabla(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
