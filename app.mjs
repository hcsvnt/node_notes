import chalk from 'chalk';
import validator from 'validator';
import yargs from './CJS_imports.cjs';
import { hideBin } from 'yargs/helpers';
// import * as notes from './notes.mjs';
import { getNotes, addNote, removeNote, listNotes, readNote } from './notes.mjs';
import { argv } from 'process';


yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: "Note body",
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => addNote(argv.title, argv.body)
})

yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => removeNote(argv.title)
})

yargs.command({
    command: 'list',
    describe: 'List notes',
    handler: argv => listNotes()
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler: argv => readNote(argv.title)
})

yargs.parse();
// console.log(yargs.argv)
