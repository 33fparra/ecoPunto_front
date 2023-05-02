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
