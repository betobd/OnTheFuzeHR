const functions = require("firebase-functions");
const express = require('express');
const user_data = require("./js/store.js");
const PDF = require('pdfkit');
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



/* TEMPLATE ENGINE UTILIZADO EJS */

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

/* CARPETA PUBLICA DEL PROYECTO FUNCTIONS/PUBLIC */

app.use(express.static(__dirname + "/public"));

/* PARA QUE EL METODO POST NO DE ERRORES */
app.use(express.urlencoded({extended: true}));


/* VARIABLE PARA GUARDAR ID--> DOCUMENTO FIRESTORE  Y OBJETO CON INFORMACION DEL EMPLEADO */

var id = '123456';
//var idResignationDoc = '';
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
    {name:      info.name,
    lastname:   info.lastname,
    city:       info.city,
    id:         info.id,
    post:       info.post,
    email_e:    info.email_e,
    email_p:    info.email_p,
    phone:      info.phone,
    id_type:    info.id_type,
    vegetarian: info.vegetarian,
    size:       info.size,
    address:    info.address,
    user_doc:   id
    });
        
  });


  /* Vista al buscar un empleado */
  app.get('/buscar', async(request, response)=>{
    
  const user = await user_data.getUser(request.query.doc);
      
  user.forEach(result => 
      {
        const data= result.data();
        id=data.numero_doc;
        firebaseDocumendID = result.id;    
        
        info.name=      data.nombre;
        info.lastname = data.apellido;
        info.city=      data.ciudad;
        info.id=        data.numero_doc;
        info.post=      data.cargo;
        info.email_e=   data.correo_empr;
        info.email_p=   data.correo_pers;
        info.phone=     data.telefono;
        info.id_type=   data.tipo_doc;
        info.vegetarian=data.vegetarian;
        info.size =     data.talla_camisa;
        info.address =  data.direccion;
    });

    response.render('mainPage',
      { name:     info.name,
        lastname: info.lastname,
        city:     info.city,
        id:       info.id,
        post:     info.post,
        email_e:  info.email_e,
        email_p:  info.email_p,
        phone:    info.phone,
        id_type:  info.id_type,
        vegetarian: info.vegetarian,
        size:     info.size,
        address:  info.address,
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
     vegetarian:  request.body.vegetarian,
     talla_camisa:request.body.talla_camisa,
     direccion:   request.body.direccion,
    }

    await user_data.editRegister(editedEmployee,id);

    response.send('Editado correctamente');
  });


  app.get('/resignation', (request,response) =>{
    response.render('resignation',
    {
      name:     info.name,
      lastname: info.lastname,
      city:     info.city,
      id:       info.id,
      post:     info.post,
      email:    info.email_p,
      phone:    info.phone,
      address:  info.address      
    });
  });
  /* CREAR UN DOCUMENTO PDF DESDE UN FORM */

  app.post('/resignation', async(request,response) =>{

    const resignation_info = {
      name:         request.body.name,
      lastname:     request.body.lastname,
      city:         request.body.city,
      address:      request.body.address,
      post:         request.body.post,
      email:        request.body.email,
      phone:        request.body.phone,
      start_date:   request.body.start_date,
      end_date:     request.body.end_date,
      select_motif: request.body.select_motif,
      comments:     request.body.comments,
      id:           request.body.id
    }
    switch(request.body.select_motif){

      case '1':
        resignation_info.select_motif ='Oferta Laboral';
      break;

      case '2':
        resignation_info.select_motif ='Cuidado de familiar';
      break;

      case '3':
        resignation_info.select_motif ='Viaje fuera del país';
      break;

      case '4':
        resignation_info.select_motif ='Descontento Laboral';
      break;

      case '5':
        resignation_info.select_motif ='Despido sin justa causa';
      break;

      case '6':
        resignation_info.select_motif ='Despido con justa causa';
      break;

      case '7':
        resignation_info.select_motif ='Terminación de contrado por periodo de prueba';
      break;

      case '8':
        resignation_info.select_motif ='Estudios';
      break;

      case '9':
        resignation_info.select_motif ='Otro';
      break;
    }

    await user_data.createResignationRegister(resignation_info);
    

    response.redirect('/');

  });




exports.app = functions.https.onRequest(app);

exports.firestoretoPdf = functions.firestore.document('/retiros/{documentId}').onCreate((snap,context) =>{
 
  return (async () => {
    
    var doc = new PDF();
    const pdfName = snap.data().name+'_'+'retiro.pdf';
    const filename = 'entrevista/'+snap.id+'/'+pdfName;
    const myPDFfile = user_data.savePDF(filename);
    doc.pipe(myPDFfile.createWriteStream());

    doc.fontSize(25).text('Entrevista de retiro',{
      align: 'center'
    });
    doc.fontSize(25).text(`Motivo - ${snap.data().select_motif}`,{
      align: 'center'
    });

    doc.fontSize(14).text(`Nombre - ${snap.data().name}`, 80, 200);
    doc.fontSize(14).text(`Cargo - ${snap.data().post}`, 80, 230);
    doc.fontSize(14).text(`Fecha de Ingreso - ${snap.data().start_date}`, 80, 260);
    doc.fontSize(14).text(`Fecha de retiro - ${snap.data().end_date}`, 80, 290);
    doc.fontSize(14).text(`Correo - ${snap.data().email}`, 80, 320);
    doc.fontSize(14).text(`Ciudad - ${snap.data().city}`, 80, 350);
    doc.fontSize(14).text(`Comentarios - ${snap.data().comments}`, 80, 380);

    doc.end();

    const aa = await user_data.pdfPublic();

    //const url = await user_data.getURL(filename);

    var Docs = await user_data.createPDFregister({
      doc_lik: '',
      categoria: 'Retiro',
      descripcion: `Entrevista de retiro - ${snap.data().name} `,
      employee_id: `${snap.data().id}`,
      nombre_doc: pdfName,
      doc_path: filename

  });

        

  })().then(() => {

  }).catch (err => {
    console.log("An error has ocurred " + err);
    const error = user_data.createPDFregister({test: err});
  });
  
});

exports.generateThumbnail = functions.storage.object().onFinalize(async (object) => {
   
  const fileBucket = object.bucket; // The Storage bucket that contains the file.
  const filePath = object.name; // File path in the bucket.
  const contentType = object.contentType; // File content type.
  const metageneration = object.metageneration; // Number of times metadata has been generated. New objects have a value of 1.
  const link = object.mediaLink;

  const updateInfo ={
    doc_lik: link,
    doc_path: filePath  
  }

  
 const resignationRegister = await user_data.getResDoc(filePath);
    
    resignationRegister.forEach(async(result) => 
      {        
        const jj = await user_data.updatePDFregister({
          doc_lik: link
        },result.id);          
        
    });

   
});

