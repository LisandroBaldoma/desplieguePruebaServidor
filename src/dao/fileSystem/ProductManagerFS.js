import { Product } from "./Product.js";
import fs from "fs/promises";
import { randomUUID } from "crypto";

class ProductManagerFS {
  #ruta;
  #products;
  constructor(ruta) {
    this.#ruta = ruta;
  }
  async #readProducts() {
    const json = await fs.readFile(this.#ruta, "utf-8");
    this.#products = JSON.parse(json);
  }
  async #writeProduct() {
    const json = JSON.stringify(this.#products, null, 2);
    await fs.writeFile(this.#ruta, json);
  }
  async find() {
    console.log("getproducts fs");
    await this.#readProducts();
    if (this.#products.length === 0) {
      return this.#products;
    }
    return this.#products;
  }
  async createProduct({
    title,
    description,
    stock,
    code,
    price,
    status,
    thumbnails,
    category,
    id = randomUUID(),
  }) {
    await this.#readProducts();
    const newProduct = new Product({
      title,
      description,
      stock,
      code,
      price,
      status,
      thumbnails,
      category,
      id,
    });
    const product = this.#products.find(
      (prod) => prod.code === newProduct.code
    );
    if (product) {
      throw new Error("ID no existe");
    }
    this.#products.push(newProduct);
    await this.#writeProduct();
    return newProduct;
  }
  async findById(id) {
    await this.#readProducts();
    const product = this.#products.find((prod) => prod.id === id);
    if (!product) {
      throw new Error("ID no existe");
    }
    return product;
  }
  async updateOne(id, CamposUpdate) {
    if (Object.hasOwn(CamposUpdate, "id")) {
      delete CamposUpdate["id"];
    }
    await this.#readProducts();
    const index = this.#products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("ID no existe");
    } else {
      const newProductUpdate = { ...this.#products[index], ...CamposUpdate };
      this.#products.splice(index, 1, newProductUpdate);
      await this.#writeProduct();
      return this.#products[index];
    }
  }
  async deleteOne(id) {
    await this.#readProducts();
    const index = this.#products.findIndex((prod) => prod.id === id);
    if (index === -1) {
      throw new Error("ID no existe");
    } else {
      this.#products.splice(index, 1);
      this.#writeProduct();
      return this.#products[index];
    }
  }
}

export const productsManagerFS = new ProductManagerFS(
  "./database/products.json"
);
