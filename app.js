import { confirm, deleteItem, inquirerMenu, leerInput, mostrarListadoCheckList, pause } from './helpers/inquirer.js';
import Tareas from './models/tareas.js';
import { guardarDB, leerDB,  } from './helpers/guardarArchivo.js';

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();
    if( tareasDB ) {
        tareas.cargarTareasFromArray( tareasDB );
    }
    do{
        opt = await inquirerMenu();
        switch ( opt ) {
            case '1':
                // Crear opcion
                const description = await leerInput('Description: ');
                tareas.crearTarea( description );
                guardarDB( tareas.listadoArr );
                break;
            case '2': 
                tareas.listadoCompleto( tareas.listadoArr );
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5': 
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas(ids)
                guardarDB( tareas.listadoArr );
                break;
            case '6':
                const id = await deleteItem(tareas.listadoArr);
                if(id !== '0') {
                    const ok = await confirm('Are you sure you want to delete this item?');
                    if(ok) {
                        tareas.borrarTareas(id);
                        console.log('Item Deleted successufuly');
                        guardarDB( tareas.listadoArr );
                    }
                }
                break;
        }

        await pause();
    }while( opt !== '0' );
}

main();
