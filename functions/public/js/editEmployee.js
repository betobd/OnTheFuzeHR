
const new_employee_name     =document.getElementById('edit_fist-name_input');
const new_employee_lastname =document.getElementById('edit_last-name_input');
const new_employee_city     =document.getElementById('edit_city_input');
const new_employee_address  =document.getElementById('edit_address_input');
const new_employee_emailP   =document.getElementById('edit_email-p_input');
const new_employee_emailE   =document.getElementById('edit_email-c_input');
const new_employee_size     =document.getElementById('edit_size_input');
const new_employee_id       =document.getElementById('edit_id_input');
const new_employee_post     =document.getElementById('edit_post_input');
const new_employee_vegan    =document.getElementById('edit_vegan_input');
const new_employee_phone    =document.getElementById('edit_phone_input');




async function fillInfo(){

    const employees = await getUser('123456');
    //console.log('Abajo el userID');
    //console.log(userID.getUserID().id);

   
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
        const data=doc.data();
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

    console.log(info);


    new_employee_name.value=info.name;
    new_employee_lastname.value=info.lastname;
    new_employee_city.value=info.city;
    new_employee_address.value=info.address;
    new_employee_emailP.value=info.email_p;
    new_employee_emailE.value=info.email_e;
    new_employee_size.value=info.size;
    new_employee_id.value=info.id;
    new_employee_post.value=info.post;
    new_employee_vegan.value=info.veg;
    new_employee_phone.value=info.phone;
}

fillInfo();