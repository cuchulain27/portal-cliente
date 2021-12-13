export class BrechaPCT {
        id?: number;
        idInstrumento?: number;
        idDetInstrumento?: number;
        idEvaluacion?: number;
        idActividad?: number;
        idCriterio?: number;
        nroPregunta?: number;
        categoria?: string;
        supraCategoria?: number;
        item?: number;
        nota?: number;
        brecha?: boolean;
        critico?: boolean;
        glsBrecha?: string;
        glsRecomendacion?: string;
        estadoPrueba?: boolean;
        idUsuario?: number;
        alternativaSeleccionad?: string;
        alternativaCorrecta?: string;
        tipoInstrumento?: number;
        notaRef?: number;
        anulado?: boolean;
        checked:boolean=false;
        disabled:boolean=false;
        idDocumento:number=0;
        documento:any;
        
        constructor() { }
}