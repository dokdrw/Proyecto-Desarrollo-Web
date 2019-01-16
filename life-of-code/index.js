/////////////////////////////////////////
//Servidor web en nodeJS para publicar archivos estaticos.
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();

var credenciales = {
    user:"root",
    password:"",
    port:"3306",
    host:"localhost",
    database:"db_expert_project"
};

//Exponer una carpeta como publica, unicamente para archivos estaticos: .html, imagenes, .css, .js
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

//Verificar si existe una variable de sesion para poner publica la carpeta public home
var publicHome = express.static("home");
app.use(
    function(peticion,respuesta,next){
        if (peticion.session.codigo_usuario){
            //Significa que el usuario si esta logueado
            publicHome(peticion,respuesta,next);
        }
        else
            return next();
    }
);

app.post("/iniciar-sesion", function(peticion, respuesta){
    var conexion = mysql.createConnection(credenciales);
    conexion.query("SELECT codigo_usuario, nombre_usuario, correo FROM tbl_usuario WHERE correo=? and contrasena=sha1(?)",
        [peticion.body.correo, peticion.body.contrasena],
        function(err, data, fields){
                if (data.length>0){
                    peticion.session.codigo_usuario = data[0].codigo_usuario;
                    peticion.session.nombre_usuario = data[0].nombre_usuario;
                    data[0].estatus = 0;
                    respuesta.send(data[0]); 
                }else{
                    respuesta.send({estatus:1, mensaje: "Login fallido"}); 
                }
            	
         }
    ); 
});

app.get("/cerrar-sesion",function(peticion, respuesta){
    peticion.session.destroy();
    respuesta.redirect("login-1.html");
	//respuesta.send("Sesion eliminada");
});

app.get("/obtener-usuario", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'SELECT codigo_usuario, nombre_usuario, correo, url_imagen FROM tbl_usuario WHERE (codigo_usuario = ?)';
    var usuario = [];
    conexion.query(sql, [request.session.codigo_usuario])
    .on("result", function(resultado){
        usuario.push(resultado);
    })
    .on("end",function(){
        response.send(usuario);
    });   
});

app.post("/obtener-contenido-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'SELECT contenido_archivo FROM tbl_archivo WHERE ((codigo_archivo = ?) AND (codigo_usuario = ?))';
    var contenido = [];
    conexion.query(sql, [request.body.codigo_archivo, request.session.codigo_usuario])
    .on("result", function(resultado){
        contenido.push(resultado);
    })
    .on("end",function(){
        response.send(contenido);
    });   
});

app.get("/obtener-carpetas", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'SELECT codigo_carpeta, nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_carpeta_padre FROM tbl_carpeta WHERE (codigo_usuario = ?)';
    var carpetas = [];
    conexion.query(sql, [request.session.codigo_usuario])
    .on("result", function(resultado){
        carpetas.push(resultado);
    })
    .on("end",function(){
        response.send(carpetas);
    });   
});

app.get("/obtener-archivos", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT a.codigo_archivo, a.nombre_archivo, a.descripcion_archivo, a.ultima_modificacion, a.codigo_carpeta, b.tipo_archivo FROM tbl_archivo a 
    INNER JOIN tbl_tipo_archivo b ON (a.codigo_tipo_archivo = b.codigo_tipo_archivo) WHERE (codigo_usuario = ?)`;
    var archivos = [];
    conexion.query(sql, [request.session.codigo_usuario])
    .on("result", function(resultado){
        archivos.push(resultado);
    })
    .on("end",function(){
        response.send(archivos);
    });   
});

app.get("/obtener-tipos-archivos", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `select codigo_tipo_archivo, tipo_archivo, descripcion_archivo from tbl_tipo_archivo`;
    var tipos = [];
    conexion.query(sql)
    .on("result", function(resultado){
        tipos.push(resultado);
    })
    .on("end",function(){
        response.send(tipos);
    });   
});

app.post("/mostrar-carpetas-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT codigo_carpeta, nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_carpeta_padre 
    FROM tbl_carpeta WHERE (codigo_usuario = ?) AND (codigo_carpeta_padre = ?)`;
    var carpetas = [];
    conexion.query(sql, [request.session.codigo_usuario, request.body.codigo_carpeta_padre])
    .on("result", function(resultado){
        carpetas.push(resultado);
    })
    .on("end",function(){
        response.send(carpetas);
    });   
});

app.post("/mostrar-archivos-carpeta",function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `SELECT a.codigo_archivo, a.nombre_archivo, a.descripcion_archivo, a.ultima_modificacion, a.codigo_carpeta, b.tipo_archivo FROM tbl_archivo a 
    INNER JOIN tbl_tipo_archivo b ON (a.codigo_tipo_archivo = b.codigo_tipo_archivo) WHERE (codigo_usuario = ?) AND (codigo_carpeta = ?)`;
    var archivos = [];
    conexion.query(sql, [request.session.codigo_usuario, request.body.codigo_carpeta])
    .on("result", function(resultado){
        archivos.push(resultado);
    })
    .on("end",function(){
        response.send(archivos);
    });   
});

app.get("/obtener-planes", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `select codigo_plan, nombre_plan, descripcion_plan, cantidad_archivos from tbl_plan`;
    var planes = [];
    conexion.query(sql)
    .on("result", function(resultado){
        planes.push(resultado);
    })
    .on("end",function(){
        response.send(planes);
    });   
});

app.post("/obtener-descripcion-plan",function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql =  `select descripcion_plan from tbl_plan where (codigo_plan = ?)`;
    var descripcion = [];
    conexion.query(sql, [request.body.plan])
    .on("result", function(resultado){
        descripcion.push(resultado);
    })
    .on("end",function(){
        response.send(descripcion);
    });   
});

app.get("/obtener-paises", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `select codigo_pais, nombre_pais from tbl_pais`;
    var paises = [];
    conexion.query(sql)
    .on("result", function(resultado){
        paises.push(resultado);
    })
    .on("end",function(){
        response.send(paises);
    });   
});

app.post("/actualizar-imagen", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'UPDATE tbl_usuario SET url_imagen = ? WHERE (codigo_usuario = ?)';
    
    conexion.query(
        sql,
        [request.body.nueva_imagen, request.session.codigo_usuario],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});

app.post("/actualizar-contenido-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = 'UPDATE tbl_archivo SET contenido_archivo = ? WHERE (codigo_usuario = ?)';
    
    if(request.body.nuevo_contenido_archivo==""){
        request.body.nuevo_contenido_archivo="Sin contenido.";
    }

    conexion.query(
        sql,
        [request.body.nuevo_contenido_archivo, request.session.codigo_usuario],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    ); 
});

app.post("/crear-carpeta", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `insert into tbl_carpeta(nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_usuario, codigo_carpeta_padre) 
    values (?,?,now(),now(),?,?);`;

    if(request.body.descripcion_carpeta==""){
        request.body.descripcion_carpeta=null;
    }
    if(request.body.ubicacion_carpeta==""){
        request.body.ubicacion_carpeta=null;
    }
    conexion.query(
        sql,
        [request.body.nombre_carpeta, request.body.descripcion_carpeta, request.session.codigo_usuario, request.body.ubicacion_carpeta],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    );
});

app.post("/crear-archivo", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `insert into tbl_archivo(nombre_archivo, descripcion_archivo, contenido_archivo, fecha_publicacion, 
        ultima_modificacion, codigo_usuario, codigo_carpeta, codigo_tipo_archivo) values (?,?,?,now(),now(),?,?,?)`;

    if(request.body.descripcion_archivo==""){
        request.body.descripcion_archivo=null;
    }
    if(request.body.codigo_ubicacion==""){
        request.body.codigo_ubicacion=null;
    }
    
    conexion.query(
        sql,
        [request.body.nombre_archivo, request.body.descripcion_archivo, request.body.contenido_archivo, 
            request.session.codigo_usuario, request.body.codigo_ubicacion, request.body.tipo_archivo],
        function(err, result){
            if (err) throw err;
            response.send(result);
        }
    );
});

app.post("/registrar-usuario", function(request, response){
    var conexion = mysql.createConnection(credenciales);
    var sql = `INSERT INTO tbl_tarjeta_credito(numero_tarjeta, fecha_expiracion, cvv, ciudad_o_estado, codigo_postal, codigo_pais) 
    VALUES (?,?,?,?,?,?)`;
    var sql2 = `select codigo_tarjeta_credito from tbl_tarjeta_credito order by codigo_tarjeta_credito desc limit 1`;
    var sql3 = `INSERT INTO tbl_usuario(nombre_usuario, correo, contrasena, fecha_nacimiento, codigo_plan, codigo_tarjeta_credito) 
    VALUES (?,?,sha1(?),?,?,?);`;
    var sql4 = `INSERT INTO tbl_usuario(nombre_usuario, correo, contrasena, fecha_nacimiento, codigo_plan) VALUES (?,?,sha1(?),?,?);`;
    if(request.body.plan == 1){
        conexion.query(
            sql4,
            [request.body.nombre, request.body.correo, request.body.password, 
                request.body.nacimiento, request.body.plan],
            function(err, result){
                if (err) throw err;
                if(result.affectedRows==1){
                    console.log("Se guardo el registro de usuario exitosamente");
                    response.send("<script> window.location = '/login-1.html'; alert('Usuario registrado con exito.');</script>");
                    //response.redirect("/login-1.html");
                }
            }
        );
    }else{
        conexion.query(
            sql,
            [request.body.numCard, request.body.expiracion, request.body.cvv, 
                request.body.state, request.body.postal, request.body.pais],
            function(err, result){
                if (err) throw err;
                if(result.affectedRows==1){
                    console.log("Se insertó la informacion de la tarjeta de credito con exito");
                    var codigo = [];
                    conexion.query(sql2)
                    .on("result", function(resultado){
                        codigo.push(resultado);
                    })
                    .on("end",function(){
                        console.log("Se ha obtenido el codigo con exito");
                        conexion.query(
                            sql3,
                            [request.body.nombre, request.body.correo, request.body.password, 
                                request.body.nacimiento, request.body.plan, codigo[0].codigo_tarjeta_credito],
                            function(err, resultado){
                                if (err) throw err;
                                if(resultado.affectedRows==1){
                                    //response.send("<script> window.location = '/login-1.html'; alert('Usuario registrado con exito.');</script>");
                                    console.log("Se guardo el registro de usuario exitosamente");
                                    response.send("<script> window.location = '/login-1.html'; alert('Usuario registrado con exito.');</script>");
                                    //response.redirect("/login-1.html");
                                }
                            }
                        );
                    });                      
                }
            }
        );
    }
});


//Crear y levantar el servidor web.
app.listen(3000);
console.log("Servidor iniciado");
////////////////////////////////////////
