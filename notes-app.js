// DOM document object model
// Document is the html document
// Object is a javascript object
// So there is a javasciprt object that models the html document
// there is an object provided to us by the browser called 'document'


// getSavedNotes is defined in notes-functions.js // gets notes arr from local storage
let notes = getSavedNotes();

const filters = {
   searchText: '',
   sortBy: 'byEdited'
}

//renderNotes defined in notes-app
renderNotes(notes, filters) //call right away so that the list is on the page

// event listener callback gets called with an argument that represents the event
document.querySelector('#create-note').addEventListener("click", (e) => {
   const timestamp = moment().valueOf()
   const newId = uuidv4()

   notes.push({
      id: newId,
      createdAt: timestamp,
      updatedAt: timestamp,
      title: '',
      body: ''
   })
   saveNotes(notes) // defined in notes-functions // saves notes - w new note object - to local storage
   location.assign(`/note.html#${newId}`)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
   filters.searchText = e.target.value //updating property on filters object
   renderNotes(notes, filters) //calling renderNotes function with 
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
   filters.sortBy = e.target.value
   renderNotes(notes, filters)
})

window.addEventListener("storage", (e) => { // event storage fires when local storage is updated
   if (e.key === "notes") {        // key is where oldValue and newValue are // only change is e.key equals notes.
      notes = JSON.parse(e.newValue); // newValue is a JSON array containing all the notes
      renderNotes(notes, filters);  // rerender to update everything on the screen
   }
});


// Unix Epoch starts January 1st 1970 00:00:00
// const now = new Date()  // built-in js date function
// const timestampOne = now.getTime()
// We'll use 'moment' even though it is deprecated 

