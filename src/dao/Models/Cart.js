
export class Cart {
  
  #products;

  constructor() {
    
    this.#products = [];
  }

  get products() {
    return this.#products;
  }
 
  datosCarts() {
    return {        
        products: this.#products,
    };
  }
}
