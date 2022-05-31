// Read existing notes from local storage
const getSavedNotes = () => {
   const notesJSON = localStorage.getItem("notes");
   if (notesJSON !== null) {
      return JSON.parse(notesJSON);
   } else {
      return []
   }
};


// Generate the DOM structure for a note
const generateNoteDom = (note) => {
    const noteP = document.createElement('p')  //we create a 'p' element
    if(note.title.length > 0){
      noteP.textContent = 'fucked up'             //give it the text from the title prop
    } else {
      noteP.textContent = 'Unnamed note.'
    }
    return noteP
}

// Render app notes
const renderNotes = (notesObj, filtersObj) => { //takes arr of objects and a 'filters' object
    const filteredNotes = notesObj.filter((note) => {  //compares arr obj 'title' property with filters obj 'searchText' prop
       return note.title.toLowerCase().includes(filtersObj.searchText.toLowerCase())
    })
 
    document.querySelector('#notes').innerHTML = '' //clears all text from div w id 'notes'
 
    filteredNotes.forEach((item) => {  
       const noteP = generateNoteDom(item) //creates p element for each note
       document.querySelector('#notes').appendChild(noteP)  
    })
 }

 // Save notes to local storage
 const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
 }