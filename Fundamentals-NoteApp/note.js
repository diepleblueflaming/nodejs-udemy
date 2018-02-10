const fs = require('fs');

// define common message  for note-app
const MESSAGE_ERROR = {
    NOTE_EXIST: 'This note is existed !!!',
    NOTE_NOT_FOUND: 'Note not found !!!',
    EMPTY_DATA: 'No Data to display. Please insert one'
};
const MESSAGE_SUCCESS = {
    ADD_SUCCESS: 'Add new note successfully !!!',
    DELETE_SUCCESS: 'Delete successfully !!!!',
    UPDATE_SUCCESS: 'This note has been updated !!!!'
};
const COMMON_VARIABLE = {
    NOTE_DATA_PATH: 'data/notes-data.json'
};

module.exports = {
    /**
     * @description : get all notes
     * @return {Array}
     */
    fetch: function () {
        try {
            let notesString = fs.readFileSync(COMMON_VARIABLE.NOTE_DATA_PATH);
            let notes = JSON.parse(notesString);
            if(!notes.length){
                this.logError(MESSAGE_ERROR.EMPTY_DATA);
            }
            return notes;
        } catch (e) {
            return [];
        }
    },

    /**
     * @description fetch one note by id
     * @param {Object} note
     * @return {*}
     */
    fetchOne: function (note) {
        const notes = this.fetch();
        if(!notes.length){
            return;
        }
        let noteRespond = notes.filter(n => n.title === note.title);
        if(!noteRespond){
            this.logError(MESSAGE_ERROR.NOTE_NOT_FOUND);
        }else {
            this.log(noteRespond.pop());
        }
    },

    /**
     * @description add  a new note
     * @param {object} note
     * @return {void}
     */
    add: function (note) {
        const notes = this.fetch();
        if (this.isExisted(notes, note)) {
            this.logError(MESSAGE_ERROR.NOTE_EXIST);
        } else {
            notes.push(note);
            this.save(notes);
            this.logSuccess(MESSAGE_SUCCESS.ADD_SUCCESS);
        }
    },

    /**
     * @description remove specified noteisExisted
     * @param {object} note
     * @return {void}
     */
    delete: function (note) {
        let notes = this.fetch();
        if(!notes.length){
            return;
        }
        if (!this.isExisted(notes, note)) {
            this.logError(MESSAGE_ERROR.NOTE_NOT_FOUND);
        } else {
            notes = notes.filter((n) => n.title !== note.title);
            this.save(notes);
            this.logSuccess(MESSAGE_SUCCESS.DELETE_SUCCESS);
        }
    },

    /**
     * @description update a note
     * @param {Object} note
     * @return {*}
     */
    update: function (note) {
        let notes = this.fetch();
        if(!notes.length){
            return;
        }
        if (!this.isExisted(notes, note)) {
            this.logError(MESSAGE_ERROR.NOTE_NOT_FOUND);
        } else {
            notes = notes.map((value) => {
                if(value.title === note.title){
                    value = note;
                }
                return value;
            });
            this.save(notes);
            this.logSuccess(MESSAGE_SUCCESS.UPDATE_SUCCESS);
        }
    },

    /**
     * @description check if a note is exist
     * @param {Array} notes
     * @param {object} note
     * @return {boolean}
     */
    isExisted: function (notes, note) {
        return !!notes.filter((n) => n.title === note.title).length;
    },

    /**
     * @description log note info
     * @param {Object} note
     * @return {void}
     */
    log: function (note) {
        console.log('\n\n-------------------');
        console.log(`Title : ${note.title}`);
        console.log(`Content : ${note.content}`);
        console.log('-------------------\n\n');
    },

    /**
     * @description save new note
     * @param {Array} notes
     * @return {void}
     */
    save: function (notes) {
        let noteString = JSON.stringify(notes);
        fs.writeFileSync(COMMON_VARIABLE.NOTE_DATA_PATH, noteString);
    },

    /**
     * @description log error message to console
     * @param {string} errorMessage
     * @return {void}
     */
    logError: function (errorMessage) {
        console.error(`Error : ${errorMessage}`);
        console.log('\n\n');
    },

    /**
     * @description log success message to console
     * @param {string }successMessage
     * @return {*}
     */
    logSuccess: function (successMessage) {
        console.log(successMessage);
        console.log('\n\n');
    }
};
