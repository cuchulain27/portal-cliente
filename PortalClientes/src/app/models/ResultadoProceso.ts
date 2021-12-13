import * as moment from "moment";

export class ResultadoProceso {
    tipoProceso: string="";
    estado: string="";
    idEstado: number=0;
    runCandidato: string="";
    nombreCandidato: string="";
    fechaInforme: Date=new Date();
    fechaPct: Date=new Date();
    fechaProt: Date = new Date();
    idResultado: number=0;
    descResultado: string="";
    idInforme: number=0;
    conFirma: boolean=false;
    nombreCliente:string="";
    rutCliente: number=0;
    mesesVigencia: number=0;
    idCliente: number=0;
    equipo: string="";
    modelo: string="";
    perfil: string="";
    idEvaluacion: number=0;
    zonaFaena: string="";
    nombreFaena:string="";
    conProt: boolean=false;
    conPct: boolean=false;
    vigencia: string="";
    porcPct:number=0;
    porcProt:number=0;
    porcCumplimiento:number=0;
    brechaPct:number=0;
    brechaProt:number=0;
    brechaEI:number=0;
    fechaVigenciaInforme: Date = new Date();
    constructor() {
    }
}