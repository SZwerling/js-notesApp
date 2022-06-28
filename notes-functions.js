'use strict'

// Read existing notes from local storage

const getSavedNotes = () => {
   const notesJSON = localStorage.getItem("notes");
// try/catch allows the program to continue if JSON data throws an error eg is not JSON
   try {
      return notesJSON ? JSON.parse(notesJSON) : []
   } catch(e) {
      return []
   }
};

// Remove a note from the list
const removeNote = (id) => {
   const noteIndex = notes.findIndex((note) => note.id === id);
   if (noteIndex > -1) {
      notes.splice(noteIndex, 1);
   }
};

// Generate the DOM structure for a note
const generateNoteDom = (note) => {
   const noteElement = document.createElement("div"); //we create a 'p' element
   const textElement = document.createElement("a");
   const button = document.createElement("button");

   // remove note button
   button.textContent = "x";
   noteElement.appendChild(button);
   button.addEventListener("click", () => {
      removeNote(note.id);
      saveNotes(notes);
      renderNotes(notes, filters);
   });

   // set note title text
   if (note.title.length > 0) {
      textElement.textContent = note.title; //give it the text from the title prop
   } else {
      textElement.textContent = "Unnamed note.";
   }
   textElement.setAttribute("href", `/note.html#${note.id}`); // note title as anchor link

   noteElement.appendChild(textElement);
   return noteElement;
};

//sort notes via dropdown
const sortNotes = (notes, sortBy) => {
   if (sortBy === "byEdited") {
      return notes.sort((a, b) => {
         if (a.updatedAt > b.updatedAt) {
            return -1;
         } else if (a.updatedAt < b.updatedAt) {
            return 1;
         } else {
            return 0;
         }
      });
   } else if (sortBy === "byCreated") {
      // By first created
      return notes.sort((a, b) => {
         if (a.createdAt < b.createdAt) {
            return -1;
         } else if (a.createdAt > b.createdAt) {
            return 1;
         } else {
            return 0;
         }
      });
   } else if (sortBy === "alphabetical") {
      return notes.sort((a, b) => {
         if (a.title.toLowerCase() < b.title.toLowerCase()) {
            return -1;
         } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
            return 1;
         } else {
            return 0;
         }
      });
   } else {
      return notes;
   }
};

// Render app notes
const renderNotes = (notesObj, filtersObj) => {
   notesObj = sortNotes(notesObj, filtersObj.sortBy); // using dropdown sort, eg last edited etc
   //takes arr of objects and a 'filters' object
   const filteredNotes = notesObj.filter((note) => //compares arr obj 'title' property with filters obj 'searchText' prop
      note.title.toLowerCase().includes(filtersObj.searchText.toLowerCase())
   );

   document.querySelector("#notes").innerHTML = ""; //clears all text from div w id 'notes'

   filteredNotes.forEach((item) => {
      const noteP = generateNoteDom(item); //creates p element for each note
      document.querySelector("#notes").appendChild(noteP);
   });
};

// Save notes to local storage
const saveNotes = (notes) => {
   localStorage.setItem("notes", JSON.stringify(notes));
};

// Generate the 'last edited message'

const generateLastEdited = (timestamp) =>
   `Last Edited: ${moment(timestamp).fromNow()}`;
