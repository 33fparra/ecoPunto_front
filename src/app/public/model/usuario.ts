export interface login {
  correoElectronico: string,
  contrasena: string,
}
export interface register {
  nombre: string;
  correoElectronico: string;
  contrasena: string;
  telefono: string;
  direccion: string;
  rol: {
    nombre: string;
  };
}
