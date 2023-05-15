import { Usuario } from "./usuario";

export class PuntoReciclajeDTO
{
    id : number = 0;  
    direccion : string = ""; 
    horarioAtencion : string = ""; 
    latitud : number = 0;
    longitud : number = 0;
    nombre : string = ""; 
    telefono : string = "";
    usuario_id : number = 0;
}

export class PuntoReciclaje
{
    id : number = 0;  
    direccion : string = ""; 
    horarioAtencion : string = ""; 
    latitud : number = 0;
    longitud : number = 0;
    telefono : string = "";
    nombre : string = ""; 
    usuario_id : Usuario = null;
}

export interface PuntoReciclajeInterface
{
    id : number;  
    direccion : string ; 
    horarioAtencion : string 
    latitud : number;
    longitud : number;
    telefono : string;
    nombre : string; 
}