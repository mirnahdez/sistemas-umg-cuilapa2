async function getCursosAlumno() 
{
  
  var p1 = urlPrincipal + "/api/estudiantes/";  
  var p2 = document.querySelector('#alumno').value;
  var p3 = "/cursos";
  var p4 = p2 ;

  let id = p1 + p4 + p3;
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
   
   btnCrear.addEventListener('click', ()=>{
       facultadId.value = ''
       modalArticulo.show()
       opcion = 'crear'
   })
   
   //funcion para mostrar los resultados
   const mostrar = (articulos) => {
       articulos.forEach(articulo => {
           resultados += `<tr>
                               <td>${articulo.cursoId}</td>
                               <td>${articulo.nombre}</td>
                               
                          </tr>
                       `
                       //<td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>    

       })
       contenedor.innerHTML = resultados
       
   }
   
   //Procedimiento Mostrar
   fetch(id)
       .then( response => response.json() )
       .then( data => mostrar(data) )
       .catch( error => console.log(error))
   
     
   const on = (element, event, selector, handler) => {
       //console.log(element)
       //console.log(event)
       //console.log(selector)
       //console.log(handler)
       element.addEventListener(event, e => {
           if(e.target.closest(selector)){
               handler(e)
           }
       })
   }

}

async function getCursosCatedratico() 
{
  var p1 = urlPrincipal + "/api/catedraticos/";  
  var p2 = document.querySelector('#catedratico').value;
  var p3 = "/cursos";
  var p4 = p2 ;

  let id = p1 + p4 + p3;
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
   
   btnCrear.addEventListener('click', ()=>{
       facultadId.value = ''
       modalArticulo.show()
       opcion = 'crear'
   })
   
   //funcion para mostrar los resultados
   const mostrar = (articulos) => {
       articulos.forEach(articulo => {
           resultados += `<tr>
                               <td>${articulo.cursoId}</td>
                               <td>${articulo.nombre}</td>
                              
                          </tr>
                       `  
                       //<td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>  
       })
       contenedor.innerHTML = resultados
       
   }
   
   //Procedimiento Mostrar
   fetch(id)
       .then( response => response.json() )
       .then( data => mostrar(data) )
       .catch( error => console.log(error))
   
     
   const on = (element, event, selector, handler) => {
       //console.log(element)
       //console.log(event)
       //console.log(selector)
       //console.log(handler)
       element.addEventListener(event, e => {
           if(e.target.closest(selector)){
               handler(e)
           }
       })
   }

}