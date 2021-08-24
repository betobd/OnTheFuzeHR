const db= firebase.firestore();
const dbUsers = 'trabajadores';
const dbDocs = 'documentos';

const getUser = (id_card) => db.collection(dbUsers).where('numero_doc','==',id_card).get();

const getDoc = (categoryFilter)=> db.collection(dbDocs).where('employee_id','==',user_id).where('categoria','==',categoryFilter).get();

const delDbDoc= (dcDoc) => db.collection("documentos").doc(dcDoc).delete();

const createRegister = (value) => db.collection('trabajadores').add(value);

async function set(file,user_id,doc_name){
    
      const storageRef = firebase.storage().ref()
      const filename = doc_name + '_' + categ_doc + '_' +  (new Date).toLocaleString()+'.pdf';
      const fileRef = storageRef.child(filename.replace(/\s+/g, '').replace(/[/]/g,'-'));
      
      await fileRef.put(file)
      const fileURL = await  fileRef.getDownloadURL()
      const fileData = await fileRef.getMetadata()

      var Docs = db.collection('documentos').doc();

      var setWithMerge = Docs.set({
          doc_lik: fileURL,
          categoria: categ_doc,
          descripcion: doc_descrp.value,
          employee_id: user_id,
          nombre_doc: filename,
          doc_path: fileData.fullPath

      }, { merge: true });

      console.log(fileURL)
      //console.log(doc_path)
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
      // Uh-oh, an error occurred!
    });


    await delDbDoc(id)

} 


async function pressDel(algo){

   console.log('Boton borrar presionado' + algo)
} 



//Add multiple docs to collection
//array.forEach((doc) =>  firebase.firestore().collection('trabajadores').add(doc));


