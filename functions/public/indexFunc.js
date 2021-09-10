const functions = require("firebase-functions");
const express = require('express');
const user_data = require("./js/store.js");
const PDF = require('pdfkit');
const fs = require('fs');
const PdfPrinter = require("./js/pdfmake");
const vfsFonts = require('./js/vfs_fonts');
const { async } = require("@firebase/app/node_modules/@firebase/util");

const fonts = {
  Courier: {
    normal: 'Courier',
    bold: 'Courier-Bold',
    italics: 'Courier-Oblique',
    bolditalics: 'Courier-BoldOblique'
  },
  Helvetica: {
    normal: 'Helvetica',
    bold: 'Helvetica-Bold',
    italics: 'Helvetica-Oblique',
    bolditalics: 'Helvetica-BoldOblique'
  },
  Times: {
    normal: 'Times-Roman',
    bold: 'Times-Bold',
    italics: 'Times-Italic',
    bolditalics: 'Times-BoldItalic'
  },
  Symbol: {
    normal: 'Symbol'
  },
  ZapfDingbats: {
    normal: 'ZapfDingbats'
  }
};

const app = express();

//PdfPrinter.vfs = vfsFonts.PdfPrinter.vfs;

/* TEMPLATE ENGINE UTILIZADO EJS */

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

/* CARPETA PUBLICA DEL PROYECTO FUNCTIONS/PUBLIC */

app.use(express.static(__dirname + "/public"));

/* PARA QUE EL METODO POST NO DE ERRORES */
app.use(express.urlencoded({extended: true}));


/* VARIABLE PARA GUARDAR ID--> DOCUMENTO FIRESTORE  Y OBJETO CON INFORMACION DEL EMPLEADO */

var id = '123456';
var info = {
  name:"NOMBRE",
  lastname:"APELLIDO ",
  city:"CIUDAD",
  id:"# CEDULA",
  post:"CARGO",
  email_e:"CORREO CORPORATIVO",
  email_p:"CORREO PERSONAL",
  phone:"TELEFONO",
  id_type:"TIPO DE DOCUMENTO",
  vegetarian:"VEGETARIANO ?",
  size:"TALLA",
  address:"DIRECCION"
}

  /* Vista tabla de documentos de un empleado */  
  app.get('/tabla', (request, response)=>{
    
    response.render('documentsTable');  

    
  });


 /*  VISTA PRINCIPAL APLICACION */
  app.get('/',(request,response) =>{
      
    response.render('mainPage',
    {name: info.name,
    lastname: info.lastname,
    city: info.city,
    id: info.id,
    post: info.post,
    email_e: info.email_e,
    email_p: info.email_p,
    phone: info.phone,
    id_type: info.id_type,
    vegetarian: info.vegetarian,
    size: info.size,
    address: info.address,
    user_doc: id
    });
        
  });


  /* Vista al buscar un empleado */
  app.get('/buscar', async(request, response)=>{
    
    const user = await user_data.getUser(request.query.doc);
      
  user.forEach(doc => {
      const data=doc.data();
      id=doc.id;    
      
      info.name=data.nombre;
      info.lastname = data.apellido;
      info.city= data.ciudad;
      info.id= data.numero_doc;
      info.post= data.cargo;
      info.email_e= data.correo_empr;
      info.email_p= data.correo_pers;
      info.phone= data.telefono;
      info.id_type= data.tipo_doc;
      info.vegetarian= data.vegetarian;
      info.size = data.talla_camisa;
      info.address = data.direccion;
  });
    response.render('mainPage',
    {name: info.name,
      lastname: info.lastname,
      city: info.city,
      id: info.id,
      post: info.post,
      email_e: info.email_e,
      email_p: info.email_p,
      phone: info.phone,
      id_type: info.id_type,
      vegetarian: info.vegetarian,
      size: info.size,
      address: info.address,
      user_doc: request.query.doc
    });  

    
  });


  /* VISTA AL EDITAR UN REGISTRO/EMPLEADO */
  app.get('/editar', (request, response)=>{
    
    response.render('editEmployee',
    { name: info.name,
      lastname: info.lastname,
      city: info.city,
      id: info.id,
      post: info.post,
      email_e: info.email_e,
      email_p: info.email_p,
      phone: info.phone,
      id_type: info.id_type,
      vegetarian: info.vegetarian,
      size: info.size,
      address: info.address    
    });  

  });


  /* VISTA AL CREAR UN REGISTRO/EMPLEADO */
  app.get('/crear',(request,response) =>{
    
    response.render('createEmployee');  
    
  });


   /* VISTA AL CREAR UN ARCHIVO DE UN EMPLEADO */
  app.get('/subirArchivo',(request,response) =>{
    
    response.render('newDocument',{doc_id: info.id,
                                   employee_name: info.name
                                  }
    );  
    
  });

  
   /* VISTA AL BUSCAR ARCHIVOS POR CATEGORIA */
  app.get('/archivo',async(request,response) =>{
    
    const getFiles = await user_data.getDoc(request.query.doc,request.query.categoria);
    const {docs} =getFiles;
    const files = docs.map(file =>({
        id: file.id,
        data: file.data()
    }));

    response.render('documentsTable',{files});  
    
  });


 /* METODO POST --  CREAR UN REGISTRO/EMPLEADO */
  app.post('/crear',async(request,response) =>{
    const newEmployee ={
     nombre:      request.body.nombre,
     apellido:    request.body.apellido,
     ciudad:      request.body.ciudad,
     numero_doc:  request.body.numero_doc,
     cargo:       request.body.cargo,
     correo_empr: request.body.correo_empr,
     correo_pers: request.body.correo_pers,
     telefono:    request.body.telefono,
     tipo_doc:    'C.C',
     vegetarian:  request.body.vegetarian,
     talla_camisa:request.body.talla_camisa,
     direccion:   request.body.direccion,
    }

    await user_data.createRegister(newEmployee);

    response.send('Creado correctamente');
  });


   /* METODO POST --  EDITAR UN REGISTRO/EMPLEADO */
  app.post('/editar',async(request,response) =>{
    const editedEmployee ={
     nombre:      request.body.nombre,
     apellido:    request.body.apellido,
     ciudad:      request.body.ciudad,
     numero_doc:  request.body.numero_doc,
     cargo:       request.body.cargo,
     correo_empr: request.body.correo_empr,
     correo_pers: request.body.correo_pers,
     telefono:    request.body.telefono,
     tipo_doc:    'C.C',
     vegetarian:         request.body.vegetarian,
     talla_camisa:request.body.talla_camisa,
     direccion:   request.body.direccion,
    }

    await user_data.editRegister(editedEmployee,id);

    response.send('Editado correctamente');
  });


  app.get('/pdf', (request,response) =>{
    response.render('pdf')
  });
  /* CREAR UN DOCUMENTO PDF DESDE UN FORM */

  app.post('/pdf', (request,response) =>{

    var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    
    
    
    
    const pdfDoc = PdfPrinter.createPdf(docDefinition);
    pdfDoc.getBase64((data) =>{
      response.writeHead(200,
        {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment;filename="filename.pdf"',
          
        });

        const download = Buffer.from(data.toString('utf-8'),'base64');
        response.end(download);
    });

  });


//app.use(express.static(__dirname, '/public'));

exports.app = functions.https.onRequest(app);

exports.firestoretoPdf = functions.firestore.document('/trabajadores/{documentId}').onCreate((snap,context) =>{
 
  return (async () => {
    
    var doc = new PDF();
    const pdfName = snap.data().nombre+'_'+'creado.pdf';
    const filename = 'entrevista/'+snap.id+'/'+pdfName;
    const myPDFfile = user_data.savePDF(filename);
    doc.pipe(myPDFfile.createWriteStream());

    doc.text('hola mundo',{
      align: 'center'
    });

    doc.text('aasdfasdasdfasdfasdasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf',{
      columns: 3
    });

    doc.end();
    //const downdile = await user_data.set(filename);
    //const test = await user_data.createPDFregister({test: filename});
    
    
    /* var docDefinition = { content: 'This is an sample PDF printed with pdfMake' };
    const pdfName = snap.data().nombre+'_'+'creado.pdf';
    const filename = 'entrevista/'+snap.id+'/'+pdfName;
    const myPDFfile = user_data.savePDF(filename);
    
    var printer = new PdfPrinter(fonts);
    
    var pdfDoc = printer.createPdfKitDocument(docDefinition);  
    
    pdfDoc.pipe(myPDFfile.createWriteStream());
    pdfDoc.end(); 
    const test = await user_data.createPDFregister({test: filename}); */

  })().then(() => {

  }).catch (err => {
    console.log("An error has ocurred " + err);
    const error = user_data.createPDFregister({test: err});
  });
  
});
