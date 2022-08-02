import { v4 as uuidV4 } from 'uuid';

class Tarea {
    id = '';
    description = '';
    completadoEn = null;

    constructor( description ) {
        this.description = description;
        this.id = uuidV4();
        this.completadoEn = null;
    }
}

export default Tarea;