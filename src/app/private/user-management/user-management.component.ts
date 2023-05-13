import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  nombreDeLasColumnas: string[] = ['id', 'nombre', 'correoElectronico', 'contrasena', 'direccion', 'telefono', 'rol', 'acciones'];
  dataSource = new MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  formAdmin: FormGroup;
  constructor(private userAdmin: UseradminService,
    private formBuilder: FormBuilder,
    ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.VariablesDELabel()
    this.InicializarFormulario()
    this.InicializarServicio()
  }
  title: string = ""
  nomUser: string = ""
  correo: string = ""
  contrasenia: string = ""
  direccion: string = ""
  telefono: string = ""
  boton: string = ""
  editar:boolean ;
  VariablesDELabel() {
    this.title = "Crear Usuario"
    this.nomUser = "Nuevo nombre Usuario :";
    this.correo = "Nuevo Correo Electrico :";
    this.contrasenia = "Nueva Contraseña :";
    this.direccion = "Nueva Dirección :";
    this.telefono = "Nuevo Telefono :";
    this.boton="Guardar";
    this.editar = true;
  }
  InicializarFormulario(){
    this.formAdmin = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
    });
  }
  listGestionarUsuario: any[] = []
  InicializarServicio() {
    this.userAdmin.getionarUsuario().subscribe(data => {
      this.listGestionarUsuario = data
      this.crearTabla(this.listGestionarUsuario);
    })
  }

  //grilla de editar
  editarid:any
  FuncionEditar(row:any){
    this.editarid=row.id;
   this.editar = false;
  }
  FuncionCloseEdit(){
  //  this.editar = true;
  }
  crearTabla(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
