import mongoose from "mongoose";
import { GenericDao } from "../../../src/dao/mongoodb/GenericDao.js";
import assert, { throws } from "node:assert";

const testSchema = new mongoose.Schema({
  id: { type: String },
  property1: { type: String, required: true },
  property2: { type: Number },
});

const testModel = mongoose.model("tests", testSchema);

const testData = {
  id: "123456",
  property1: "Lisandro",
  property2: 41,
};

const testDataUpdtae = {
  id: "789987",
  property1: "Florencia",
  property2: 37,
};
const testDataIncompleto = {
  property2: 1,
};

describe("dao mongose (generico)", () => {
  beforeEach(async () => {
    await mongoose.connection.collection("tests").deleteMany({});
  });
  describe("create", () => {
    describe("llamo al create con un objeto con el esquema correspondiente ", () => {
      it("devuelve el mismo objeto sin agregarle ningun campo ni metodo", async () => {
        const dao = new GenericDao(testModel);
        const pojo = await dao.create(testData);
        assert.ok(pojo._id, "deberia tener _id");
        assert.ok(pojo.property1, "deberia tener property1");
        assert.ok(pojo.property2, "deberia tenr property2");
      });
    });

    describe("llamo al create con un objeto con un esquema distinto al esperado ", () => {
      it("lanza un error", async () => {
        const dao = new GenericDao(testModel);
        await assert.rejects(
          dao.create(testDataIncompleto),
          mongoose.Error.validationError
        );
      });
    });
  });

  describe("findById", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("test").deleteMany({});
    });
    describe("busco un registro por su id", () => {
      it("si existe lo encuentra y lo devuelve", async () => {
        const dao = new GenericDao(testModel);
        const pojo = await dao.create(testData);
        const registro = await dao.findById(pojo._id);
        assert.deepStrictEqual(JSON.parse(JSON.stringify(registro)), pojo);
      });
    });
    describe("busco un registro por un id que no existe", () => {
      it("lanza un error ", async () => {
        const dao = new GenericDao(testModel);
        await assert.rejects(
          dao.findById("64b4a49dcf9e5c13b03f9a48"),
          mongoose.Error.validationError
        );
      });
    });
  });

  describe("findOne", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("test").deleteMany({});
    });
    describe("busco por el nombre de una propiedad el registro", () => {
      it("si existe lo encuentra y lo devuelve", async () => {
        const dao = new GenericDao(testModel);
        const pojo2 = await dao.create(testData);
        const registro = await dao.findOne({ property2: 41 });
        //console.log(pojo2, JSON.parse(JSON.stringify(registro)))
        assert.deepStrictEqual(JSON.parse(JSON.stringify(registro)), pojo2);
      });
    });
    describe("busco por el nombe de una propiedad cuyo valor no existe", () => {
      it("lanza un error ", async () => {
        const dao = new GenericDao(testModel);
        const pojo2 = await dao.create(testData);

        await assert.rejects(
          dao.findOne({ property1: "Flor" }),
          assert.ifError(null),
          "La propiedad existe"
        );
      });
    });
  });

  describe("findOupdateOne", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("test").deleteMany({});
    });
    describe("busco por id el registro que quiero actualzar", () => {
      it("si existe lo encuentra y lo actualizo", async () => {
        const dao = new GenericDao(testModel);
        const pojo2 = await dao.create(testData);
        const registro = await dao.updateOne(pojo2._id, testDataUpdtae);
        assert.notDeepEqual(pojo2, registro);
      });
    });
    describe("busco por id que no existe, el registro que quiero actualzar", () => {
      it(" lanza un error ", async () => {
        const dao = new GenericDao(testModel);
        const pojo2 = await dao.create(testData);
        await assert.rejects(
          dao.updateOne("64b4a49dcf9e5c13b03f9a48", testDataUpdtae),
          assert.ifError(null),
          "El id existe"
        );
      });
    });
  });

  describe("deleteOne", () => {
    beforeEach(async () => {
      await mongoose.connection.collection("test").deleteMany({});
    });
    describe("busco por id el registro que quiero eliminar", () => {
      it("si existe lo encuentra y lo elimino", async () => {
        const dao = new GenericDao(testModel);
        const pojo2 = await dao.create(testData);
        const buscar = await dao.findById(pojo2._id);

        const registroEliminado = await dao.deleteOne(pojo2._id);

        assert.deepEqual(registroEliminado, buscar, "se esperaba eliiinca");
        
      });
    });
    describe("busco por un id que no existe, para eliminar un registro", () => {
      it("lanza un error ", async () => {
        const dao = new GenericDao(testModel);
        const pojo2 = await dao.create(testData);
        await assert.rejects(
          dao.deleteOne("64b4a49dcf9e5c13b03f9a48", testDataUpdtae),
          assert.ifError(null),
          "El id existe"
        );
      });
    });
  });  

  // describe("find", () => {
  //   beforeEach(async () => {
  //     await mongoose.connection.collection("test").deleteMany({});
  //   });
  //   describe("busco todos los registros enviandole params de paginacion", () => {
  //     it("si existe lo encuentra y lo devuelve", async () => {
  //       const dao = new GenericDao(testModel);
  //       const pojo2 = await dao.create(testData);
        // const registro = await dao.find({limit:2, page:1, sort:"desc" });
        // console.log(registro)
        //console.log(pojo2, JSON.parse(JSON.stringify(registro)))
        // assert.deepStrictEqual(JSON.parse(JSON.stringify(registro)), pojo2);
  //     });
  //   });
  //   describe("busco todos los registros sin enviarl params de paginacion", () => {
  //     it("lanza un error ", async () => {
        // const dao = new GenericDao(testModel);
        // const pojo2 = await dao.create(testData);

        // await assert.rejects(
        //   dao.findOne({ property1: "Flor" }),
        //   assert.ifError(null),
        //   "La propiedad existe"
        // );
  //     });
  //   });
  // });

  // proxima prueba
});
