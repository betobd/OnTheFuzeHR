const employee_name =document.getElementById('empl_name');
const employee_lastname =document.getElementById('empl_lastname');
const employee_city =document.getElementById('empl_city');
const employee_address =document.getElementById('empl_address');
const employee_emailP =document.getElementById('empl_email_p');
const employee_emailE =document.getElementById('empl_email_e');
const employee_size =document.getElementById('empl_size');
const employee_id =document.getElementById('empl_id');
const employee_post =document.getElementById('empl_post');
const employee_vegan =document.getElementById('empl_veg');
const employee_phone =document.getElementById('empl_phone');


const btn_search =document.getElementById('btn_consulta');
const select_upload_file= document.getElementById('select_file_button');

const category_docs_section= document.getElementById("category_list_section");
const upload_file_section = document.getElementById("upload_section");
const doc_descrp= document.getElementById("text_description");
const btn_Add_Doc= document.getElementById("btnAddDoc");

var user_id ="";

upload_file_section.style.display = "none";
select_upload_file.style.display="none";

btn_search.addEventListener('click', async(e) =>{
      
    const employees = await getUser();
    const docs = await getDoc();

    docs.forEach(arc =>{
        arcdata=arc.data();
        console.log('El link es:'+arcdata.doc_lik);
    });
      
   
    let info = {
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
        
        
     employees.forEach(doc => {
        data=doc.data();
        console.log(data.nombre);        
        user_id=doc.id;
        console.log('El ID es:'+ user_id);
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

    

    employee_name.innerHTML=info.name;
    employee_lastname.innerHTML=info.lastname;
    employee_city.innerHTML=info.city;
    employee_address.innerHTML=info.address;
    employee_emailP.innerHTML=info.email_p;
    employee_emailE.innerHTML=info.email_e;
    employee_size.innerHTML=info.size;
    employee_id.innerHTML=info.id;
    employee_post.innerHTML=info.post;
    employee_vegan.innerHTML=info.veg;
    employee_phone.innerHTML=info.phone;
    //document.getElementById('empl_doc_type').innerHTML=info.id_type;
    //document.getElementById('empl_city').innerHTML=ddd;
});


select_upload_file.addEventListener('change', async(e) =>{
    const file = e.target.files[0]
    await set(file,user_id);

} );


function myFunction() {
              
}


function myFunction2() {
          
        select_upload_file.style.display="block";   
    
}


function btn_add(){

    category_docs_section.style.display = "none";    
    btn_Add_Doc.style.display="none";
    upload_file_section.style.display = "block";
}

