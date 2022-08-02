import inquirer from 'inquirer';
import colors from 'colors';

const menuOpts = [
    {
        type: 'list',
        name: 'option', 
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${colors.red('1.')}Crear una tarea`
            }, 
            {
                value: '2', 
                name: `${colors.red('2.')}Listar tareas`
            },
            {
                value: '3',
                name: `${colors.red('3.')}Listar tareas completadas`
            }, 
            {
                value: '4', 
                name: `${colors.red('4.')}Listar tareas pendientes`
            },
            {
                value: '5', 
                name: `${colors.red('5.')}Completar tarea(s)`
            },
            {
                value: '6',
                name: `${colors.red('6.')}Borrar tarea`
            }, 
            { 
                value: '0',
                name: `${colors.red('0.')}Salir`
            }
        ]
    }
]

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'description',
            message, 
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];
    const  { description } = await inquirer.prompt( question );
    return description;
}

const inquirerMenu = async() => {
    console.clear();
    console.log( colors.red('=============================='));
    console.log(colors.red('   Seleccione una opcion'));
    console.log( colors.red('==============================\n'));

    const { option } = await inquirer.prompt( menuOpts );

    return option;
}

const pause = async() => {
    const question = [
        {
            type: 'input', 
            name: 'enter',
            message: `Precione ${ colors.red('enter') } para continuar`
        }
    ]

    console.log('\n');
    const { enter } = await inquirer.prompt( question );
    return enter;
}


const deleteItem = async( tareas = [] ) => {
    const choices = tareas.map((tarea, i) => {
        const idx = colors.red(`${i + 1}.`);
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
        }
    });

    choices.unshift({
        value: '0', 
        name: colors.red('0. ') + 'Cancelar'
    })

    const preguntas = [
        {
            type: 'list', 
            name: 'id', 
            message: 'Borrar',
            choices
        }
    ];
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirm = async(message) => {
    const question = [
        {
            type: 'confirm', 
            name: 'ok', 
            message
        }
    ]

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${colors.red(i + 1)}.`;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox', 
            name: 'ids', 
            message: 'Selecciones', 
            choices,
        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}



export { 
    inquirerMenu,
    pause,
    leerInput,
    deleteItem,
    confirm,
    mostrarListadoCheckList,
};