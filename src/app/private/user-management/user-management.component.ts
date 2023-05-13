import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UseradminService } from 'src/app/public/service/usuario/useradmin.service';
import { DeleteComponent } from 'src/app/util/components/delete/delete.component';
import { formulariosInvalido } from 'src/app/util/reutilizable';
import { MensajeService } from 'src/app/util/service/mensaje.service';
import { MatSelect } from '@angular/material/select';
import { RegisterService } from 'src/app/public/service/usuario/register.service';
import { register } from 'src/app/public/model/usuario';
import { Router } from '@angular/router';
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
    private el: ElementRef,
    private dialogo: MatDialog,
    private mensaje: MensajeService,
    private register: RegisterService,
    private router: Router,

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
  rol: string = ""
  boton: string = ""
  VariablesDELabel() {
    this.title = "Crear Usuario"
    this.nomUser = "Nuevo nombre Usuario :";
    this.correo = "Nuevo Correo Electronico :";
    this.contrasenia = "Nueva Contraseña :";
    this.direccion = "Nueva Dirección :";
    this.telefono = "Nuevo Telefono :";
    this.rol = "Nuevo Rol";
    this.boton = "Guardar";
  }
  InicializarFormulario() {
    this.formAdmin = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      correo: ['', [Validators.required]],
      contrasenia: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      rol: ['', [Validators.required]],
    });
  }
  listGestionarUsuario: any[] = []
  InicializarServicio() {
    this.userAdmin.getionarUsuario().subscribe(data => {
      this.listGestionarUsuario = data
      this.crearTabla(this.listGestionarUsuario);
    })
  }
  FuncionCancelar() {
    this.dataRow = null
    this.title = "Crear Usuario"
    this.nomUser = "Nuevo nombre Usuario :";
    this.correo = "Nuevo Correo Electronico :";
    this.contrasenia = "Nueva Contraseña :";
    this.direccion = "Nueva Dirección :";
    this.telefono = "Nuevo Telefono :";
    this.rol = "Nuevo Rol";
    this.boton = "Guardar";
    this.formAdmin.reset();
    formulariosInvalido(this.formAdmin, this.el);

  }
  //boton editar y guardar
  r
  FuncionButton() {
    if (this.formAdmin.valid) {
      console.log('formulario valido');
      let usuario: register =
      {
        nombre: this.formAdmin.get('nombre').value,
        correoElectronico: this.formAdmin.get('correo').value,
        contrasena: this.formAdmin.get('contrasenia').value.trim(),
        direccion: this.formAdmin.get('direccion').value,
        telefono: this.formAdmin.get('telefono').value,
        rol: {
          nombre: this.formAdmin.get('rol').value
        }
      }
      if (this.boton == "Guardar") {
        this.register.registrarUsuario(usuario).subscribe((data: any) => {
          if (data.mensaje == 'El correo electronico ya esta en uso') {
            this.mensaje.MostrarMensaje(data.mensaje)
          } else {
            this.mensaje.MostrarMensaje(data.mensaje)
            this.InicializarServicio()
            this.formAdmin.reset();
            formulariosInvalido(this.formAdmin, this.el);
          }
        }, (error) => {
          this.mensaje.MostrarMensaje('Error Vuelve a Intentarlo')
        });
        console.log('guardando');
      } else {
        console.log('editando');
        this.userAdmin.editarUsuario(this.dataRowId, usuario).subscribe((data: any) => {
          if (data.mensaje == 'El correo electronico ya esta en uso') {
            this.mensaje.MostrarMensaje(data.mensaje)
          } else {
            console.log(this.dataRowcorreo);
            console.log(localStorage.getItem('email'));

            if (this.dataRowcorreo == localStorage.getItem('email')) {
              this.mensaje.MostrarMensaje('Has cambiado tu datos...!')
              localStorage.clear()
              this.router.navigate(['/login']);
            } else {
              this.mensaje.MostrarMensaje(data.mensaje)
              this.InicializarServicio()
              this.formAdmin.reset();
              formulariosInvalido(this.formAdmin, this.el);
            }
          }
        }, (error) => {
          this.mensaje.MostrarMensaje('Error Vuelve a Intentarlo')
        });
      }
    } else {
      console.log('formulario invalido');
      formulariosInvalido(this.formAdmin, this.el);
    }
  }
  //grilla de editar
  dataRow: any
  dataRowId: any
  dataRowcorreo: any

  FuncionEditar(row: any) {
    this.title = "Editar Usuarios"
    this.nomUser = "Editar nombre Usuario :";
    this.correo = "Editar Correo Electronico :";
    this.contrasenia = "Editar Contraseña :";
    this.direccion = "Editar Dirección :";
    this.telefono = "Editar Telefono :";
    this.rol = "Editar Rol";
    this.boton = "Editar";
    this.formAdmin.get('nombre').setValue(row.nombre)
    this.formAdmin.get('correo').setValue(row.correoElectronico)
    this.formAdmin.get('contrasenia').setValue(row.contrasena)
    this.formAdmin.get('direccion').setValue(row.direccion)
    this.formAdmin.get('telefono').setValue(row.telefono)
    this.formAdmin.get('rol').setValue(row.rol)
    this.dataRow = row
    this.dataRowId = row.id
    this.dataRowcorreo = row.correoElectronico
  }
  FuncionCloseEdit() {
    this.dataRow = null
    this.title = "Crear Usuario"
    this.nomUser = "Nuevo nombre Usuario :";
    this.correo = "Nuevo Correo Electronico :";
    this.contrasenia = "Nueva Contraseña :";
    this.direccion = "Nueva Dirección :";
    this.telefono = "Nuevo Telefono :";
    this.rol = "Nuevo Rol";
    this.boton = "Guardar";
    this.formAdmin.reset();
    formulariosInvalido(this.formAdmin, this.el);

  }
  FuncionEliminar(row) {
    const modal = this.dialogo.open(DeleteComponent,
      {
        width: '400px',
        height: '37%',
        data: {
          titulo: 'Eliminar',
          subtitulo: `¿Estas seguro que deseas eliminar ${row.id} - ${row.correoElectronico}?`
        }
      })
    modal.afterClosed().subscribe((mensaje: string) => {
      if (mensaje != 'CONFIRMAR') return;
      this.userAdmin.eliminarUsuario(row.id).subscribe((data: any) => {
        this.InicializarServicio()
        this.mensaje.MostrarMensaje(data.mensaje);
        formulariosInvalido(this.formAdmin, this.el);
      })
    });
    console.log('eliminando');

  }
  crearTabla(data: any) {
    this.dataSource = new MatTableDataSource<any>(data);
    this.dataSource.paginator = this.paginator;
  }
}
