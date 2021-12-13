export class LoginPortal {
    rutUsuario: string;
    rutCliente: string;
    codigo?: number;

    constructor(runUsuario: string, rutEmpresa: string, codigo: number) {
        this.rutUsuario = runUsuario;
        this.rutCliente = rutEmpresa;
        this.codigo = codigo;
    }
}


