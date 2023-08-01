### Features

- Servidor Backend E-commerce.


# DESAFIO COMPLEMENTARIO

##Modulo de testing para proyecto final

###Modulo de testing
	Testing Dao Generico
	Testing Utils

###Librerias utilizadas
	mocha
	supertest

#  Instrucciones para el correcto funcionamiento

	 Descargar el proyecto e instalar dependencias 
	 Clonar Repositorio
 	 Instalar Dependencias con el  comando npm install
	 Cargar String de conexion en el archivo /src/config/database.conig.js
	 Ejecutar el comando npm test ejecuta el test mocha


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### DESAFIO COMPLEMENTARIO

##Documentar API REST.

	Implemente Swagger para la documentacion de la API.
	
	http://localhost:8080/api/docs/



#  Instrucciones para el correcto funcionamiento

### Primer paso ( Descargar el proyecto e instalar dependencias )
	 Clonar Repositorio
	 npm install

### Segundo paso ( podemos optar por las siguientes opciones ) en ambos casos  Agregar string de conexion MOONGODB_CONECTION_STRING en archivo:  developer.env y production.env.

	 npm test (por defecto carga el modo desarrollo donde muestra los mensajes de logger por consola)
	 npm test production (carga el modo produccion donde muestra los mensajes de logger en archivo events.log)

### Tercer paso ( Probar servidor )
- DESAFÍO ENTREGABLE - PROCESO DE TESTING
- en la carpeta test/postman 
	-Esta el archivo con todos los Endpoint para realizar el test completo de la App desde Postman
	 Tambien se puede abrir una pestaña en http://localhost:8080

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### DESAFIO COMPLEMENTARIO

##Restablecer contraseña.

	Nuevo rol en el schema de usuarios "PREMIUM" estos usuarios solo pueden borrar los productos que le pertenecen, el "ADMIN" puede borrar cualquier producto.
	Nuevo campo en schema productos "OWNER" guarda el email del usuario que lo creo siempe que sea "PREMIUM"

+ Update contraseña: 
	 Cree una ruta en POSTMAN para pedir el cambio de la contraseña http://localhost:8080/api/user/emailpassword 
	 en el body de la peticion debe incluirse el mail al cual sera enviado en el campo email.
	 El mail se envia con los siguientes datos:
	 Token: uqe expira en 1 hora
	 Link: para hacer la peticion de cambio de contraseña
	 en el body del post que se recibe en el mail debe incuirse los siguientes datos 
	 {
	 email:
	 newPassword:
	 confirmPasssword:
	 token:
	 }
	Si todos los datos son correctos se actualizara la contraseña.

#  Instrucciones para el correcto funcionamiento

### Primer paso ( Descargar el proyecto e instalar dependencias )
	 Clonar Repositorio
	 npm install

### Segundo paso ( podemos optar por las siguientes opciones ) en ambos casos  Agregar string de conexion MOONGODB_CONECTION_STRING en archivo:  developer.env y production.env.

	 npm test (por defecto carga el modo desarrollo donde muestra los mensajes de logger por consola)
	 npm test production (carga el modo produccion donde muestra los mensajes de logger en archivo events.log)

### Tercer paso ( Probar servidor )
- DESAFÍO ENTREGABLE - PROCESO DE TESTING
- en la carpeta test/postman 
	-Esta el archivo con todos los Endpoint para realizar el test completo de la App desde Postman
	 Tambien se puede abrir una pestaña en http://localhost:8080

---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### DESAFIO ENTREGABLE LOGGER

- ENDPOINT 
	http://localhost:8080/api/testlogger
	

- LOGGER LIBRERIA WINSTON
	implemente Middleware logger .

#  Instrucciones para el correcto funcionamiento

### Primer paso ( Descargar el proyecto e instalar dependencias )
	 Clonar Repositorio
	 npm install

### Segundo paso ( podemos optar por las siguientes opciones ) en ambos casos  Agregar string de conexion MOONGODB_CONECTION_STRING en archivo:  developer.env y production.env.

	 npm test (por defecto carga el modo desarrollo donde muestra los mensajes de logger por consola)
	 npm test production (carga el modo produccion donde muestra los mensajes de logger en archivo events.log)

### Tercer paso ( Probar servidor )
- DESAFÍO ENTREGABLE - PROCESO DE TESTING
- en la carpeta test/postman 
	-Esta el archivo con todos los Endpoint para realizar el test completo de la App desde Postman
	 Tambien se puede abrir una pestaña en http://localhost:8080

---------------------------------------------------------------------------------------------------

### DESAFIO ENTREGBLE MOCKING Y MANEJO DE ERRORES

- ENDPOINT 
	http://localhost:8080/api/mockingproducts
	Genera 100 productos, los devueLve en formato JSON

- MANEJO DE ERRORES
	implemente Middleware y clases de errores comunes .

#  Instrucciones para el correcto funcionamiento

### Primer paso ( Descargar el proyecto e instalar dependencias )
- Clonar Repositorio
- npm install

### Segundo paso ( ejecutar el comando npm para iniciar el servidor )
		npm test ( por defecto utiliza Mongodb local)
		Agregar string de conexion MOONGODB_CONECTION_STRING en archivo
		.mongodb.env

### Tercer paso ( Probar servidor )
- DESAFÍO ENTREGABLE - PROCESO DE TESTING
- en la carpeta test/postman 
	-Esta el archivo con todos los Endpoint para realizar el test completo de la App desde Postman
	 Tambien se puede abrir una pestaña en http://localhost:8080

-En todas las pruebas se debera crear un Usuario y Loguerse a la App para poder acceder a la compra de los Productos


---------------------------------------------------------------------------------------------------

### TERCER ENTREGA PROYECTO FINAL

- Arquitectura del sevidor:
	- Patron Repository
- Modelo Ticket creado.
- Agregue ruta /api/carts/:cid/purchase
- Proceso de compra:
	- Si el producto no cuenta con stock suficiente no se procesa se devuelve con un mensaje  indicando los producto que no fueron procesados.
	-Si el producto cuenta con Stock se genera la compra y se devuelve el ticket de la compra
	- Cuando la compra finaliza el carrito queda con los productos que no pudieron procesarse por falta de Stock, en caso de no tener ninguno queda vacio.

- Proteccion de rutas:
	- Solo el usuario puede agregar productos al carrito
	- Solo el administrador puede crear, actualizar o eliminar productos



------------

## DESAFÍO ENTREGABLE 
###RESTRUCTURACION DEL SERVIDOR

### Segunda practica integradora

- Implemente  Repositories con las operaciones que se realizan en products -carts - Users para que todas las operaciones puedan  ser independientes de la persistencia que se elije al iniciar el programa.
- Implemente Services con operaciones de creacion que se realizan en prodcuts - carts - users.
- El modo Memoria solo podra usarse con Postman 
- implemente DOTENV para configurar las variables de entorno que se necesitan para el funcionamiento del servidor.
	En los archivos .env corrspondientes a cada persistencia se debera completar con los datos requeridos 
	PORT (puerto en el que escuchara el serivdor )
	MOONGODB_CONECTION_STRING (String de conexion para Mongodb)


###EndPoint User-
- http://localhost:8080 (home) Vista protegida
- http://localhost:8080/login    
   - Registro de usuario
   - Login Usuario Registrado Local
   - Login Github
- http://localhost:8080/profile (Datos Perfil) Vista Protegida
- http://localhost:8080/products (Lista de productos) Vista protegida
- http://localhost:8080/api/sessions/current (Datos session) Vista Protegida 

###EndPoint Products

		GET Products
http://localhost:8080/api/products **(implemente Paginate-V2)**
- acepta parametros opcioneales de busqueda:
	- limit: numerico
	- page: numerico
	- sort: 'desc' / 'asc'
	- query: string ( categoria el producto que desea buscar )

Get ProductById
- http://localhost:8080/api/products/:id
POST AddProduct
- http://localhost:8080/api/products
PUT UpdateProduct
- http://localhost:8080/api/products/:id
DEL DeleteProduct
- http://localhost:8080/api/products/:id

### EndPoint Carts
POST AddCart
- http://localhost:8080/api/carts/
POST AddProductToCart
- http://localhost:8080/api/carts/:cid/product/:pid
GET ProductCart
- http://localhost:8080/api/carts/:cid **(Implemente Populate)**
DEL DeleteProductCart
- http://localhost:8080/api/carts/:cid/product/:pid
DEL DeleteAllProductCart
- http://localhost:8080/api/carts/:cid
PUT UpdateProductsCart 
- http://localhost:8080/api/carts/:cid
PUT UpdateQuantityCartProduct 
- http://localhost:8080/api/carts/:cid/product/:pid

### View 

- http://localhost:8080/
	 Esta vista en solo el HOME del proyecto. 

- http://localhost:8080/products
	En esta vista Se puede 

- Agregar Productos nuevos AddProduct
- Agregar productos al carrito que se le asigno al usuario al registrarse
- Se puede acceder al carrito de compras con el detalle de los productos que se agregaron al carrito
- Cuenta con Paginacion 

- http://localhost:8080/carts/:cid
	En esta vista se puede acceder al detalle de cualquier carrito que quiera consultar 

### Testing ( Coleccion Postman para realizar los testing a todos los EndPoint )
- En la carpeta src/test/postman/E-commerce Backend Server.postman_collection.js
- Podes importar la coleccion en POSTMAN y realizar los TEST a los endPoint



###End