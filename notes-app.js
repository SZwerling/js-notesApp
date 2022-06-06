// DOM document object model
// Document is the html document
// Object is a javascript object
// So there is a javasciprt object that models the html document
// there is an object provided to us by the browser called 'document'


// getSavedNotes is defined in notes-functions.js // gets notes arr from local storage
const notes = getSavedNotes();

const filters = {
   searchText: ''
}

//renderNotes defined in notes-app
renderNotes(notes, filters) //call right away so that the list is on the page

// event listener callback gets called with an argument that represents the event
document.querySelector('#create-note').addEventListener("click", (e) => {
   notes.push({
      id: uuidv4(),
      title: '',
      body: ''
   })
   saveNotes(notes) // defined in notes-functions // saves notes - w new note object - to local storage
   renderNotes(notes, filters)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
   filters.searchText = e.target.value //updating property on filters object
   renderNotes(notes, filters) //calling renderNotes function with 
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
   console.log(e.target.value)
})

