// var productos = [];
// var reciente = [];
// var ordenesTemp = [];
// var recienteOrdenes=[];
// var itemsOrdenesTemp =[];
// var recientesItems = [];
// var itemsStock = [];

// //Objeto usuario
// function objUsuario(idUsuario, tipoUsuario){
// 	this.idUsuario = idUsuario,
// 	this.tipoUsuario = tipoUsuario

// // Limpiar datos de autenticacino del usuario
// function limpiarAutentiacion(){
// 	datosUsuario = JSON.parse(localStorage.getItem("usuario"));
// 	if(datosUsuario != null){

// 		localStorage.removeItem("usuario");
// 	}	
// }

// //Realizar el login
// function enviarform(){
// 	error.style.color='red';
	
// 	const usuarioestudiante = "admin";
// 	const contrasenaadmin ="12345";

// 	const usuariodueno= "cliente";
// 	const contrasenadueno ="12345";
	
	
// 	let idUsuario = document.getElementById("idUsuario").value;
// 	let contrasenaUsuario = document.getElementById("contrasena").value;
	
// 	let errores = 0;
	
// 	var mensajeError = [];

// 	if (idUsuario===""){
// 		mensajeError.push('Ingresa tu Nombre');
// 		errores++; 
// 	}
// 	if (contrasenaUsuario===""){
// 		mensajeError.push('Ingresa tu contrasena');
// 		errores++;
// 	}
	
// 	if(idUsuario == usuarioadmin && contrasenaUsuario == contrasenaadmin){

// 		var usu = new objUsuario, 1);
// 		localStorage.removeItem("usuario");
// 		localStorage.setItem("usuario", JSON.stringify(usu));
// 		window.location.replace("monitoreoOrden.html");

// 	} else if(idUsuario == && contrasenaUsuario == contrasenadueno ){
// 		var usu = new objUsuario, 2);
// 		localStorage.removeItem("usuario");
// 		localStorage.setItem("usuario", JSON.stringify(usu));
// 		window.location.replace("Welcome.html");
// 	}
// 	else{
// 		mensajeError.push('Datos del usuario inválidos');
// 		errores++;
// 	}
	
// 	if(errores > 0) {
// 		error.innerHTML=mensajeError.join(' , ');	
// 		console.log(errores)
// 		return false;
		
		
// 	}
// 	return false;
	
// }


// //Validar permiso de usuario por pagina
// function validarPermisos(tipoPermiso){

// 	datosUsuario = JSON.parse(localStorage.getItem("usuario"));

// 	if(datosUsuario != null){

// 		if(datosUsuario.tipoUsuario != tipoPermiso){
// 			window.location.replace("errorPermisos.html");
// 		}
// 		console.log(datosUsuario.idUsuario)

// 	} else{

// 		window.location.replace("login.html");
// 	}
// }
