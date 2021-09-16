const firebaseConfig = require('./firebaseConfig');

/* const firebaseConfig = {
    apiKey: "AIzaSyAEHA-9C4dq-krVUDpF2gNfnp1AujYC2uI",
    authDomain: "onthefuzehr.firebaseapp.com",
    databaseURL: "https://onthefuzehr-default-rtdb.firebaseio.com",
    projectId: "onthefuzehr",
    storageBucket: "onthefuzehr.appspot.com",
    messagingSenderId: "333309219",
    appId: "1:333309219:web:da63eb25d9436902985896",
    measurementId: "G-FZPGEKD1EH"
  }; */

firebase.initializeApp(firebaseConfig.firebaseConfig);

const db= firebase.firestore();
const upload_file_button = document.getElementById("select_file_button");
const file_description = document.getElementById("file_description_area");
const category_selected = document.getElementById("category_selected");
const employee_id_doc = document.getElementById("employee_id_doc");
const employee_name = document.getElementById("employee_name");
var doc_category = '';


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

function selectedCategory(){
    doc_category = category_selected.options[category_selected.selectedIndex].text;
}

upload_file_button.addEventListener('change', async(e) =>{
    const file = e.target.files[0]
    console.log("el FILE ES:" + file)
    await setF(file,employee_id_doc.value,employee_name.value,doc_category,file_description.value);
    alert('Document Uploaded Successfully - Documento Cargado Correctamente')

} );

