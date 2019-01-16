/*use db_expert_project;*/
insert into tbl_pais (nombre_pais) values ("Honduras");
insert into tbl_pais (nombre_pais) values ("USA");
insert into tbl_pais (nombre_pais) values ("España");
insert into tbl_pais (nombre_pais) values ("Japón");
insert into tbl_pais (nombre_pais) values ("China");
insert into tbl_pais (nombre_pais) values ("Rusia");

insert into tbl_plan (nombre_plan, descripcion_plan, cantidad_archivos) values ("Gratuito", 
"Usuario de tipo gratuito, con posibilidad a almacenar un límite de 25 archivos.", 25);
insert into tbl_plan (nombre_plan, descripcion_plan, cantidad_archivos) values ("Premium", 
"Usuario no gratuito con cuota de $7.00 mensual, con posibilidad a almacenar un límite 150 archivos.", 150);
insert into tbl_plan (nombre_plan, descripcion_plan, cantidad_archivos) values ("Super-platinum", 
"Usuario no gratuito con cuota de $14.00 mensual, con posibilidad a almacenar un límite 350 archivos.", 350);

insert into tbl_tarjeta_credito(numero_tarjeta, fecha_expiracion, cvv, ciudad_o_estado, codigo_postal, codigo_pais) 
values ("0000000000000000","08/19","0000","Tokyo","12345",4);
insert into tbl_tarjeta_credito(numero_tarjeta, fecha_expiracion, cvv, ciudad_o_estado, codigo_postal, codigo_pais) 
values ("8888888888888888","08/20","8888","Tokyo","12345",4);
insert into tbl_tarjeta_credito(numero_tarjeta, fecha_expiracion, cvv, ciudad_o_estado, codigo_postal, codigo_pais) 
values ("4444444444444444","08/24","4444","Tokyo","12345",4);

insert into tbl_usuario(nombre_usuario, correo, contrasena, fecha_nacimiento, url_imagen, codigo_plan, codigo_tarjeta_credito) 
values ("naruto","naruto@gmail.com",sha1("asd.456"),now(), "img/profile-pics/naruto.png",2,1);
insert into tbl_usuario(nombre_usuario, correo, contrasena, fecha_nacimiento, url_imagen, codigo_plan, codigo_tarjeta_credito) 
values ("sasuke","sasuke@gmail.com",sha1("asd.456"),now(), "img/profile-pics/sasuke.png",3,2);
insert into tbl_usuario(nombre_usuario, correo, contrasena, fecha_nacimiento, url_imagen, codigo_plan, codigo_tarjeta_credito) 
values ("gaara","gaara@gmail.com",sha1("asd.456"),now(),"img/profile-pics/gara.png",2,3);
insert into tbl_usuario(nombre_usuario, correo, contrasena, fecha_nacimiento, url_imagen, codigo_plan) 
values ("sakura","sakura@gmail.com",sha1("asd.456"),now(),"img/profile-pics/sakura.png",1);

insert into tbl_tipo_archivo (tipo_archivo, descripcion_archivo) values (".html", "Archivo de tipo HTML.");
insert into tbl_tipo_archivo (tipo_archivo, descripcion_archivo) values (".js", "Archivo de tipo JavaScript.");
insert into tbl_tipo_archivo (tipo_archivo, descripcion_archivo) values (".txt", "Archivo de tipo Texto.");
insert into tbl_tipo_archivo (tipo_archivo, descripcion_archivo) values (".json", "Archivo de tipo JSON.");
insert into tbl_tipo_archivo (tipo_archivo, descripcion_archivo) values (".php", "Archivo de tipo PHP.");

insert into tbl_carpeta(nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_usuario) 
values ("Carpeta HTML","Carpeta con archivos de tipo HTML.",now(),now(),1);
insert into tbl_carpeta(nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_usuario) 
values ("Carpeta varios","Carpeta con archivos de diversos tipo.",now(),now(),3);
insert into tbl_carpeta(nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_usuario, codigo_carpeta_padre) 
values ("Carpeta JavaScript","Carpeta con archivos de tipo JavaScript.",now(),now(),1,1);
insert into tbl_carpeta(nombre_carpeta, descripcion_carpeta, fecha_creacion, ultima_modificacion, codigo_usuario, codigo_carpeta_padre) 
values ("Carpeta Textos","Carpeta con archivos de tipo texto bruto.",now(),now(),3,2);

insert into tbl_archivo(nombre_archivo, descripcion_archivo, contenido_archivo, fecha_publicacion, ultima_modificacion, codigo_usuario, codigo_carpeta, codigo_tipo_archivo) 
values ("Archivo 1","Archivos de tipo HTML.", '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Home Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
	Hola mundo
</body>
</html>',now(),now(),1,1,1);
insert into tbl_archivo(nombre_archivo, descripcion_archivo, contenido_archivo, fecha_publicacion, ultima_modificacion, codigo_usuario, codigo_tipo_archivo) 
values ("Archivo 2","Archivos de tipo texto.", 'Contenido del archivo 2.',now(),now(),1,3);
insert into tbl_archivo(nombre_archivo, descripcion_archivo, contenido_archivo, fecha_publicacion, ultima_modificacion, codigo_usuario, codigo_carpeta, codigo_tipo_archivo) 
values ("Archivo 3","Archivos de tipo texto.", 'Contenido del archivo 3.',now(),now(),3,2,3);
insert into tbl_archivo(nombre_archivo, descripcion_archivo, contenido_archivo, fecha_publicacion, ultima_modificacion, codigo_usuario, codigo_tipo_archivo) 
values ("Archivo 4","Archivos de tipo texto.", 'Contenido del archivo 4.',now(),now(),2,3);


