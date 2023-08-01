export class ErrorNotFoundProducts extends Error {
    constructor(mensaje = `El producto no se encuentra en la BD`) {
        super(mensaje);
        this.tipo = 'ERROR_NOT_FOUND';
    }
}

export class ErrorNotFoundCarts extends Error {
    constructor(mensaje = `El carrito no se encuentra en la BD`) {
        super(mensaje);
        this.tipo = 'ERROR_NOT_FOUND';
    }
}