export class BrechaLevantamiento {
    tipoBrecha?:string;
    idBrecha?:number;

    constructor() {}
};

export class Levantamiento {
    idEvaluacion?:number;
    nombreArchivo?:string;
    tratamiento?:string;
    entidad?:string;
    rutaDocumento?:string;
    brechas:BrechaLevantamiento[]=[];

    constructor() {}
}