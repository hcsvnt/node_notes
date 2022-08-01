import * as fs from 'node:fs';
import chalk from 'chalk';

const redMessage = (input) => console.log(chalk.red.inverse(input));
const greenMessage = (input) => console.log(chalk.green.inverse(input));

const file = 'notes.json'

const loadNotes = (file) => {
    try {
        const dataBuffer = fs.readFileSync(file);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch(error) {
        console.log('Error reading file:', file);
        return []
    }
}

const saveNotes = (file, notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync(file, dataJSON);
}


export const getNotes = (file) => loadNotes(file);

export const addNote = (title, body) => {
    const notes = loadNotes(file);
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({ title, body });
        greenMessage(`Note added: ${title}`)
        saveNotes(file, notes);
    } else {
        console.log('Note title taken!');
    }

}

export const removeNote = (title) => {
    const notes = loadNotes(file);
    const notesToKeep = notes.filter(note => note.title !== title);
    notesToKeep.length === notes.length ? redMessage('Note not found!') : greenMessage(`Note removed: ${title}`);
    saveNotes(file, notesToKeep);
}

export const listNotes = (fileName = file) => {
    const notes = loadNotes(fileName);
    notes.forEach(note => console.log(note))
}


export const readNote = (title) => {
    const notes = loadNotes(file);
    const noteToRead = notes.find(note => note.title === title);
    noteToRead ? console.log([noteToRead.title, noteToRead.body]) : redMessage('Note not found.');
}
