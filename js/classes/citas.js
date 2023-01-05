class Citas {
    constructor(){
        this.citas = [];
    }
    //metodo
    agregarCita(cita){
        //selecciono una copia de this.citas y la nueva cita
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }

    //metodo
    eliminarCita(id){
        //filtramos todas las citas y traemos todos los id menos el seleccionado
        this.citas = this.citas.filter(cita => cita.id !== id);
    }

    //metodo
    editarCita(citaActualizada){
        //.map crea un nuevo arreglo, itera en cada una de las citas
        //verifica que el id de cita y citaactualizada sean el mismo
        //si es el mismo, ? se reescribe todo el objeto por citaactualizada
        //y si no : se mantiene la cita original
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada :cita);
    }
}

export default Citas;