const firebase = require('firebase/app');
const admin = require('firebase-admin');
//const {Storage} = require('@google-cloud/storage');
var path = require("path");
//require("firebase/auth");
//require("firebase/firestore");
const firebaseConfig = require('./firebaseConfig');
// Initialize Firebase
const serviceAccount = path.resolve(__dirname, '../../permissions.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://onthefuzehr-default-rtdb.firebaseio.com",
  storageBucket: 'onthefuzehr.appspot.com'
});
//firebase.analytics();

const db= admin.firestore();
const bucket = admin.storage().bucket();

const dbUsers = 'trabajadores';
const dbDocs = 'documentos';
//const storage1 = new Storage();



const getUser = (id_card) => db.collection(dbUsers).where('numero_doc','==',id_card).get();

const getDoc = (cc_id,categoryFilter)=> db.collection(dbDocs).where('employee_id','==',cc_id).where('categoria','==',categoryFilter).get();

const getResDoc = (path)=> db.collection(dbDocs).where('doc_path','==',path).get();

const delDbDoc= (dcDoc) => db.collection("documentos").doc(dcDoc).delete();

const createRegister = (value) => db.collection('trabajadores').add(value);

const editRegister = (value,id) => db.collection('trabajadores').doc(id).set(value,{merge: true});

const createPDFregister = (value) => db.collection('documentos').add(value);

const createOther = (value) => db.collection('otro').add(value);

const updatePDFregister = (value,id) => db.collection('documentos').doc(id).update(value);


const createResignationRegister = (value) =>db.collection('retiros').add(value);

const savePDF = (doc_name) => bucket.file(doc_name);  

const pdfPublic = () => {
    //storage1.bucket('onthefuzehr.appspot.com').makePublic();
    admin.storage().bucket('onthefuzehr.appspot.com').makePublic();  
}

const getURL = (file) => {
  //storage1.bucket('onthefuzehr.appspot.com').makePublic();
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(file);
  return fileRef.getDownloadURL()  
}
  

/* const setFile = (doc_name) =>{
  
  const storageRef = firebase.storage().ref();
  const fileRef = storageRef.child('entrevista/7nfy46zCXHJfK3pIfsoe/SISISISISIS_creado.pdf');
  createPDFregister({test: doc_name});  
  createPDFregister({test: 'OTRALINEADEFUNCION'}); 
      
  
}   */


async function delDoc(doc_path,id){

    const storageRef = firebase.storage().ref()   
    
    // Create a reference to the file to delete
    var desertRef = storageRef.child(doc_path);

    // Delete the file
    desertRef.delete().then(function() {
      console.log("Archivo eliminado")
      console.log(id)
    }).catch(function(error) {
      alert(error)
    });


    await delDbDoc(id)

} 




module.exports.getUser = getUser;
module.exports.createRegister = createRegister;
module.exports.editRegister = editRegister;
module.exports.getDoc = getDoc;
module.exports.savePDF = savePDF;
module.exports.createPDFregister = createPDFregister;
module.exports.pdfPublic = pdfPublic; 
module.exports.createResignationRegister = createResignationRegister; 
module.exports.getURL = getURL; 
module.exports.updatePDFregister = updatePDFregister; 
module.exports.createOther = createOther; 
module.exports.getResDoc=getResDoc;



 



//Add multiple docs to collection
//array.forEach((doc) =>  firebase.firestore().collection('trabajadores').add(doc));


