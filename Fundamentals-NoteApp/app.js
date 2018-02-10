// load module
const yargs = require('yargs');
const note = require('./note');
const noteValidator = {
    title: {
        describe: 'Note Title',
        demand: true,
        alias: 't'
    },
    content: {
        describe: 'Note Content',
        demand: true,
        alias: 'c'
    }
};

const argv = yargs.
    command('ADD', 'ADD A NEW NOTE', noteValidator).
    command('UPDATE', 'UPDATE ONE NOTE', noteValidator).
    command('REMOVE', 'REMOVE ONE NOTE', {
        title: noteValidator.title
    }).command('GET_ONE', 'GET A NOTE BY TITLE', {
        title: noteValidator.title
    }).
    help().
    argv;

// get user's action
const action = argv._[0].toString().toUpperCase();

// get user input
let noteInput = {
    title: argv.title,
    content: argv.content
};

switch (action) {
    case 'ADD': {
        note.add(noteInput);
        break;
    }
    case 'UPDATE': {
        note.update(noteInput);
        break;
    }
    case 'REMOVE' : {
        note.delete(noteInput);
        break;
    }
    case 'GET_ONE' : {
        note.fetchOne(noteInput);
        break;
    }
    case 'GET_ALL' : {
        let notes = note.fetch();
        if (!notes.length) {
            break;
        }
        notes.forEach((n) => note.log(n));
        break;
    }
    default : {
        console.log(`Please choose one in list action 
        {ADD, UPDATE, REMOVE, GET_ONE, GET_ALL}`);
    }
}
