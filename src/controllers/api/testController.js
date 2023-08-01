
import generateProducts from "../../test/product.test.js";

export async function testGenerateProducts(req, res, next) {
  try {
    let products = await generateProducts();
    res.json(products);
  } catch (error) {}
}

export async function testLogger(req, res, next) {
    try {
        if(process.env.ENTORNO_DESARROLLO === "developer"){
            res.json({mensaje:'Esta en modo Desarrollo los mensajes de logger se muestran por conosola'})
        }else{
            res.json({mensaje:'Esta en modo Produccion los mensajes de logger se muestran en el archivo events.log'})
        }
    req.logger.fatal('Test logger FATAL')
    req.logger.error('Test logger ERROR')
    req.logger.warning('Test logger WARNING')
    req.logger.http('Test logger HTTP')
    req.logger.debug('Test logger DEBUG')

    } catch (error) {}
  }