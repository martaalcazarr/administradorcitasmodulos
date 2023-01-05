//importar
import {eliminarCita, cargarEdicion} from '../funciones.js';
import {contenedorCitas} from '../selectores.js';


class UI {
    //metodo
    imprimirAlerta(mensaje, tipo){
        //creo un div
        const divMensaje = document.createElement('div');
        //añado clases css bootstrap
        divMensaje.classList.add('text-center',  'alert', 'd-block', 'col-12');
        //agregar clase de bootstrap según tipo de error para color
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-success');
        }
        //agregar el mensaje al div
        divMensaje.textContent = mensaje;
        //agregar mensaje al DOM/documento
        //selecciono el id de contenido, y le insert el divmensaje before la clase agregarcita
        if(!document.querySelector('.alert')){
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));
        }
        //quitar la alerta tras 5s
        setTimeout( () =>{
            divMensaje.remove();
        }, 5000);
    }
    
    //metodo
    //aplico destructuring desde el parentesis para los parametros delas funciones
    //seria lo mismo que poner {const {citas} = citas}
    imprimirCitas({citas}){
        //utilizo this porque es un metodo de clase dentro de la misma clase
        //limpiarhtml tendria que ser una funcion separada para usarla sin this
        this.limpiarHTML();

        //accedo al arreglo de las citas con foreach
        citas.forEach(cita =>{
            const {nombre, tutor, telefono, fecha, hora, motivo, id} = cita;
            //creo un div para la cita
            const divCita = document.createElement('div');
            //le añado clases de css cita y de bootstrap p3
            divCita.classList.add('cita', 'p-3' );
            //le asignamos como dataset el id
            divCita.dataset.id = id;

            //scripting de los elementos de la cita
            const nombreParrafo = document.createElement('h2');
            nombreParrafo.classList.add('card-title', 'font-weight-bolder');
            nombreParrafo.textContent = nombre;

            const tutorParrafo = document.createElement('p');
            //le doy estilos de css
            tutorParrafo.innerHTML = `
            <span clas="font-weight-bolder">Tutor: </span>${tutor}`;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
            <span class="font-weight-bolder">Telefono: </span>${telefono}`;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
            <span class="font-weight-bolder">Fecha: </span>${fecha}`;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
            <span class="font-weight-bolder">Hora: </span>${hora}`;

            const motivoParrafo = document.createElement('p');
            motivoParrafo.innerHTML = `
            <span class="font-weight-bolder">Motivo: </span>${motivo}`;

            //boton para eliminar cita
            const btnEliminar = document.createElement('button');
            //agregar clases de bootstrap
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            //btnEliminar.innerHTML = 'Eliminar';
            btnEliminar.innerHTML = `Eliminar  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`;
            //funcionalidad al dar click
            btnEliminar.onclick = () => eliminarCita(id);

            //boton para editar cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = `Editar <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>`;
            btnEditar.onclick = () => cargarEdicion(cita);

            //agregar los parrafos a divCita
            divCita.appendChild(nombreParrafo);
            divCita.appendChild(tutorParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(motivoParrafo);
            divCita.appendChild(btnEditar);
            divCita.appendChild(btnEliminar);

            //agregar el divcita al html
            contenedorCitas.appendChild(divCita);
        })
    }

    limpiarHTML(){
        //while haya un firstchild en contenedorcitas, borra el firstchild
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}


export default UI;