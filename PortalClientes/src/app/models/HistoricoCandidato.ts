export class HistoricoCandidato {
    nombreCandidato: string;
    run: string;
    procesos: ProcesoHistorico[];

    constructor() {
        this.nombreCandidato = '';
        this.run = '';
        this.procesos = [];
    }
}

export class ProcesoHistorico {
    nombreEmpresa: string;
    equipo: string;
    perfil: string;
    resultado: string;
    fechaInforme: string;
    faena: string;

    constructor() {
        this.nombreEmpresa = '';
        this.equipo = '';
        this.perfil = '';
        this.resultado = '';
        this.fechaInforme = '';
        this.faena = '';
    }

}