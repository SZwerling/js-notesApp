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
   const noteElement = document.createElement("a"); //we create an 'a' element
   const textElement = document.createElement("p");
   const statusEl = document.createElement("p")

   // set note title text
   if (note.title.length > 0) {
      textElement.textContent = note.title; //give it the text from the title prop
   } else {
      textElement.textContent = "Unnamed note.";
   }
   
   textElement.classList.add('list-item__title')
   noteElement.appendChild(textElement);

   // set up the link
   noteElement.setAttribute("href", `/note.html#${note.id}`); 
   noteElement.classList.add('list-item')
   // set up status message
   statusEl.textContent = generateLastEdited(note.updatedAt)
   statusEl.classList.add("list-item__subtitle")
   noteElement.appendChild(statusEl)

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
   const notesEl = document.querySelector("#notes")

   notesObj = sortNotes(notesObj, filtersObj.sortBy); // using dropdown sort, eg last edited etc
   //takes arr of objects and a 'filters' object
   const filteredNotes = notesObj.filter((note) => //compares arr obj 'title' property with filters obj 'searchText' prop
      note.title.toLowerCase().includes(filtersObj.searchText.toLowerCase())
   );

   notesEl.innerHTML = ""; //clears all text from div w id 'notes'

   if(filteredNotes.length > 0){
      filteredNotes.forEach((item) => {
         const noteP = generateNoteDom(item); //creates p element for each note
         notesEl.appendChild(noteP);
      });
   } else {
      const emptyMessage = document.createElement("p")
      emptyMessage.textContent = "No notes to show"
      emptyMessage.classList.add('empty-message') // add css class to element created in js
      notesEl.appendChild(emptyMessage)
   }

   
};


// Save notes to local storage
const saveNotes = (notes) => {
   localStorage.setItem("notes", JSON.stringify(notes));
};


// Generate the 'last edited message'
const generateLastEdited = (timestamp) =>
   `Last Edited: ${moment(timestamp).fromNow()}`;
