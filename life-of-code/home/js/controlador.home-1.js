var dentro = false;
var fueRegresar = false;
var caminoCarpetas = [];
caminoCarpetas.push(0);
var clickValidar = false;

$("#slc-tiposArchivo").change(function(){
	validarCampoVacio("#slc-tiposArchivo");
});

$("#txt-fileContent").change(function(){
	validarCampoVacio("#txt-fileContent");
});

$("#btn-cambiar-imagen").click(function (){
    $("#modalCambiarImagen").modal("show");
});

$("#btn-cerrar-sesion").click(function(){
    window.location.href ="cerrar-sesion";
});

$("#btn-nuevaCarpeta").click(function (){
    $("#modalNuevaCarpeta").modal("show");
    $.ajax({
		url:"/obtener-carpetas",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
            $("#slc-ubicacionCarpeta").html(`<option value="">En página de inicio</option>`);
			for(var i=0; i<respuesta.length; i++){
                $("#slc-ubicacionCarpeta").append(`<option value="${respuesta[i].codigo_carpeta}">${respuesta[i].nombre_carpeta}</option>`);
			}
        }
	});
});

$("#btn-nuevoArchivo").click(function (){
    $("#modalNuevoArchivo").modal("show");
    $.ajax({
		url:"/obtener-carpetas",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
            $("#slc-ubicacionArchivo").html(`<option value="">En página de inicio</option>`);
			for(var i=0; i<respuesta.length; i++){
                $("#slc-ubicacionArchivo").append(`<option value="${respuesta[i].codigo_carpeta}">${respuesta[i].nombre_carpeta}</option>`);
			}
        }
    });
    $.ajax({
		url:"/obtener-tipos-archivos",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
            $("#slc-tiposArchivo").html(`<option value="">Seleccione una extension</option>`);
			for(var i=0; i<respuesta.length; i++){
                $("#slc-tiposArchivo").append(`<option value="${respuesta[i].codigo_tipo_archivo}">${respuesta[i].tipo_archivo}</option>`);
			}
        }
    });
});

$(document).ready(function(){
    //Esta funcion se ejecuta cuando la página esta lista

    function leerArchivo(e) {
        var archivo = e.target.files[0];
        if (!archivo) {
            return;
        }
        var lector = new FileReader();
        lector.onload = function(e) {
            var contenido = e.target.result;
            mostrarContenido(contenido);
        };
        lector.readAsText(archivo);
    }
    
    function mostrarContenido(contenido) {
        $("#txt-fileContent").html('<!--'+contenido);
    }
    
    document.getElementById('file-input').addEventListener('change', leerArchivo, false);

    refrescarUsuario();

    cargarContenidoHome();
    
	//setInterval(cargarConversacion, 15000);

});

function refrescarUsuario(){
    $.ajax({
		url:"/obtener-usuario",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
                $("#span-usuario").html('<strong>'+respuesta[0].nombre_usuario+'</strong><br>'+respuesta[0].correo);
                $("#img-profile1").attr("src",respuesta[0].url_imagen);
                $("#img-profile2").attr("src",respuesta[0].url_imagen);
			}
        }
	});
}

function cargarContenidoHome(){
	$.ajax({
		url:"/obtener-carpetas",
		dataType:"json",
		success:function(respuesta){
            console.log(respuesta);
            $("#contenedor-principal").html("");
			for(var i=0; i<respuesta.length; i++){
                if(respuesta[i].codigo_carpeta_padre == null){
                    $("#contenedor-principal").append(
                        `<div class="col-lg-4 col-md-6 col-sm-12">
                            <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="img/folder6.png" alt="Card image cap">
                            <div class="card-body">
                                <p class="card-text" style="margin: 0;">${respuesta[i].nombre_carpeta}</p>
                                <small class="text-muted">${respuesta[i].descripcion_carpeta}</small>
                                <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" onclick="detallesCarpeta(${respuesta[i].codigo_carpeta});" class="btn btn-sm btn-outline-secondary">Detalles</button>
                                    <button type="button" onclick="abrirCarpeta(${respuesta[i].codigo_carpeta});" class="btn btn-sm btn-outline-secondary">Abrir</button>
                                </div>
                                <small class="text-muted">${respuesta[i].ultima_modificacion}</small>
                                </div>
                            </div>
                            </div>
                        </div>`
                    );
                }
            }

            $.ajax({
                url:"/obtener-archivos",
                dataType:"json",
                success:function(respuesta){
                    console.log(respuesta);
                    //$("#contenedor-principal").html("");
                    for(var i=0; i<respuesta.length; i++){
                        if(respuesta[i].codigo_carpeta == null){
                            $("#contenedor-principal").append(
                                `<div class="col-lg-4 col-md-6 col-sm-12">
                                    <div class="card mb-4 box-shadow">
                                    <img class="card-img-top" src="img/example-text.png" alt="Card image cap">
                                    <div class="card-body">
                                        <p class="card-text" style="margin: 0;">${respuesta[i].nombre_archivo}${respuesta[i].tipo_archivo}</p>
                                        <small class="text-muted">${respuesta[i].descripcion_archivo}</small>
                                        <div class="d-flex justify-content-between align-items-center">
                                        <div class="btn-group">
                                            <button type="button" onclick="detallesArchivo(${respuesta[i].codigo_archivo});" class="btn btn-sm btn-outline-secondary">Detalles</button>
                                            <button type="button" onclick="editarArchivo(${respuesta[i].codigo_archivo});" class="btn btn-sm btn-outline-secondary">Editar</button>
                                        </div>
                                        <small class="text-muted">${respuesta[i].ultima_modificacion}</small>
                                        </div>
                                    </div>
                                    </div>
                                </div>`
                            );
                        }
                    }
                    dentro = false;
                    fueRegresar = false;
                    $("#div-regresar").css("display","none");
                    console.log(caminoCarpetas);
                }
            });            
		}
    });
}

function detallesCarpeta(codigo){
    alert("Acabas de precionar ver detalles de carpeta - Codigo: "+codigo);
}

function abrirCarpeta(codigo){
    //alert("Acabas de precionar abrir carpeta - Codigo: "+codigo);
    $.ajax({
        url:"/mostrar-carpetas-carpeta",
        method:"POST",
        data:"codigo_carpeta_padre="+codigo,
        dataType:"json",
        success:function(respuesta){
            console.log(respuesta);
            $("#contenedor-principal").html("");
			for(var i=0; i<respuesta.length; i++){
                $("#contenedor-principal").append(
                    `<div class="col-lg-4 col-md-6 col-sm-12">
                        <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="img/folder6.png" alt="Card image cap">
                        <div class="card-body">
                            <p class="card-text" style="margin: 0;">${respuesta[i].nombre_carpeta}</p>
                            <small class="text-muted">${respuesta[i].descripcion_carpeta}</small>
                            <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button type="button" onclick="detallesCarpeta(${respuesta[i].codigo_carpeta});" class="btn btn-sm btn-outline-secondary">Detalles</button>
                                <button type="button" onclick="abrirCarpeta(${respuesta[i].codigo_carpeta});" class="btn btn-sm btn-outline-secondary">Abrir</button>
                            </div>
                            <small class="text-muted">${respuesta[i].ultima_modificacion}</small>
                            </div>
                        </div>
                        </div>
                    </div>`
                );
            }

            $.ajax({
                url:"/mostrar-archivos-carpeta",
                method:"POST",
                data:"codigo_carpeta="+codigo,
                dataType:"json",
                success:function(respuesta){
                    console.log(respuesta);
                    for(var i=0; i<respuesta.length; i++){
                        $("#contenedor-principal").append(
                            `<div class="col-lg-4 col-md-6 col-sm-12">
                                <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="img/example-text.png" alt="Card image cap">
                                <div class="card-body">
                                    <p class="card-text" style="margin: 0;">${respuesta[i].nombre_archivo}${respuesta[i].tipo_archivo}</p>
                                    <small class="text-muted">${respuesta[i].descripcion_archivo}</small>
                                    <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" onclick="detallesArchivo(${respuesta[i].codigo_archivo});" class="btn btn-sm btn-outline-secondary">Detalles</button>
                                        <button type="button" onclick="editarArchivo(${respuesta[i].codigo_archivo});" class="btn btn-sm btn-outline-secondary">Editar</button>
                                    </div>
                                    <small class="text-muted">${respuesta[i].ultima_modificacion}</small>
                                    </div>
                                </div>
                                </div>
                            </div>`
                        );
                    }
                    if(!dentro){
                        $("#div-regresar").css("display","block");
                        dentro=true;
                    }
                    if(!fueRegresar){
                        caminoCarpetas.push(codigo);
                    }
                    console.log(caminoCarpetas);
                    fueRegresar=false;
                }
            });

        }
    });

}

function detallesArchivo(codigo){
    alert("Acabas de precionar ver detalles de archivo - Codigo: "+codigo);
}
function editarArchivo(codigo){
    //alert("Acabas de precionar editar archivo - Codigo: "+codigo);
    var parametros = "codigo_archivo="+codigo;
    $.ajax({
		url:"/obtener-contenido-archivo",
        method:"POST",
        data:parametros,
        dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for(var i=0; i<respuesta.length; i++){
                $("#content-editarArchivo").html(respuesta[0].contenido_archivo);
            }
            $("#modalEditarArchivo").modal("show");
        }
	});
}

$("#btn-crearCarpeta").click(function(){
    clickValidar=true;
    console.log("Le diste click a crear carpeta");
    if(validarCampoVacio("#txt-nombreCarpeta")&&validarPatron(/^[^]+$/,"#txt-nombreCarpeta")){
            var parametros = "nombre_carpeta="+$("#txt-nombreCarpeta").val() + "&" + 
            "descripcion_carpeta="+$("#txt-descripcionCarpeta").val() + "&"+
            "ubicacion_carpeta="+$("#slc-ubicacionCarpeta").val();
            $.ajax({
                url:"/crear-carpeta",
                method:"POST",
                data:parametros,
                dataType:"json",
                success:function(respuesta){
                    //console.log("El valor del affectedRows es: "+respuesta.affectedRows);
                    if (respuesta.affectedRows==1){
                        cargarContenidoHome()
                        alert("Todo correcto");
                    }
                    console.log(respuesta);
                }
            });

        $("#btn-crearCarpeta").attr("data-dismiss","modal");
        clickValidar=false;
    }else{
        $("#btn-crearCarpeta").attr("data-dismiss","");
    }
});

$("#btn-crearArchivo").click(function(){
    clickValidar=true;
    console.log("Le diste click a crear archivo");
    validarCampoVacio("#slc-tiposArchivo");
    validarCampoVacio("#txt-fileContent");
    if(validarCampoVacio("#txt-nombreArchivo")&&validarPatron(/^\S+$/,"#txt-nombreArchivo")&&
        validarCampoVacio("#slc-tiposArchivo")&&validarCampoVacio("#txt-fileContent")){
        //alert("Todo correcto");
            var parametros = "nombre_archivo="+$("#txt-nombreArchivo").val() + "&" + 
            "descripcion_archivo="+$("#txt-descripcionArchivo").val() + "&"+
            "codigo_ubicacion="+$("#slc-ubicacionArchivo").val() + "&"+
            "tipo_archivo="+$("#slc-tiposArchivo").val()+ "&"+
            "contenido_archivo="+$("#txt-fileContent").val();
            $.ajax({
                url:"/crear-archivo",
                method:"POST",
                data:parametros,
                dataType:"json",
                success:function(respuesta){
                    //console.log("El valor del affectedRows es: "+respuesta.affectedRows);
                    if (respuesta.affectedRows==1){
                        cargarContenidoHome();
                        alert("Todo correcto");
                    }
                    console.log(respuesta);
                }
            });

        $("#btn-crearArchivo").attr("data-dismiss","modal");
        clickValidar=false;
    }else{
        $("#btn-crearArchivo").attr("data-dismiss","");
    }
});

$("#btn-guardarImg").click(function(){
    clickValidar=true;
    console.log("Le diste click a guardar nueva imagen");
    if(validarCampoVacio("#new-imageUrl")&&validarPatron(/^.*\.(jpg|JPG|gif|GIF|png|PNG)$/,"#new-imageUrl")){
            var parametros = "nueva_imagen="+$("#new-imageUrl").val();
            $.ajax({
                url:"/actualizar-imagen",
                method:"POST",
                data:parametros,
                dataType:"json",
                success:function(respuesta){
                    //console.log("El valor del affectedRows es: "+respuesta.affectedRows);
                    if (respuesta.affectedRows==1){
                        refrescarUsuario();
                        alert("Todo correcto");
                    }
                    console.log(respuesta);
                }
            });

        $("#btn-guardarImg").attr("data-dismiss","modal");
        clickValidar=false;
    }else{
        $("#btn-guardarImg").attr("data-dismiss","");
    }
});

$("#btn-updateContent").click(function(){
    var parametros = "nuevo_contenido_archivo="+$("#content-editarArchivo").val();
    $.ajax({
        url:"/actualizar-contenido-archivo",
        method:"POST",
        data:parametros,
        dataType:"json",
        success:function(respuesta){
            //console.log("El valor del affectedRows es: "+respuesta.affectedRows);
            if (respuesta.affectedRows==1){
                alert("Todo correcto");
            }
            console.log(respuesta);
        }
    });
});

function validarCampoVacio(id){
    if ($(id).val()==""){
        $(id).removeClass("is-valid");
        $(id).addClass("is-invalid");
        return false;
    } else{
        $(id).removeClass("is-invalid");
        $(id).addClass("is-valid");
        return true;
    }
}

function validarPatron(re,id) {
    if(clickValidar){
        if (re.test($(id).val())){
            $(id).removeClass("is-invalid");
            $(id).addClass("is-valid");
            return true;
        } else{
            $(id).removeClass("is-valid");
            $(id).addClass("is-invalid");
            return false;
        }  
    } 
}

function regresar(){
    fueRegresar=true;
    if(caminoCarpetas.length>2){
        caminoCarpetas.pop();
        abrirCarpeta(caminoCarpetas[caminoCarpetas.length - 1]);
    }else{
        caminoCarpetas.pop();
        cargarContenidoHome();
    }
}

/*////////////////////////////////////////////////////////////////////////////////////*/
/*///////////////////////////////////Script base//////////////////////////////////////*/
/*////////////////////////////////////////////////////////////////////////////////////*/

// Hide submenus
$('#body-row .collapse').collapse('hide'); 

// Collapse/Expand icon
$('#collapse-icon').addClass('fa-angle-double-left'); 

// Collapse click
$('[data-toggle=sidebar-colapse]').click(function() {
    SidebarCollapse();
});

function SidebarCollapse () {
    $('.menu-collapsed').toggleClass('d-none');
    $('.sidebar-submenu').toggleClass('d-none');
    $('.submenu-icon').toggleClass('d-none');
    $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
    
    // Treating d-flex/d-none on separators with title
    var SeparatorTitle = $('.sidebar-separator-title');
    if ( SeparatorTitle.hasClass('d-flex') ) {
        SeparatorTitle.removeClass('d-flex');
    } else {
        SeparatorTitle.addClass('d-flex');
    }
    
    // Collapse/Expand icon
    $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
}
