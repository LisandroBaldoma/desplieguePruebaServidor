import { cartManager } from "../../dao/mongoodb/cart.manager.js";
import { productsManager } from "../../dao/mongoodb/product.manager.js";
import { userManager } from "../../dao/mongoodb/user.manager.js";
import { cartRpository } from "../../repositories/cart.repository.js";
import { productsRepository } from "../../repositories/product.respository.js";

export function homeView(req, res, next) {
  res.render("home", {
    body: "Backend de una aplicacion E-commerce",
    title: "Proyecto Final - Comision 39710",
    subTtitle: "Alumno: Lisandro Baldoma",
    user: req.user,
  });
}

export function loginView(req, res, next) {
  res.render("login", { title: "Login" });
}

export function registerView(req, res, next) {
  res.render("registerForm", {
    title: "Register",
  });
}

export function profileView(req, res, next) {
  // console.log(req.user)
  res.render("profile", {
    title: "Profile",    
    user: req.user,
  });
}

export async function productsView(req, res, next) {
  try {
    console.log(req.user)
    if(req.user.rol === 'admin'){
      console.log('vista para admin')
      const respuesta = await productsRepository.find(req.query);
      // console.log(req.user)
      // console.log(respuesta.payload)
      res.render("productsAdmin", {
        title: "Prodcust",
        products: respuesta.payload.length > 0,
        productsList: respuesta.payload,
        data: respuesta,
        user: req.user,
      });  
      
    }else{
      const respuesta = await productsRepository.find(req.query);
      // console.log(req.user)
      // console.log(respuesta.payload)
      res.render("products", {
        title: "ProdcustAdmin",
        products: respuesta.payload.length > 0,
        productsList: respuesta.payload,
        data: respuesta,
        user: req.user,
      });  
    }
    
  } catch (error) {
    next(error);
  }
}

export async function cartDetailView(req, res, next) {
  try {
    // const respuesta = await cartRpository.findOne({_id:req.params.cid});
    const respuesta = await cartRpository.findByIdPopulate(
      req.params.cid,
      "products.product"
    );
    const cart = await cartRpository.findById(req.params.cid);
    res.render("cartView", {
      title: "CartDetail",
      cart: cart._id,
      products: respuesta.products.length > 0,
      productsList: respuesta.products,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePassword(req, res, next) {
  try {
    const respuesta = await productsRepository.find(req.query);
    res.render("updtaePassword", {
      // title: "Upsate Password",
      // products: respuesta.payload.length > 0,
      // productsList: respuesta.payload,
      // data: respuesta,
      // user: req.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function configView(req, res, next) {
  try {
    // const respuesta = await productsRepository.find(req.query);
    // console.log(req.user)
    // console.log(respuesta.payload)
    res.render("config", {
      title: "Configurciones",
      // products: respuesta.payload.length > 0,
      // productsList: respuesta.payload,
      // data: respuesta,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function userEditView(req, res, next) {
  try {
    const users = await userManager.find();
    console.log(users)
    // console.log(respuesta.payload)
    res.render("userEditView", {
      title: "User Edit View",
      // products: respuesta.payload.length > 0,
      // productsList: respuesta.payload,
      // data: respuesta,
      // users: users.length > 0,
      // usersList: users,
    });
  } catch (error) {
    next(error);
  }
}


//TODO CAMBIAR NOMBRE PArA REFERIRME A USER WEB CONTROLLER
