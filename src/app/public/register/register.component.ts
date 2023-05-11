import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from '../model/usuario';
import { RegisterService } from '../service/usuario/register.service';
import { formulariosInvalido } from 'src/app/util/reutilizable';
import { MensajeService } from 'src/app/util/service/mensaje.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private register: RegisterService,
    private el: ElementRef,
    private mensaje: MensajeService,
  ) {
    if (localStorage.getItem('Login')) {
      this.router.navigate(['/dashboard']);
    }
    this.inicializarFormulario();
  }

  ngOnInit(): void {

  }
  regresar() {
    this.router.navigate(['/login']);

  }

  inicializarFormulario() {
    this.formRegister = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      direccion: ['', [Validators.required]]
    });


  }

  registrar() {
    let usuario: register =
    {
      nombre: this.formRegister.get('nombre').value,
      correoElectronico: this.formRegister.get('email').value,
      contrasena: this.formRegister.get('password').value,
      direccion: this.formRegister.get('direccion').value,
      telefono: this.formRegister.get('telefono').value,
      rol: {
        nombre: 'Usuario'
      }
    }
    if (this.formRegister.valid) {
      console.log(usuario);

      this.register.registrarUsuario(usuario).subscribe((data: any) => {
        console.log(data);

        if (data.mensaje == 'El correo electronico ya esta en uso') {
          this.mensaje.MostrarMensaje(data.mensaje)
        } else {
          this.mensaje.MostrarMensaje(data.mensaje)
          this.router.navigate(['/login']);
        }
      }, (error) => {

        this.mensaje.MostrarMensaje('Error Vuelve a Intentarlo')
      });
    } else {
      formulariosInvalido(this.formRegister, this.el);
    }

  }
}
