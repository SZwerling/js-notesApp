const noteId = location.hash.substring(1)
const notes = getSavedNotes()
const note = notes.find((note) => {
    return note.id === noteId
})

if(note === undefined){
    location.assign('./index.html')
}

const titleInput = document.querySelector('#note-title')
const bodyInput = document.querySelector('#note-body')

titleInput.value = note.title
bodyInput.value = note.body

titleInput.addEventListener('input', (e) => {
    note.title = e.target.value
    saveNotes(notes)
})

bodyInput.addEventListener('input', (e) => {
    note.body = e.target.value
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(noteId) // or note.id
    saveNotes(notes)
    location.assign('./index.html')
})

