//Clase para representar el objeto de las publicaciones
class publicacion {
    constructor(titulo, descripcion, imagenes, enlaces, usuario, idPublicacion) {
        this.PublicacionId = idPublicacion,
            this.Titulo = titulo,
            this.Descripcion = descripcion,
            this.Imagenes = imagenes,
            this.Enlaces = enlaces,
            this.Usuario = usuario
    }
}

//clase imagen
class imagen {
    constructor(idImagen, titulo, src) {
        this.ImagenId = idImagen,
            this.Titulo = titulo,
            this.Src = src
    }
}

//clase enlace
class enlace {
    constructor(idEnlace, url) {
        this.EnlaceId = idEnlace,
            this.URL = url
    }
}

class enlaceHTML {
    constructor(idEnlace, url, tituloEnlace) {
        this.idElementoA = idEnlace,
            this.href = url,
            this.valor = tituloEnlace
    }
}

let arregloImagenes = [];
let arregloEnlacesBD = [];
// let arregloEnlacesHTML = [];
let publicacionesTemp = [];

async function agregarImagenPublicacion() {
    //obtenemos todas las imagenes de localstorage
    arregloImagenes = localStorage.getItem("arregloImagenes") === null ? [] : JSON.parse(localStorage.getItem('arregloImagenes'));
    //determinamos el correlativo siguiente
    let correlativoSiguiente = 1;
    if (arregloImagenes.length > 0) correlativoSiguiente = parseInt(arregloImagenes[arregloImagenes.length - 1].ImagenId) + 1;

    let inputImagen = document.getElementById("imagen");
    let arregloArchivos = inputImagen.files;
    let existeImagen = true;

    if (!arregloArchivos || !arregloArchivos.length)
        existeImagen = false;

    if (existeImagen) {
        let imagenPublicacion = arregloArchivos[0];
        let imagenB64 = await convertFileToBase64(imagenPublicacion);
        nuevaImagen = new imagen(correlativoSiguiente, "Imagen " + correlativoSiguiente, imagenB64);
        arregloImagenes.push(nuevaImagen);
        alert("Imagen agregada!");
    }
}

function agregarEnlacePublicacion() {
    // let tituloEnlace = document.getElementById('publicacionTituloEnlace').value;
    let enlacePublicacion = document.getElementById('enlace').value;

    if (enlacePublicacion == "") {
        alert("No se guardara el enlace. Debe ingresar el mismo en el espacio designado.");
        return;
    }

    nuevoEnlaceBD = new enlace(0, enlacePublicacion);
    // nuevoEnlaceHTML = new enlaceHTML(0, enlacePublicacion, tituloEnlace);
    arregloEnlacesBD.push(nuevoEnlaceBD);
    alert('Enlace agregado!');
    // arregloEnlacesHTML.push(nuevoEnlaceHTML);

    //limpiar controles
    // document.getElementById('publicacionTituloEnlace').value = "";
    document.getElementById('enlace').value = "";
}

function agregarPublicacion() {
    
    //obtener el usuario de localstorage
    let sesionActual = localStorage.getItem("sesionActual");
    let usuarioActual = "";
    if (sesionActual)
        usuarioActual = JSON.parse(sesionActual);
    else {
        alert('Debe autenticarse para ejecutar esta operacion!');
        return;
    }
    // usuarioActual = new usuario(1, "x", "x", 0);

    //obtener la informacion del formulario
    let titulo = document.getElementById("publicacionTitulo").value;
    let descripcion = document.getElementById("publicacionDescripcion").value;

    //validar informacion ingresada por el usuario
    if (titulo == "" || descripcion == "") {
        alert("No se guardara la publicacion. Debe definir como minimo el titulo y descripcion.");
        return;
    }

    usuarioActual.UsuarioId = 1;
    nuevaPublicacion = new publicacion(titulo, descripcion, [], [], usuarioActual)

    //ver si existen imagenes y enlaces y agregarlas a la clase
    if (arregloEnlacesBD.length > 0) {
        // arregloEnlacesBD.forEach(element => {
        //     enlacePublicacion
        // });
        nuevaPublicacion.Enlaces = arregloEnlacesBD;
    }

    if (arregloImagenes.length > 0) {
        imagenesPublicacion = [];
        arregloImagenes.forEach(element => {
            let imagenPublicacion = new imagen(0, element.Titulo, `${element.ImagenId}`);
            imagenesPublicacion.push(imagenPublicacion);
        });
        nuevaPublicacion.Imagenes = imagenesPublicacion;
    }

    //enviar popup para confirmar la publicacion
    if (!confirm("¿Esta seguro de guardar la publicacion?")) {
        return;
    }

    //si se acepta, consumir la API para guardar esa informacion en la bd
    postData(urlPrincipal + '/api/publicaciones', nuevaPublicacion)
        .then(data => {
            console.log(data); // JSON data parsed by `data.json()` call
        });

    //guardamos arreglo de Imagenes en localStorage (en la base de datos, en el src se guardara el correlativo para que se encuentre la imagen referente a la publicacion)
    if (arregloImagenes.length > 0)
        localStorage.setItem("arregloImagenes", JSON.stringify(arregloImagenes));

    //Limpiar controles, liberar clase y arrays
    arregloImagenes = [];
    arregloEnlacesBD = [];
    document.getElementById("publicacionTitulo").value = "";
    document.getElementById("publicacionDescripcion").value = "";
}

function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });
}

function mostrarPublicaciones() {
    fetch(urlPrincipal + '/api/publicaciones', { mode: "cors" })
        .then(response => response.json())
        .then(publicaciones => {
            let html = "";
            if (publicaciones.length > 0) {
                publicaciones.forEach(element => {
                    //obtenemos el arreglo de imagenes
                    arregloImagenes = localStorage.getItem("arregloImagenes") === null ? [] : JSON.parse(localStorage.getItem('arregloImagenes'));

                    html += `
                    <div id="Publicacion.${element.publicacionId}">
                        <h3>${element.titulo}</h3>
                        <p>${element.descripcion}</p>`;

                    //si tiene imagenes
                    if (element.imagenes.length > 0) {
                        html += `<ul>`;
                        element.imagenes.forEach(img => {

                            //si el arreglo tiene imagenes
                            if (arregloImagenes.length > 0) {

                                //por cada imagen
                                arregloImagenes.forEach(imgLS => {

                                    //si el id coincide con el registrado devolvemos la imagen
                                    if (parseInt(imgLS.ImagenId) === parseInt(img.src)) {
                                        // console.log('Por cada imagen, SRC: ' + imgLS.Src)
                                        html += `<li style="list-style-type: none;"><img id="Imagen.${img.imagenId}"` + `src="` + imgLS.Src + `" alt="${imgLS.Titulo}"></li>`;
                                    }
                                });
                            }
                        });
                        html += `</ul>`;
                    }

                    //si tiene enlaces
                    if (element.enlaces.length > 0) {
                        html += `
                        <h4>Enlaces Relacionados: </h4>
                            <ul>`;
                        let contador = 1;
                        element.enlaces.forEach(enl => {
                            html += `<li><a id="Enlace.${enl.enlaceId}" href="${enl.url}">Enlace #${contador}</a></li>`;
                            contador++;
                        });

                        html += `</ul>`;
                    }

                    html += "</div>";
                });

                document.getElementById("anuncios").innerHTML = html;
            }
        })
        .catch(error => console.log(error));
}


// function buscarImagenLS(imagenId) {
//     //obtenemos el arreglo de imagenes
//     arregloImagenes = localStorage.getItem("arregloImagenes") === null ? [] : JSON.parse(localStorage.getItem('arregloImagenes'));

//     //si el arreglo tiene imagenes
//     if (arregloImagenes.length > 0) {
//         console.log('hay imagenes en ls')
//         //por cada imagen
//         arregloImagenes.forEach(element => {
//             console.log('Por cada imagen: ' + element)
//             // console.log(element);
//             //si el id coincide con el registrado devolvemos la imagen
//             if (parseInt(element.ImagenId) === parseInt(imagenId)) {
//                 console.log('COincidencia: ' + element)
//                 return element;
//             }
//         });
//     }
//     else return new imagen(-1, "", ""); //de lo contrario enviamos un objeto de imagen vacio
// }


// function postAPI(url, cuerpo) {
//     fetch(url,
//         {
//             mode: "cors",
//             headers: {
//                 "Content-type": "application/json"
//             },
//             method: "POST",
//             body: JSON.stringify(cuerpo)
//             // body: cuerpo
//         })
//         .then(response => response.json())
//         .then(json => console.log(json))
// }

// var prueba;

// function mostrarVistaPreviaPublicacion() {
//     fetch('https://localhost:44392/api/publicaciones', { mode: "cors" })
//         .then(response => response.json())
//         .then(json => {
//             prueba = json;
//             console.log(json)
//         })
//     // .catch(error => console.log(error));
// }
