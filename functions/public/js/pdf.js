var addmore = document.getElementById('add_more_fields');
var reg_options = document.getElementById('resignation_options');
var sel_motif = document.getElementById('sel_motif');

var motif='';

addmore.onclick = function(){
    var divEmpresa = document.createElement('div');
        var labelEmpresa= document.createElement('label')
        var inputEmpresa= document.createElement('input')
    
    
        divEmpresa.setAttribute('class','col-6');
        labelEmpresa.setAttribute('class','form-label');
        labelEmpresa.innerHTML="Empresa"
        inputEmpresa.setAttribute('class','form-control');
        inputEmpresa.setAttribute('type','text');

        
        reg_options.appendChild(divEmpresa);
        divEmpresa.appendChild(labelEmpresa);
        labelEmpresa.appendChild(inputEmpresa);

}

function selected_motif(){
    motif = sel_motif.options[sel_motif.selectedIndex].text;
    if(motif=='Estudios'){

        /* EMPRESA */
        
        var divEmpresa = document.createElement('div');
        divEmpresa.setAttribute('class','col-md-4 mt-3');

        var labelEmpresa= document.createElement('label')
        labelEmpresa.setAttribute('class','form-label');
        labelEmpresa.innerHTML="Empresa"

        var inputEmpresa= document.createElement('input'); 
        inputEmpresa.setAttribute('class','form-control');
        inputEmpresa.setAttribute('type','text');

        
        reg_options.appendChild(divEmpresa);
        divEmpresa.appendChild(labelEmpresa);
        labelEmpresa.appendChild(inputEmpresa);

        /* SALARIO */
        
        var divSalario = document.createElement('div');
        divSalario.setAttribute('class','col-md-4 mt-3');

        var labelSalario= document.createElement('label')
        labelSalario.setAttribute('class','form-label');
        labelSalario.innerHTML="Salario"

        var inputSalario= document.createElement('input'); 
        inputSalario.setAttribute('class','form-control');
        inputSalario.setAttribute('type','text');

        
        divEmpresa.appendChild(divSalario);
        divSalario.appendChild(labelSalario);
        labelSalario.appendChild(inputSalario);


        /* CARGO */
        
        var divCargo = document.createElement('div');
        divCargo.setAttribute('class','col-md-4 mt-3');

        var labelCargo= document.createElement('label')
        labelCargo.setAttribute('class','form-label');
        labelCargo.innerHTML="Cargo"

        var inputSalario= document.createElement('input'); 
        inputSalario.setAttribute('class','form-control');
        inputSalario.setAttribute('type','text');

        
        divEmpresa.appendChild(divCargo);
        divCargo.appendChild(labelCargo);
        labelCargo.appendChild(inputSalario);
    }
}

              

//module.exports.motivoexport = motivoexport; 