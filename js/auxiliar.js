class persona {
    constructor(idEstudiante, carnet, usuario, nombre, direccion, fechaNacimiento, telefono) {
        this.Nombre = nombre,
            this.Direccion = direccion,
            this.FechaNacimiento = fechaNacimiento,
            this.Telefono = telefono,
            this.EstudianteId = idEstudiante,
            this.Carnet = carnet,
            this.Usuario = usuario
    }
}

function agregarCatedraticoEstudiante() {
    //obtener el usuario de localstorage
    let sesionActual = localStorage.getItem("sesionActual");
    let usuarioActual = "";
    if (sesionActual)
        usuarioActual = JSON.parse(sesionActual);
    else {
        alert('Debe autenticarse para ejecutar esta operacion!');
        return;
    }

    //obtener la informacion del formulario
    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccion").value;
    let carnet = document.getElementById("carnet").value;
    let correo = document.getElementById("correo").value;
    let pass = document.getElementById("password").value;
    let telefono = document.getElementById("telefono").value;
    let fechaNacimiento = document.getElementById("fechaNacimiento").value;
    let tipoUsuario = document.getElementById("tipoUsuario").value;

    //validar informacion ingresada por el usuario
    if (nombre == "" || direccion == "" || carnet == "" || correo == "" || pass == "" || fechaNacimiento == "") {
        alert("No se creara el catedratico o estudiante. Todos los campos son obligatorios a excepcion del telefono.");
        return;
    }

    let nuevoUsuario = new usuario(0, correo, pass, parseInt(tipoUsuario));
    let nuevaPersona = new persona(0, carnet, nuevoUsuario, nombre, direccion, fechaNacimiento, telefono);

    //enviar popup para confirmar la publicacion
    if (!confirm("¿Esta seguro de crear un nuevo registro?")) {
        return;
    }

    let complementoURL = "";
    if (parseInt(nuevoUsuario.TipoUsuario) === 2) complementoURL = "catedraticos";
    else complementoURL = "estudiantes";

    //si se acepta, consumir la API para guardar esa informacion en la bd
    postData(urlPrincipal + '/api/' + complementoURL, nuevaPersona)
        .then(data => {
            if (data.status === 204 || (data.status >= 200 && data.status < 300))
                alert('Registro Creado!');
            else alert('Registro no se creo. Status Code: ' + data.status);
            console.log(data); // JSON data parsed by `data.json()` call
        });

    //Limpiar controles, liberar clase y arrays
    document.getElementById("nombre").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("carnet").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("password").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("fechaNacimiento").value = "";
    document.getElementById("tipoUsuario").value = "";
}

async function mostrarListadoPersona() {
    let tipoUsuario = document.getElementById('tipoUsuario').value;
    let rutaPeticion = "";

    if (parseInt(tipoUsuario) === 1) rutaPeticion = "estudiantes";
    else rutaPeticion = "catedraticos";
    
    var p1 = urlPrincipal + "/api/" + rutaPeticion;

    let id = p1;
    /*
      let response = await      fetch(`${id}`, { mode:"cors" });
      let data = await response.json()
      .then(json => console.log(json))
       return data; 
    */
    const contenedor = document.querySelector('tbody')
    let resultados = ''
    contenedor.innerHTML = "";

    const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
    const alumno = document.getElementById('alumno')
    var opcion = ''

    btnCrear.addEventListener('click', () => {
        facultadId.value = ''
        modalArticulo.show()
        opcion = 'crear'
    })

    //funcion para mostrar los resultados
    const mostrar = (articulos) => {
        articulos.forEach(articulo => {
            resultados += `<tr>
                               <td>${articulo.carnet}</td>
                               <td>${articulo.nombre}</td>
                               <td>${articulo.direccion}</td>
                               <td>${articulo.fechaNacimiento}</td>
                               <td>${articulo.telefono}</td>
                          </tr>
                       `
            //<td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>  
        })
        contenedor.innerHTML = resultados

    }

    //Procedimiento Mostrar
    fetch(id)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            mostrar(data)
        })
        .catch(error => console.log(error))


    const on = (element, event, selector, handler) => {
        //console.log(element)
        //console.log(event)
        //console.log(selector)
        //console.log(handler)
        element.addEventListener(event, e => {
            if (e.target.closest(selector)) {
                handler(e)
            }
        })
    }

}
