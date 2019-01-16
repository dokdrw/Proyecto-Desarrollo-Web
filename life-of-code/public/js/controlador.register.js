$("#slc-plan").change(function(){
    actualizarDescripcionPlan();
    if($("#slc-plan").val() == 1){
        //$("#div-creditCard").slideUp();
        $("#div-creditCard *").attr("disabled", true);
    }else{
        //$("#div-creditCard").slideDown();
        $("#div-creditCard *").attr("disabled", false);
    }
});

$(document).ready(function(){
    //$("#div-creditCard").slideUp();
    $("#div-creditCard *").attr("disabled", true);
    llenarListaPlanes();
    llenarListaPaises();
});

$('#btn-continuar').click(function(){
    //e.preventDefault();

    var password, password2;

    password = document.getElementById('password');
    password2 = document.getElementById('password2');
    
    password.onchange = password2.onkeyup = passwordMatch;
    
    function passwordMatch() {
        if(password.value !== password2.value)
            password2.setCustomValidity('Las contraseñas no coinciden.');
        else
            password2.setCustomValidity('');
    }
});

function llenarListaPlanes(){
	$.ajax({
		url:"/obtener-planes",
		dataType:"json",
		success:function(respuesta){
			$("#slc-plan").html("");
			for(var i=0; i<respuesta.length; i++){
				$("#slc-plan").append('<option value="'+respuesta[i].codigo_plan+'">'+respuesta[i].nombre_plan+'</option>');
            }
            $("#div-descripcion-plan").html(respuesta[0].descripcion_plan);
		}
	});
}

function actualizarDescripcionPlan(){
    //alert("Se enviara la siguiente informacion: "+$("#slc-plan").val());
    $.ajax({
        url:"/obtener-descripcion-plan",
        method:"POST",
        data:"plan="+$("#slc-plan").val(),
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            $("#div-descripcion-plan").html(respuesta[0].descripcion_plan);
        }
    });
}

function llenarListaPaises(){
	$.ajax({
		url:"/obtener-paises",
		dataType:"json",
		success:function(respuesta){
            $("#slc-pais").html('<option value=""><span class="text-muted">Seleccione un país...</span></option>');
			for(var i=0; i<respuesta.length; i++){
				$("#slc-pais").append('<option value="'+respuesta[i].codigo_pais+'">'+respuesta[i].nombre_pais+'</option>');
            }
		}
	});
}
/////////////////////////////////////////////////////////////////////////////////////////
// Example starter JavaScript for disabling form submissions if there are invalid fields
/////////////////////////////////////////////////////////////////////////////////////
(function() {
'use strict';

window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
    });
}, false);
})();
