//IMPORT
import { datosCita, nuevaCita } from '../funciones.js';
import {nombreInput, tutorInput, telefonoInput, fechaInput, horaInput, motivoInput, formulario } from '../selectores.js';


class App {
    constructor(){
        this.InitApp();
    }
    InitApp(){
        eventListeners();
        function eventListeners(){
    nombreInput.addEventListener('input', datosCita);
    tutorInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    motivoInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit',nuevaCita)
        }
    }
}

export default App;