const nombre = document.getElementById('empl_name');
const apellido = document.getElementById('empl_lastname');
const boton =document.getElementById('btn_consulta');
const db= firebase.firestore();
const cel = document.getElementById('cedula');


const  getInfo = () => db.collection('trabajadores').where('numero_doc','==',cel.value).get() ;


boton.addEventListener('click', async(e) =>{
    //Add multiple docs to collection
    //array.forEach((doc) =>  firebase.firestore().collection('trabajadores').add(doc));
      

  
   console.log(cel.value);
   // await db.collection('trabajadores').doc().set(
        
    //);
    var info = {
        name:"",
        lastname:"",
        city:"",
        id:"",
        post:"",
        email_e:"",
        email_p:"",
        phone:"",
        id_type:"",
        veg:"",
        size:"",
        address:""

    }
    
    
    const employees = await getInfo();
    employees.forEach(doc => {
        data=doc.data();
        console.log(data.nombre);
        console.log(typeof(data.nombre));
        info.name=data.nombre;
        info.lastname = data.apellido;
        info.city= data.ciudad;
        info.id= data.numero_doc;
        info.post= data.cargo;
        info.email_e= data.correo_empr;
        info.email_p= data.correo_pers;
        info.phone= data.telefono;
        info.id_type= data.tipo_doc;
        info.veg= data.vegetariano;
        info.size = data.talla_camisa;
        info.address = data.direccion;
    });

    //console.log(employees)

    document.getElementById('empl_name').innerHTML=info.name;
    document.getElementById('empl_lastname').innerHTML=info.lastname;
    document.getElementById('empl_city').innerHTML=info.city;
    document.getElementById('empl_address').innerHTML=info.address;
    document.getElementById('empl_email_p').innerHTML=info.email_p;
    document.getElementById('empl_email_e').innerHTML=info.email_e;
    document.getElementById('empl_size').innerHTML=info.size;
    document.getElementById('empl_id').innerHTML=info.id;
    document.getElementById('empl_post').innerHTML=info.post;
    document.getElementById('empl_veg').innerHTML=info.veg;
    document.getElementById('empl_phone').innerHTML=info.phone;
    document.getElementById('empl_doc_type').innerHTML=info.id_type;
    //document.getElementById('empl_city').innerHTML=ddd;
    //const bb = await db.collection('trabajadores').get();
    //console.log(employees);

    
});




//document.getElementById('empl_name').innerHTML='Otracosa';

