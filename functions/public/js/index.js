const employee_name     =document.getElementById('empl_name');
const employee_lastname =document.getElementById('empl_lastname');
const employee_city     =document.getElementById('empl_city');
const employee_address  =document.getElementById('empl_address');
const employee_emailP   =document.getElementById('empl_email_p');
const employee_emailE   =document.getElementById('empl_email_e');
const employee_size     =document.getElementById('empl_size');
const employee_id       =document.getElementById('empl_id');
const employee_post     =document.getElementById('empl_post');
const employee_vegan    =document.getElementById('empl_veg');
const employee_phone    =document.getElementById('empl_phone');


const cedula = document.getElementById('cedula');
const btn_search        =document.getElementById('btn_consulta');
const select_upload_file= document.getElementById('select_file_button');

const category_docs_section= document.getElementById("category_list_section");
const upload_file_section = document.getElementById("upload_section");
const v_sec = document.getElementById("view_doc_section");
const doc_descrp        = document.getElementById("text_description");
const btn_Add_Doc       = document.getElementById("btnAddDoc");


var user_id ="";
var categ_doc="";
var user_name="";
var documentNumber="";



console.log((new Date).toLocaleString().replace(/\s+/g, '').replace(/[/]/g,'-'));

upload_file_section.style.display = "none";
select_upload_file.style.display="none";
v_sec.style.display="none";

btn_search.addEventListener('click', async(e) =>{
      
    const employees = await getUser(cedula.value);
         
   
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
        console.log(data.nombre);        
        user_id=doc.id;
        documentNumber = data.numero_doc
        user_name=data.nombre;
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
    console.log("el FILE ES:" + file)
    await set(file,user_id,data.nombre);
    //upload_file_section.style.display = "none";

} );


function show_category_list() {
    
    //console.log(value)
    //category_docs_section.style.display = "block"; 
    category_docs_section.style.display = "flex";   
    btn_Add_Doc.style.display="block";
    upload_file_section.style.display = "none";

}

function myFunction(){
    console.log(categ_doc);
    console.log(doc_descrp.value);    
}

function myFunction2() {
          
        select_upload_file.style.display="block";   
    
}

function hide_category_list(){

    category_docs_section.style.display = "none";    
    btn_Add_Doc.style.display="none";
    upload_file_section.style.display = "block";
}

async function genera_tabla(categoryFilter){

  const docs = await getDoc(categoryFilter);

  if(docs.size==0){
   
    v_sec.style.display="none";
    alert('No hay documentos');

  }else{

    /*****Se muestra la seccion de vista de documentos y se declara la sección para mostrarlos ***********/

    v_sec.style.display="block";
    var body = document.getElementsByClassName("show_documents")[0];

    /*****************************************************************************************************/

    // Crea un elemento <table> y un elemento <tbody>
        var tabla   = document.getElementById("docs_table");
        var tblBody = document.createElement("tbody");

    /*******************************************************/

    /********Se resetea la vista de la sección y se crea el encabezado con titulos de la tabla */

        tabla.innerHTML="";
        var encabezado = document.createElement("tr");

        for (var j = 0; j < 4; j++) {
          
          var titulos = document.createElement("th");
          switch (j) {
                    
            case 0:
              var textoCelda = document.createTextNode('ARCHIVO');
              break;

            case 1:
              var textoCelda = document.createTextNode('DESCRIPCIÓN');
              break;

            case 2:
              
              var textoCelda = document.createTextNode("LINK DESCARGA");
              break;

            case 3:
              var textoCelda = document.createTextNode("Borrar");
              break;
            
          }

          titulos.appendChild(textoCelda);
          encabezado.appendChild(titulos);
        } 
        
        tblBody.appendChild(encabezado);

    /*****************************************************************************************************/


    /*********Se leen los archivos filtrados por categoria y se pintan en la tabla *********************/



      docs.forEach(arc =>{
          arcdata=arc.data();
          //console.log('El HyperLink es:'+arcdata.doc_lik);
          var fila = document.createElement("tr");

          for (var j = 0; j < 4; j++) {
              // Crea un elemento <td> y un nodo de texto, haz que el nodo de
              // texto sea el contenido de <td>, ubica el elemento <td> al final
              // de la fila de la tabla
              var celda = document.createElement("td");
              //var textoCelda = document.createTextNode(arcdata[Object.keys(arcdata)[j]]);

              switch (j) {
                
                case 0:
                  var textoCelda = document.createTextNode(arcdata.doc_path);
                  break;

                case 1:
                  var textoCelda = document.createTextNode(arcdata.descripcion);
                  break;

                case 2:
                  
                  var textoDescargar = document.createTextNode("Descargar");
                  var HyperLink = document.createElement("a");
                  var HyperLink_d = arcdata.doc_lik;
                  
                  HyperLink.setAttribute('href',HyperLink_d.data);
                  HyperLink.setAttribute('download',HyperLink_d.data);
                  HyperLink.setAttribute('target','_blank');
                  
                  break;

                case 3:
                  var btnDel = document.createElement("button");
                  var path = document.createTextNode(arcdata.doc_path);
                  
                  btnDel.onclick = function() { 
                    delDoc(path.data,arc.id);
                };
                  btnDel.innerText='Borrar';
                  break;
                
              }

              if(j==2){
                celda.appendChild(textoDescargar);
                celda.appendChild(HyperLink);
                fila.appendChild(celda);
              }else if(j==3){
                celda.appendChild(btnDel);
                fila.appendChild(celda);
              }else{
                celda.appendChild(textoCelda);
                fila.appendChild(celda);
              }
              

            }

            
            // agrega la fila al final de la tabla (al final del elemento tblbody)
            tblBody.appendChild(fila);
            
      });


    // posiciona el <tbody> debajo del elemento <table>
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");

  }

  


}

function selectedCategory(){
    const selected_category = document.getElementById('doc_selected');
    categ_doc = selected_category.options[selected_category.selectedIndex].text;
    console.log(categ_doc);
}

function getUserID(){
  return { id: data.numero_doc };
}

module.exports.getUserID = getUserID;