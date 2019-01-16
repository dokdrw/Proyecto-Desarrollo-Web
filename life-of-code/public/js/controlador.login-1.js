$("#btn-iniciar-sesion").click(function(){
    $.ajax({
        url:"/iniciar-sesion",
        data:"correo="+$("#correo").val()+"&contrasena="+$("#contrasena").val(),
        method:"POST",
        dataType:"json",
        success:function(respuesta){
            if (respuesta.estatus ==0 ){
                //alert("Credenciales correctas");    
                window.location.href ="home-1.html";
            }else{
                alert("Credenciales incorrectas");
            }
            console.log(respuesta);
        }
    });
});