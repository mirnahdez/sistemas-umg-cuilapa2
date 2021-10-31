//var urlPrincipal = 'https://localhost:44392';
var urlPrincipal = 'https://www.umg-sistemas-cuilapa.somee.com';

class usuario {
    constructor(idUsuario, correo, password, tipoUsuario) {
        this.UsuarioId = idUsuario,
            this.CorreoElectronico = correo,
            this.Password = password,
            this.TipoUsuario = tipoUsuario
    }
}

function mostrarOpcionesDisponibles() {
    let sesionActual = localStorage.getItem("sesionActual");
    let htmlNavIndex = "";
    let htmlNavPages = "";


    //definimos los enlaces que van a aparecer cuando haya o no usuarios
    htmlNavPages = `
        <a href="../index.html" class="nav-item nav-link active">Inicio</a>
        <a href="../pages/Facultades.html" class="nav-item nav-link">Facultades</a>
        <a href="../pages/AcercaDe.html" class="nav-item nav-link">Acerca de nosotros</a>
        <a href="../pages/Centros.html" class="nav-item nav-link">Centros Universitarios</a>
        <a href="../pages/contacto.html" class="nav-item nav-link">Contactos</a>
        <a href="../pages/Promociones.html" class="nav-item nav-link">Promociones</a>`;
    htmlNavIndex = `
        <a href="#" class="nav-item nav-link active">Inicio</a>
        <a href="./pages/Facultades.html" class="nav-item nav-link">Facultades</a>
        <a href="./pages/AcercaDe.html" class="nav-item nav-link">Acerca de nosotros</a>
        <a href="./pages/Centros.html" class="nav-item nav-link">Centros Universitarios</a>
        <a href="./pages/contacto.html" class="nav-item nav-link">Contactos</a>
        <a href="./pages/Promociones.html" class="nav-item nav-link">Promociones</a>`;

    if (sesionActual !== null) {
        let usuarioActual = JSON.parse(sesionActual);

        switch (parseInt(usuarioActual.TipoUsuario)) {
            case 1:
                htmlNavPages += `
                <a href="../pages/mostrarCursos.html" class="nav-item nav-link">Ver cursos</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;
                htmlNavIndex += `
                <a href="./pages/mostrarCursos.html" class="nav-item nav-link">Ver cursos</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;
                break;
            case 2:
                htmlNavPages += `
                <a href="../pages/mostrarCursosCatedratico.html" class="nav-item nav-link">Ver cursos</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;
                htmlNavIndex += `
                <a href="./pages/mostrarCursosCatedratico.html" class="nav-item nav-link">Ver cursos</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;
                break;
            case 3:
                htmlNavIndex += `
                <a href="./pages/GestionesContenido.html" class="nav-item nav-link">Crear Anuncios</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;

                htmlNavPages += `
                <a href="../pages/GestionesContenido.html" class="nav-item nav-link">Crear Anuncios</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;

                break;
            case 4:
                htmlNavIndex += `
                <a href="./pages/crearAlumnoYCatedratico.html" class="nav-item nav-link">Crear Registro</a>
                <a href="./pages/mostrarPersona.html" class="nav-item nav-link">Mostrar Registros</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;

                htmlNavPages += `
                <a href="../pages/crearAlumnoYCatedratico.html" class="nav-item nav-link">Crear Registro</a>
                <a href="../pages/mostrarPersona.html" class="nav-item nav-link">Mostrar Registros</a>
                <a href="#" onclick="cerrarSesion()" class="nav-item nav-link">Cerrar Sesion</a>`;
                
                break;
            default:
                break;
        }
    }
    else {
        htmlNavIndex += `<a href="./pages/Ingresar.html" class="nav-item nav-link">Ingresar</a>`;
        htmlNavPages += `<a href="../pages/Ingresar.html" class="nav-item nav-link">Ingresar</a>`;
    }

    if (document.getElementById('navIndex'))
        document.getElementById('navIndex').innerHTML = htmlNavIndex;
    else
        document.getElementById('navPages').innerHTML = htmlNavPages;
}

function validarUsuario() {
    /*
        Tipos de Usuario:
        1    Estudiante
        2    Catedrático
        3    Gestor de Contenido
        4    Auxiliares
    */

    //si existe una sesion de localstorage, eliminarla
    let usuarioActual = localStorage.getItem("sesionActual");
    if (usuarioActual)
        localStorage.removeItem("sesionActual");

    //obtener datos de la pagina de login
    let correo = document.getElementById('correoUsuario').value;
    let password = document.getElementById('passwordUsuario').value;
    let tipoUsuario = document.getElementById('tipoUsuario').value;

    if (correo != "" && password != "") {
        let usuarioActual = new usuario(0, correo, password, parseInt(tipoUsuario));

        //post para autenticar
        postData(urlPrincipal + '/api/validacionusuarios', usuarioActual)
            .then(data => {
                if (data.status === 204 || (data.status >= 200 && data.status < 300)) {
                    // let usuarioLogueado = data.json();
                    // usuarioActual.UsuarioId = usuarioLogueado.usuarioId;
                    // usuarioActual.TipoUsuario = usuarioLogueado.tipoUsuario;

                    document.getElementsByTagName("body")[0].innerHTML = `
                    <div>
                      <h4>¡Usuario Aceptado!</h4>
                      <a href="../index.html">Volver al inicio</a>
                    </div>`;

                    //guardar sesion en localStorage
                    localStorage.setItem('sesionActual', JSON.stringify(usuarioActual));
                }
                else {
                    alert('Usuario no encontrado. Verifique la informacion ingresada.');
                }
                console.log('Status: ' + data.status + ' mensaje: ' + data.statusText)
                console.log(data); // JSON data parsed by `data.json()` call
            });
    }
    else alert("Ambos campos son requeridos.");
}

function cerrarSesion() {
    let usuarioActual = localStorage.getItem("sesionActual");
    if (usuarioActual)
        localStorage.removeItem("sesionActual");
    document.getElementsByTagName("body")[0].innerHTML =
        `<div>
        <h4 style="color: white;">¡Sesion Cerrada exitosamente!</h4>
        <a  style="color: red;" href="../index.html">Volver al inicio</a>
    </div>`;
}

function devuelveIdPropietarioUsuario() {
    let sesionActual = localStorage.getItem("sesionActual");
    if (sesionActual) {
        let usuarioActual = JSON.parse(sesionActual);
        switch (parseInt(usuarioActual.TipoUsuario)) {
            case 2:
                fetch(urlPrincipal + '/api/validacionusuarios/catedratico/' + usuarioActual.usuarioId, { mode: "cors" })
                    .then(response => response.json())
                    .then(json => {
                        // prueba = json;
                        localStorage.setItem('catedratico', json);
                        console.log(json)
                    })
                break;

            default:
                break;
        }
    }
    else alert('Debe loguearse para obtener la informacion.');
}

// Ejemplo implementando el metodo POST:
async function postData(url = '', data = {}) {
    console.log(JSON.stringify(data));
    // Opciones por defecto estan marcadas con un *
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    console.log('Body request: ' + JSON.stringify(data));
    // return response.json(); // parses JSON response into native JavaScript objects
    // console.log(response);
    return response; // parses JSON response into native JavaScript objects
}

