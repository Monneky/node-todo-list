import fs from 'fs';

const file = './db/data.json';

const guardarDB = ( data ) => {
    fs.writeFileSync( file, JSON.stringify(data) );
}

const leerDB = () => {
    if( !fs.existsSync(file) ) {
        return null;
    }

    const info = fs.readFileSync( file, { encoding: 'utf-8' } );
    const data = JSON.parse(info);

    return data;
}

export {
    guardarDB,
    leerDB,
}