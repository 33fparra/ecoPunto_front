import { Component, OnInit, ElementRef } from '@angular/core';
import { LoginService } from '../service/usuario/login.service';
import { login } from '../model/usuario';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formulariosInvalido } from 'src/app/util/reutilizable';
import { MensajeService } from 'src/app/util/service/mensaje.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup
  logo: any
  constructor(private login: LoginService,
    private formBuilder: FormBuilder,
    private el: ElementRef,
    private mensaje: MensajeService,
    private router: Router,
  ) {
    if (localStorage.getItem('Login')) {
      this.router.navigate(['/dashboard']);
    }
  }
  ngOnInit(): void {
    const image = new Image();
    image.src = '../../../assets/logo/logo.png';
    image.onload = () => {
      this.logo = image.src;
    };
    this.InicializarFormulario()
  }
  InicializarFormulario() {
    this.formLogin = this.formBuilder.group({
      correo: ['', [Validators.required]],
      contrasena: ['', [Validators.required]],
    });
  }
  correoVacio: boolean
  contrasenaVacia: boolean
  validacionesDeInput() {
    this.correoVacio = (this.formLogin.get("correo").value == "");
    this.contrasenaVacia = (this.formLogin.get("contrasena").value == "");
  }
  logearse() {
    let login: login = {
      correoElectronico: this.formLogin.get("correo").value,
      contrasena: this.formLogin.get("contrasena").value
    }

    if (this.formLogin.invalid) {
      this.validacionesDeInput()
      formulariosInvalido(this.formLogin, this.el);
    } else {

      this.login.login(login).subscribe((data: any) => {
        console.log(data);

        if (data.mensaje == ' la contraseña o el usuario no existe') {
          this.mensaje.MostrarMensaje(data.mensaje)
        } else {
          localStorage.setItem('TipUser', data.tipUser);
          localStorage.setItem('user', data.mensaje.split(':')[1].trim());
          localStorage.setItem('email', this.formLogin.get("correo").value);
          this.mensaje.MostrarMensaje2(data.mensaje)

          this.router.navigate(['/dashboard']);
          localStorage.setItem('Login', 'true');
        }

      }, (error) => {
        this.mensaje.MostrarMensaje('Vuelve a Intentarlo')

      })
    }
  }
  registrar() {
    this.router.navigate(['/register']);
  }
}
