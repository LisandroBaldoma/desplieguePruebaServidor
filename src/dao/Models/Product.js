import { newId } from "../../utils/criptografia.js";

export class Product {
  #id;
  #title;
  #description;
  #stock;
  #price;
  #code;
  #category;
  #thumbnails;
  #status;
  #owner;

  constructor({
    id = newId(),
    title,
    description,
    stock,
    price,
    code,
    category,
    thumbnails,
    status,
    owner,
  }) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#stock = stock;
    this.#price = price;
    this.#code = code;
    this.#category = category;
    this.#thumbnails = thumbnails;
    this.#status = status;
    this.#owner = owner;
  }

  get id() {
    return this.#id;
  }
  get title() {
    return this.#title;
  }
  get description() {
    return this.#description;
  }
  get stock() {
    return this.#stock;
  }
  get price() {
    return this.#price;
  }
  get code() {
    return this.#code;
  }
  get category() {
    return this.#category;
  }
  get thumbnails() {
    return this.#thumbnails;
  }
  get status() {
    return this.#status;
  }
  get owner() {
    return this.#owner;
  }

  datosProduct() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      stock: this.#stock,
      price: this.#price,
      code: this.#code,
      category: this.#category,
      thumbnails: this.#thumbnails,
      status: this.#status,
      owner: this.#owner,
    };
  }
}
