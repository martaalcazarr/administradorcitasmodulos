//IMPORT
import Citas from './classes/citas.js';
import UI from './classes/ui.js';

import {nombreInput, tutorInput, telefonoInput, fechaInput, horaInput, motivoInput, formulario } from './selectores.js';

//INSTANCIAR LAS CLASES (lo convierto en objeto para poder hacer uso de sus metodos)
const ui = new UI();
const administrarCitas = new Citas();

let editando = false;

//OBJETO CON LA INFO DE LA CITA
const citaObj = {
    nombre: '',
    tutor: '',
    telefono: '',
    fecha: '',
    hora: '',
    motivo: ''

}

//agrega datos al objeto citaObj
export function datosCita(e){
    citaObj [e.target.name] = e.target.value;
}

//valida y agrega nueva cita a la clase citas
export function nuevaCita(e) {
    e.preventDefault();
    
    //extraer info de citaobj
    const {nombre, tutor, telefono, fecha, hora, motivo} = citaObj;

    //validar  
    if (nombre === '', tutor === '', telefono === '', fecha === '', hora === '', motivo === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');

        //pasar objeto cita a edicion
        administrarCitas.editarCita({...citaObj});

        //volver el txt del boton al original 
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
        
        //quitar modo edicion
        editando = false;
    }else{
    //generar un id unico por cita
    citaObj.id = Date.now();

    //crear nueva cita
    //con spread ... tomo una copia de citaobj para que 
    //no me la reescriba cada vez que introduzco una cita
    //si le paso solo citaobj y no una copia, le estoy pasando el objeto y la referencia
    //juntos, por lo que se reescribiria siempre, si lo separo, la nueva cita se crea 
    //aparte de cita obj con una copia de citaobj
    administrarCitas.agregarCita({...citaObj});

    //mensaje de agregado correctamente
    ui.imprimirAlerta('Agregado correctamente')
    }

    

    //reiniciar el objeto citaobj
    reiniciarObjeto();

    //reiniciar el formulario en blanco
    formulario.reset(); 

    //mostrar citas en el html
    ui.imprimirCitas(administrarCitas);
}

//reiniciar el objeto
export function reiniciarObjeto(){
    citaObj.nombre = '',
    citaObj.tutor = '',
    citaObj.telefono = '',
    citaObj.fecha = '',
    citaObj.hora = '',
    citaObj.motivo = ''
}

//para eliminar una cita
export function eliminarCita(id){
    //eliminar la cita
    administrarCitas.eliminarCita(id);

    //mostrar un mensaje
    ui.imprimirAlerta('La cita ha sido eliminada');

    //refrescar citas
    ui.imprimirCitas(administrarCitas)
}

//para cargar los datos y modo editar
export function cargarEdicion(cita){
    const {nombre, tutor, telefono, fecha, hora, motivo, id } = cita;

    //llenar los inputs
    nombreInput.value = nombre;
    tutorInput.value = tutor;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    motivoInput.value = motivo;

    //llenar el objeto
    citaObj.nombre = nombre;
    citaObj.tutor = tutor;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.motivo = motivo;
    citaObj.id = id;

    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;
}