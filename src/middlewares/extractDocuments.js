import multer from "multer";


console.log("Middleware extarer fotos");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {    
    cb(null, `./usersFiles/${file.fieldname}`);
  },
  
  filename: function (req, file, cb) {
    const nombreParaGuardarElArchivo =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    cb(null, nombreParaGuardarElArchivo);
  },
});

const extractor = multer({ storage });

export const extraerFoto = extractor.fields([{name:'profiles'},{name:'documents'},{name:'products'}]);

