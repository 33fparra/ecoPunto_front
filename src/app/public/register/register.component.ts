import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { register } from '../model/usuario';
import { RegisterService } from '../service/usuario/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private register: RegisterService
  ) { this.inicializarFormulario(); }

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
    this.logs();
    let usuario: register =
    {
      nombre: this.formRegister.get('nombre').value,
      correoElectronico: this.formRegister.get('email').value,
      contrasena: this.formRegister.get('password').value,
      telefono: this.formRegister.get('telefono').value,
      direccion: this.formRegister.get('direccion').value,
      rol: {
        nombre: 'usuario'
      }
    }

    console.log(usuario);
    if (this.formRegister.valid) {
      this.register.registrarUsuario(usuario).subscribe(data => { console.log(data) });
    }

  }

  logs() {
    console.log(this.formRegister.get('nombre').value);
    console.log(this.formRegister.get('email').value);
    console.log(this.formRegister.get('password').value);
    console.log(this.formRegister.get('telefono').value);
    console.log(this.formRegister.get('direccion').value);
  }


}
