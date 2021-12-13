export class BrechaEI {
    id?: number;
    idInstrumento?: number;
    idDetInstrumento?: number;
    idEvaluacion?: number;
    idActividad?: number;
    idCriterio?: number;
    nroPregunta?: number;
    item?: number;
    nota?: number;
    brecha?: boolean;
    critico?: boolean;
    glsBrecha?: string;
    glsRecomendacion?: string;
    estadoPrueba?: boolean;
    idUsuario?: number;
    Columna_16?: Date;
    checked:boolean=false;
    disabled:boolean=false;
    idDocumento:number=0;
    documento:any;

    constructor() { }
}
