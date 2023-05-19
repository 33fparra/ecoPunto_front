export class ActividadReciclaje
{
    actividadReciclajeId : number = 0;  
    fecha : string = ""; 
    cantidad : number = 0; 
    tipoMaterial : number = 0;
}

export class ActividadReciclajeDTO
{
    actividadReciclajeId : number = 0;
    fecha : string = '';
    cantidad : number = 0; 
    materialesReciclableId : number = 0;
    puntoMaterialId : number = 0;
    usuario_id : number = 0;
}

export interface HistorialReciclajePorUsuario {
    puntoMaterialNombre: string
    materialReciclableNombre: string
    fecha: string
    cantidad: number
    puntoReciclajeNombre: string
}
  