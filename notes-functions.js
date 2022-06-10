
// Read existing notes from local storage
 
const getSavedNotes = () => {
   const notesJSON = localStorage.getItem("notes");
   if (notesJSON !== null) {
      return JSON.parse(notesJSON);
   } else {
      return [];
   }
};

// Remove a note from the list
const removeNote = (id) => {
   const noteIndex = notes.findIndex((note) => note.id === id)
   if(noteIndex > -1){
      notes.splice(noteIndex, 1)
   }
}

// Generate the DOM structure for a note
const generateNoteDom = (note) => {
   const noteElement = document.createElement("div"); //we create a 'p' element
   const textElement = document.createElement("a")
   const button = document.createElement("button");

   // remove note button
   button.textContent = "x";
   noteElement.appendChild(button)
   button.addEventListener('click', () => {
      removeNote(note.id)
      saveNotes(notes)
      renderNotes(notes, filters)
   })

   // set note title text 
   if (note.title.length > 0) {
      textElement.textContent = note.title; //give it the text from the title prop
   } else {
      textElement.textContent = "Unnamed note.";
   }
   textElement.setAttribute("href", `/note.html#${note.id}`) // note title as anchor link
   
   noteElement.appendChild(textElement);
   return noteElement;
};

// Render app notes
const renderNotes = (notesObj, filtersObj) => {
   //takes arr of objects and a 'filters' object
   const filteredNotes = notesObj.filter((note) => {
      //compares arr obj 'title' property with filters obj 'searchText' prop
      return note.title
         .toLowerCase()
         .includes(filtersObj.searchText.toLowerCase());
   });

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
