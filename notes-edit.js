
const lastEditedEl = document.querySelector('#last-edited')

const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find((note) => {
   return note.id === noteId;
});

if (!note) {
   location.assign("./index.html");
}

const titleInput = document.querySelector("#note-title");
const bodyInput = document.querySelector("#note-body");

titleInput.value = note.title;
bodyInput.value = note.body;
lastEditedEl.textContent = generateLastEdited(note.updatedAt) //generates message using timestamp

titleInput.addEventListener("input", (e) => {
   note.title = e.target.value;
   note.updatedAt = moment().valueOf()
   lastEditedEl.textContent = generateLastEdited(note.updatedAt) //generates message using timestamp
   saveNotes(notes);
});

bodyInput.addEventListener("input", (e) => {
   note.body = e.target.value;
   note.updatedAt = moment().valueOf()
   lastEditedEl.textContent = generateLastEdited(note.updatedAt) //generates message using timestamp
   saveNotes(notes);
});

document.querySelector("#remove-note").addEventListener("click", () => {
   removeNote(noteId); // or note.id
   saveNotes(notes);
   location.assign("./index.html");
});

window.addEventListener("storage", (e) => {
   // event storage fires when local storage is updated
   if (e.key === "notes") {
      notes = JSON.parse(e.newValue);
      note = notes.find((note) => {
         return note.id === noteId;
      });
      if (!note) {
         location.assign("./index.html");
      }
      titleInput.value = note.title;
      bodyInput.value = note.body;
      lastEditedEl.textContent = generateLastEdited(note.updatedAt) //generates message using timestamp
   }
});
