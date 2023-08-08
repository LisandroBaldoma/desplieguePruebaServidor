import express, { Router } from 'express'
import { productsRouter } from "./api/productsRouter.js"
import { cartRouter } from "./api/cartRouter.js";
import { userRouter } from './api/userRouter.js';
import { sessionsRouter } from './api/sessionsRouter.js'
//import { testRouter } from './api/testRouter.js';
import { docsRouter } from './documentacion.router.js';



export const apiRouters = Router()

apiRouters.use(express.json());
apiRouters.use(express.urlencoded({ extended: true }));

apiRouters.use('/docs', docsRouter)


apiRouters.use('/products', productsRouter) 
apiRouters.use('/carts', cartRouter)
apiRouters.use('/users', userRouter )
apiRouters.use('/sessions', sessionsRouter) // http://localhost:8080/api/sessions

//apiRouters.use('/', testRouter)






