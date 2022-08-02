import Tarea from './tarea.js';
import colors from 'colors';
class Tareas {
    _listado;

    get listadoArr() {
        const listado = [];

        Object.keys( this._listado ).forEach( (key) => {
            const tarea = this._listado[key];
            listado.push( tarea )
        } );

        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTareas(id = '') {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray( tareas = [] ) {
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        } );
    }

    listadoCompleto() {
        console.log('\n----------------------------------------------');
        this.listadoArr.forEach((tarea, index) => {
            const indexColor = colors.green(index + 1)
            const { description, completadoEn } = tarea;
            const estado = ( completadoEn ) ? colors.green('Completado') : colors.red('Pendiente')
            console.log(`${indexColor}. ${description} :: ${estado}\n`);
        });
    }

    crearTarea ( desc = '' ) {
        const tarea = new Tarea( desc );
        this._listado[tarea.id] = tarea;
    }

    listarPendientesCompletadas( completadas = true ) {
        let contador = 0;
        this.listadoArr.forEach((tarea) => {
            const {completadoEn, description} = tarea;
            const estado = ( completadoEn ) ? colors.red('Completada') : colors.green('Pendiente')
            if(completadas) {
                if(completadoEn) {
                    contador++;
                    console.log(`${colors.green(contador + '.')} ${description} :: ${colors.red(completadoEn)}`);
                }
            }
            else {
                if(!completadoEn){
                    contador++;
                    console.log(`${colors.red(contador + '.')} ${description} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas( ids = [] ) {
        ids.forEach( id =>{
            const tarea = this._listado[id];
            if( !tarea.completadoEn ){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if( !ids.includes(tarea.id) ) {
                this._listado[tarea.id].completadoEn = null;
            }
        } )
    }
}

export default Tareas;