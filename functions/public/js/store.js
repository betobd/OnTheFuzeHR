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


const getUser = (id_card) => db.collection(dbUsers).where('numero_doc','==',id_card).get();

const getDoc = (cc_id,categoryFilter)=> db.collection(dbDocs).where('employee_id','==',cc_id).where('categoria','==',categoryFilter).get();

const getResDoc = (path)=> db.collection(dbDocs).where('doc_path','==',path).get();

const delDbDoc= (dcDoc) => db.collection(dbDocs).doc(dcDoc).delete();

const createRegister = (value) => db.collection(dbUsers).add(value);

const editRegister = (value,id) => db.collection(dbUsers).doc(id).set(value,{merge: true});

const createPDFregister = (value) => db.collection(dbDocs).add(value);

const createOther = (value) => db.collection('otro').add(value);

const updatePDFregister = (value,id) => db.collection(dbDocs).doc(id).update(value);

const createResignationRegister = (value) =>db.collection('retiros').add(value);

const savePDF = (doc_name) => bucket.file(doc_name);  

const pdfPublic = () => {
    admin.storage().bucket('onthefuzehr.appspot.com').makePublic();  
}

const getURL = (file) => {
  const storageRef = firebase.storage().ref()
  const fileRef = storageRef.child(file);
  return fileRef.getDownloadURL()  
}  

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

async function setF(file,user_id,doc_name,category,description){
    
  const storageRef = firebase.storage().ref()
  const filename = doc_name + '_' + category + '_' +  (new Date).toLocaleString()+'pdf';
  const fileRef = storageRef.child(doc_name +'/'+filename.replace(/\s+/g, '').replace(/[/]/g,'-'));
  
  await fileRef.put(file)
  const fileURL = await  fileRef.getDownloadURL()
  const fileData = await fileRef.getMetadata()

  var Docs = db.collection('documentos').doc();

  var setWithMerge = Docs.set({
      doc_lik: fileURL,
      categoria: category,
      descripcion: description,
      employee_id: user_id,
      nombre_doc: filename,
      doc_path: fileData.fullPath

  }, { merge: true });

  console.log(fileURL)
  //console.log(doc_path)
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


