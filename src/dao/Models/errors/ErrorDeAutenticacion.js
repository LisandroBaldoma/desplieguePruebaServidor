export class ErrorDeAutenticacion extends Error {
    constructor(mensaje = "Error de autenticacion") {
        super(mensaje);
        this.tipo = 'ERROR_DE_AUTENTICACION';
    }
}
