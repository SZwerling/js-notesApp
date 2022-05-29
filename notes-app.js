// DOM document object model
// Document is the html document
// Object is a javascript object
// So there is a javasciprt object that models the html document
// there is an object provided to us by the browser called 'document'

let notes = [];

const filters = {
   searchText: ''
}

// check for existing saved data to update notes arr
const notesJSON = localStorage.getItem('notes')

if(notesJSON !== null){
   notes = JSON.parse(notesJSON)
}





const renderNotes = (notesObj, filtersObj) => { //takes arr of objects and a 'filters' object
   const filteredNotes = notesObj.filter((note) => {  //compares arr obj 'title' prop with filters obj 'searchText' prop
      return note.title.toLowerCase().includes(filtersObj.searchText.toLowerCase())
   })

   document.querySelector('#notes').innerHTML = '' //clears all text from div w id 'text'

   filteredNotes.forEach((item) => {  // for object in arr that matched
      const noteP = document.createElement('p')  //we create a 'p' element
      if(item.title.length > 0){
         noteP.textContent = 'fucked up'             //give it the text from the title prop
      } else {
         noteP.textContent = 'Unnamed note.'
      }
      document.querySelector('#notes').appendChild(noteP)  //and append to div with id 'notes'
   })
}

renderNotes(notes, filters) //call right away so that the list is on the page

// event listener callback gets called with an argument that represents the event
document.querySelector('#create-note').addEventListener("click", (e) => {
   notes.push({
      title: '',
      body: ''
   })
   localStorage.setItem('notes', JSON.stringify(notes))
   renderNotes(notes, filters)
})


document.querySelector('#search-text').addEventListener('input', (e) => {
   filters.searchText = e.target.value //updating property on filters object
   renderNotes(notes, filters) //calling renderNotes function with 
})

document.querySelector('#filter-by').addEventListener('change', (e) => {
   console.log(e.target.value)
})