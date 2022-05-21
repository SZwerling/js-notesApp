// DOM document object model
// Document is the html document
// Object is a javascript object
// So there is a javasciprt object that models the html document
// there is an object provided to us by the browser called 'document'

const notes = [
   { title: "This is the title", body: "This is the body" },
   { title: "Note 2", body: "body" },
   { title: "Note 3", body: "information" },
];

const filters = {
   searchText: ''
}

const renderNotes = (notesObj, filtersObj) => { //takes arr of objects and a 'filters' object
   const filteredNotes = notesObj.filter((note) => {  //compares arr obj 'title' prop with filters obj 'searchText' prop
      return note.title.toLowerCase().includes(filtersObj.searchText.toLowerCase())
   })
   document.querySelector('#notes').innerHTML = '' //clears all text from div w id 'text'
   filteredNotes.forEach((item) => {  // for object in arr that matched
      const noteP = document.createElement('p')  //we create a 'p' element
      noteP.textContent = item.title             //give it the text from the title prop
      document.querySelector('#notes').appendChild(noteP)  //and append to div with id 'notes'
   })
}

renderNotes(notes, filters) //call right away so that the list is on the page

// event listener callback gets called with an argument that represents the event
document.querySelector('#create-note').addEventListener("click", (e) => {
   e.target.textContent="Ya clicked it"
   console.log(e.target)
})

document.querySelector('#delete-notes').addEventListener('click', (e) => {
   document.querySelectorAll('#notes').forEach((note) => note.remove())
})

document.querySelector('#search-text').addEventListener('input', (e) => {
   filters.searchText = e.target.value //updating property on filters object
   renderNotes(notes, filters) //calling renderNotes function with 
})
