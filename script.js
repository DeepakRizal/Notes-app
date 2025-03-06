const triggerModalBtn = document.querySelector(".trigger-modal-btn");
const writeNoteModal = document.querySelector(".write-note-modal");
const cancel = document.querySelector(".cancel");
const create = document.querySelector(".create-note");
const modalform = document.querySelector(".modal-form");
const noteTitle = document.querySelector("#title");
const notesBody = document.querySelector("#notes");
const notesTitleError = document.querySelector(".notes-title-error");
const notesbodyError = document.querySelector(".notes-body-error");
const category = document.querySelector("#category");
const categoryError = document.querySelector(".category-error");
const notesContainer = document.querySelector(".notes-container");

let notesArray = [];
let editingNoteId = null;

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function displayNotes(notes) {
  const notesMarkup = notes
    .map((note) => {
      return `
    <div class="note">
    <div class="buttons" >
    <button class="edit" >
    <img class="edit-icon" data-id="${note.id}" src="./assests/edit.png" >
    </button>
    <button class="delete">
    <img class="delete-icon" src="./assests/delete.png"
    </button>
    </div>
     <h3 class="title" >${note.title}</h3>
     <p class="description" >${note.note
       .split(" ")
       .slice(0, 4)
       .join(" ")}...</p>
     <p class="category" >Category: ${note.category}</p>
    </div>
    `;
    })
    .join("");

  notesContainer.innerHTML = "";
  notesContainer.innerHTML = notesMarkup;
}

function createNote(id, title, note, category) {
  const newCategory = {
    id,
    title,
    note,
    category,
  };

  console.log(newCategory);
  notesArray = [...notesArray, newCategory];
  displayNotes(notesArray);
}

triggerModalBtn.addEventListener("click", () => {
  writeNoteModal.classList.add("active");
});

function emptyModal() {
  noteTitle.value = "";
  notesBody.value = "";
  category.value = "";
}

cancel.addEventListener("click", () => {
  writeNoteModal.classList.remove("active");
});

modalform.addEventListener("click", (e) => {
  e.stopPropagation();
});

writeNoteModal.addEventListener("click", () => {
  writeNoteModal.classList.remove("active");
});

modalform.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editingNoteId) {
    const noteIndex = notesArray.findIndex((note) => note.id === editingNoteId);
    if (noteIndex !== -1) {
      notesArray[noteIndex].title = noteTitle.value;
      notesArray[noteIndex].note = notesBody.value;
      notesArray[noteIndex].category = category.value;
    }

    displayNotes(notesArray);

    editingNoteId = null;
    create.textContent = "Create";

    //emptying the modal
    emptyModal();

    writeNoteModal.classList.remove("active");
  } else {
    const noteTitleValue = noteTitle.value.trim();
    const notesBodyValue = notesBody.value.trim();
    const categoryValue = category.value.trim();

    notesTitleError.textContent = "";
    notesbodyError.textContent = "";
    categoryError.textContent = "";

    const erros = {};

    //form validation logic
    if (!noteTitleValue) erros.title = "Title cannot be empty!";
    if (!notesBodyValue) erros.notes = "Notes cannot be empty!";
    if (!categoryValue) erros.category = "Please select the category!";

    console.log(erros);

    if (Object.keys(erros).length > 0) {
      if (erros.title) notesTitleError.textContent = erros.title;
      if (erros.notes) notesbodyError.textContent = erros.notes;
      if (erros.category) categoryError.textContent = erros.category;

      return;
    }

    const idValue = generateID();

    createNote(idValue, noteTitleValue, notesBodyValue, categoryValue);

    // empthying the modal
    emptyModal();

    writeNoteModal.classList.remove("active");
  }
});

//form validation

function handleFormValidation(element, eventType, errorElement, errorTextName) {
  if (eventType === "input") {
    element.addEventListener(eventType, () => {
      errorElement.textContent = "";
    });
  } else {
    element.addEventListener(eventType, () => {
      if (element.value.trim() === "") {
        errorElement.textContent = `${errorTextName} cannot be empty!`;
      }
    });
  }
}

// Apply validation to noteTitle
handleFormValidation(noteTitle, "input", notesTitleError, "Title");
handleFormValidation(noteTitle, "blur", notesTitleError, "Title");

// Apply validation to notesBody
handleFormValidation(notesBody, "input", notesbodyError, "Notes");
handleFormValidation(notesBody, "blur", notesbodyError, "Notes");

//edit note and delete note
notesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-icon")) {
    const elementId = e.target.getAttribute("data-id");
    const curNote = notesArray.filter((note) => note.id === elementId);
    noteTitle.value = curNote[0].title;
    notesBody.value = curNote[0].note;
    category.value = curNote[0].category;

    editingNoteId = elementId;

    create.textContent = "Update";

    writeNoteModal.classList.add("active");
  }
});
