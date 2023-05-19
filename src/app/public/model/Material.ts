/*export class MaterialDTO
{
    puntoReciclajeId : number = 0;
    nombrePuntoReciclaje : string = '';
    materialValue : number = 0;
    static id : number = 0;

    constructor(nombrePuntoReciclaje : string, puntoReciclajeId : number = 0, usuario_id : number = 1)
    {
        this.puntoReciclajeId = puntoReciclajeId;
        this.nombrePuntoReciclaje = nombrePuntoReciclaje;
        MaterialDTO.id++;
        this.materialValue = MaterialDTO.id;
    }
}*/

export class MaterialReciclable
{
    materialReciclableId : number = 0;
    nombreMaterialReciclable : string = '';
}