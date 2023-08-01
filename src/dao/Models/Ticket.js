import { newId } from "../../utils/criptografia.js";

export class Ticket {
  #id;
  #code;
  #purchase_dateTime;
  #amount;
  #purchaser;

  constructor({    
    id = newId(),
    code = newId(),
    purchase_dateTime = new Date(),
    amount,
    purchaser,
  }) {
    this.#id = id;
    this.#code = code;
    this.#purchase_dateTime = purchase_dateTime;
    this.#amount = amount;
    this.#purchaser = purchaser;
  }

  get id() {
    return this.#id;
  }
  get code() {
    return this.#code;
  }
  get purchase_dateTime() {
    return this.#purchase_dateTime;
  }
  get amount() {
    return this.#amount;
  }
  get purchaser() {
    return this.#purchaser;
  }

  dtoTicket() {
    return {
      id: this.#id,
      code: this.#code,
      purchase_dateTime: this.#purchase_dateTime,
      amount: this.#amount,
      purchaser: this.#purchaser,
    };
  }
}
