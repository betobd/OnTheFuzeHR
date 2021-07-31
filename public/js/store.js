const db= firebase.firestore();
const cedula = document.getElementById('cedula');
const dbUsers = 'trabajadores';
const dbDocs = 'documentos';
const filterDocUser = 'id1';
const filterDocCategory= 'ARL';

const  getUser = () => db.collection(dbUsers).where('numero_doc','==',cedula.value).get();

const getDoc = ()=> db.collection(dbDocs).where('employee_id','==','id1').get();



async function set(file,user_id){
    
    const storageRef = firebase.storage().ref()
    const fileRef = storageRef.child('Aqui el nombre del archivo O file.name')
    await fileRef.put(file)
    const fileURL = await  fileRef.getDownloadURL()

    var Docs = db.collection('documentos').doc(user_id);

    var setWithMerge = Docs.set({
    doc_lik: fileURL,
    categoria: 'EPS',
    descripcion: 'Documento de EPS'
}, { merge: true });

    console.log(fileURL)
} 



//Add multiple docs to collection
//array.forEach((doc) =>  firebase.firestore().collection('trabajadores').add(doc));


