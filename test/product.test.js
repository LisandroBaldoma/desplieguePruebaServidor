import { faker } from "@faker-js/faker";
import { Product } from "../src/dao/Models/Product.js";

export default async function generateProducts() {
  const productRepositoryMock = {
    create: (product) => {

      console.log("Se generraon los productos correctamente");
      //console.log(product);
    },
  };

  const generateProduct = () => {
    return {
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      code: faker.string.alphanumeric({ length: 9 }),
      price: faker.number.int({ nim: 100, max: 10000 }),
      status: "true",
      stock: faker.number.int({ min: 1, max: 100 }),
      thumbnails: [faker.image.avatar()],
      category: faker.commerce.department(),
    };
  };

  let productsMock = [];
  for (let i = 0; i < 100; i++) {
    const newProduct = new Product(generateProduct())
    productsMock.push(newProduct.datosProduct());
  }

  productRepositoryMock.create(productsMock);

  return productsMock;
}
