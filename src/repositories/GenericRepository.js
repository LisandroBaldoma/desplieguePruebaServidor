export class GenericRepository {
  #dao;
  constructor(dao) {
    this.#dao = dao;
  }
  create(data, options) {
    return this.#dao.create(data);
  }
  find(criteria, options) {
    return this.#dao.find(criteria);
  }
  findAll(){
    return this.#dao.findAll();
  }
  findById(criteria, options) {
    return this.#dao.findById(criteria);
  }
  findOne(criteria, options) {
    return this.#dao.findOne(criteria);
  }
  updateOne(criteria, newData, options) {
    return this.#dao.updateOne(criteria, newData);
  }
  // updateMany(criteria, newData, options) {
  //   return this.#dao.updateMany(criteria, newData);
  // }
  deleteOne(criteria, options) {
    return this.#dao.deleteOne(criteria);
  }
  // deleteMany(criteria, options) {
  //   return this.#dao.deleteMany(criteria);
  // }
  findByIdPopulate(criteria, options) {
    return this.#dao.findByIdPopulate(criteria, options);
  }
  insertMany(criteria){
    return this.#dao.insertMany(criteria)
  }
}
