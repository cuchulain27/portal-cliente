export class Clientes {

    idCliente: number;
    rut?: string;
    nombreCliente: string;
    nombreFantasia: string;

    constructor() {
        this.idCliente = 0;
        this.rut = '';
        this.nombreCliente = '';
        this.nombreFantasia = 'string';
    }
}