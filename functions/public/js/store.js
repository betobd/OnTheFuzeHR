const firebase = require('firebase/app');
const admin = require('firebase-admin');
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

const delDbDoc= (dcDoc) => db.collection("documentos").doc(dcDoc).delete();

const createRegister = (value) => db.collection('trabajadores').add(value);

const createPDFregister = (value) => db.collection('pdfRegister').add(value);

const editRegister = (value,id) => db.collection('trabajadores').doc(id).set(value,{merge: true})

//const savePDF = (doc_name,file) =>firebase.storage().ref('entrevistas/'+doc_name).put(file);

const savePDF = (doc_name) => bucket.file(doc_name);

  /*

 async function set(doc_name){
    
      const storageRef = firebase.storage().ref()
      const fileRef = storageRef.child(doc_name);
      
      const fileURL = await  fileRef.getDownloadURL()
      const fileData = await fileRef.getMetadata()

      var Docs = db.collection('entrevista').doc();

      var setWithMerge = Docs.set({
          doc_lik: fileURL,
          descripcion: 'Entrevista retiro',
          doc_path: fileData.fullPath

      }, { merge: true });

      console.log(fileURL)
      //console.log(doc_path) 
}  

*/



/* // Get the download URL
starsRef.getDownloadURL().then(function(url) {
  // Insert url into an <img> tag to "download"
}).catch(function(error) {

  // A full list of error codes is available at
  // https://firebase.google.com/docs/storage/web/handle-errors
  switch (error.code) {
    case 'storage/object-not-found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;

    

    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
}); */


async function delDoc(doc_path,id){

    const storageRef = firebase.storage().ref()   
    
    // Create a reference to the file to delete
    var desertRef = storageRef.child(doc_path);

    // Delete the file
    desertRef.delete().then(function() {
      console.log("Archivo eliminado")
      console.log(id)
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });


    await delDbDoc(id)

} 




module.exports.getUser = getUser;
module.exports.createRegister = createRegister;
module.exports.editRegister = editRegister;
module.exports.getDoc = getDoc;
module.exports.savePDF = savePDF;
module.exports.createPDFregister = createPDFregister;
//module.exports = {
//  set: set
//}



//Add multiple docs to collection
//array.forEach((doc) =>  firebase.firestore().collection('trabajadores').add(doc));


