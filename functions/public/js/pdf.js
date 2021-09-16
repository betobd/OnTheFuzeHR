var addmore = document.getElementById('add_more_fields');
var reg_options = document.getElementById('resignation_options'); 
var new_company_options = document.getElementById('new_company_options'); 
var sel_motif = document.getElementById('sel_motif');
var divEmpresa = document.createElement('div');
var divSalario = document.createElement('div');
var divCargo = document.createElement('div');

var motif='';


function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

function selected_motif(){
    motif = sel_motif.options[sel_motif.selectedIndex].text;
    if(motif=='Oferta laboral'){

        /* EMPRESA */
        
        var divEmpresa = document.createElement('div');
        divEmpresa.setAttribute('class','col-md-4 mt-3');
        new_company_options.appendChild(divEmpresa)

        var labelEmpresa= document.createElement('label');
        labelEmpresa.setAttribute('class','form-label');
        labelEmpresa.innerHTML="Empresa"
        divEmpresa.appendChild(labelEmpresa);

        var inputEmpresa= document.createElement('input'); 
        inputEmpresa.setAttribute('class','form-control');
        inputEmpresa.setAttribute('type','text');
        inputEmpresa.setAttribute('name','empresa');
        insertAfter(labelEmpresa,inputEmpresa);

                
        /* SALARIO */
        
        var divSalario = document.createElement('div');
        divSalario.setAttribute('class','col-md-4 mt-3');
        insertAfter(divEmpresa,divSalario);

        var labelSalario= document.createElement('label');
        labelSalario.setAttribute('class','form-label');
        labelSalario.innerHTML="Salario";
        divSalario.appendChild(labelSalario);

        var inputSalario= document.createElement('input'); 
        inputSalario.setAttribute('class','form-control');
        inputSalario.setAttribute('type','text');
        inputSalario.setAttribute('name','salario');
        insertAfter(labelSalario,inputSalario);

               


        /* CARGO */
        
        var divCargo = document.createElement('div');
        divCargo.setAttribute('class','col-md-4 mt-3');
        insertAfter(divSalario,divCargo);

        var labelCargo= document.createElement('label')
        labelCargo.setAttribute('class','form-label');
        labelCargo.innerHTML="Cargo"
        divCargo.appendChild(labelCargo);

        var inputCargo= document.createElement('input'); 
        inputCargo.setAttribute('class','form-control');
        inputCargo.setAttribute('type','text');
        inputCargo.setAttribute('name','cargo');
        insertAfter(labelCargo,inputCargo);
        

        
    }else{
        new_company_options.innerHTML='';
    }
}

              

//module.exports.motivoexport = motivoexport; 