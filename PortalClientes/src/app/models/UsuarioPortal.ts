export class UsuarioPortal {
    id: number;
    nombreUsuario: string;
    idCliente: string;
    correo: string;
    zona: string;
    urlServicio:string;
    /**
     *
     */
    constructor() {
        this.id = 0;
        this.nombreUsuario = '';
        this.idCliente = '';
        this.correo = '';
        this.zona = '';
        this.urlServicio = '';
    }

}