import { Rol } from "./Rol";

export interface login {
  correoElectronico: string,
  contrasena: string,
}
export interface register {
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  direccion: string;
  telefono: string;
  rol: {
    nombre: string;
  };
}


export class Usuario {
  id?:string;
  nombre: string = "";
  correoElectronico: string = "";
  contrasena: string = "";
  direccion: string = "";
  telefono: string = "";
  rol: Rol = null;
}
