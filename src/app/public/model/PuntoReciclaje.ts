import { Usuario, register } from "./usuario";

export class PuntoReciclajeDTO
{
    id : number = 0;  
    direccion : String = ""; 
    horarioAtencion : String = ""; 
    latitud : number = 0;
    longitud : number = 0;
    nombre : String = ""; 
    telefono : String = "";
    usuario_id : number = 0;
}

export class PuntoReciclaje
{
    id : number = 0;  
    direccion : String = ""; 
    horarioAtencion : String = ""; 
    latitud : number = 0;
    longitud : number = 0;
    telefono : String = "";
    nombre : String = ""; 
    usuario_id : Usuario = null;
}

export interface PuntoReciclajeInterface
{
    id : number;  
    direccion : String ; 
    horarioAtencion : String 
    latitud : number;
    longitud : number;
    telefono : String;
    nombre : String; 
}