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
const detailsContainer = document.getElementById("note-details");

let notesArray = JSON.parse(getItemFromLocalStorage()) || [];
let editingNoteId = null;

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function displayNotes(notes) {
  if (notes.length === 0) {
    notesContainer.innerHTML = `<p class="no-notes">No notes to show</p>`;
  } else {
    const notesMarkup = notes
      .map((note) => {
        return `
    <div class="note" data-id="${
      note.id
    }" style="opacity: 0; transform: scale(0.9);" >
    <div class="buttons" >
    <button class="edit" >
    <img class="edit-icon" data-id="${note.id}" src="./assests/edit.png" >
    </button>
    <button class="delete">
    <img class="delete-icon" data-id="${note.id}" src="./assests/delete.png"
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

    document.querySelectorAll(".note").forEach((noteElement) => {
      noteElement.addEventListener("click", function () {
        const noteId = this.getAttribute("data-id");
        const selectedNote = notes.find((n) => n.id == noteId);
        showNoteDetails(selectedNote);
      });
    });

    setTimeout(() => {
      document.querySelectorAll(".note").forEach((note) => {
        note.style.opacity = "1";
        note.style.transform = "scale(1)";
        note.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      });
    }, 50);
  }
}

function createNote(id, title, note, category) {
  const newCategory = {
    id,
    title,
    note,
    category,
  };

  notesArray = [...notesArray, newCategory];
  console.log(notesArray);
  setItemToLocalStorage(notesArray);
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

function getItemFromLocalStorage() {
  return localStorage.getItem("Notes");
}

function setItemToLocalStorage(items) {
  return localStorage.setItem("Notes", JSON.stringify(items));
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
    setItemToLocalStorage(notesArray);

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
  } else if (e.target.classList.contains("delete-icon")) {
    const elementId = e.target.getAttribute("data-id");
    const noteElement = e.target.closest(".note");

    //applying transition
    noteElement.style.opacity = "0";
    noteElement.style.transform = "scale(0.9)";
    noteElement.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    setTimeout(() => {
      notesArray = notesArray.filter((note) => note.id !== elementId);
      setItemToLocalStorage(notesArray);
      displayNotes(notesArray);
    }, 300);
  }
});

function showNoteDetails(note) {
  detailsContainer.innerHTML = `
    <h2>${note.title}</h2>
    <p>${note.note}</p>
    <p><strong>Category:</strong> ${note.category}</p>
    <button id="close-details">Close</button>
  `;
  detailsContainer.style.display = "block";

  // Close button functionality
  document.querySelector("#close-details").addEventListener("click", () => {
    detailsContainer.style.display = "none";
  });
}

//load the page is mounted for the first time load the notes from local storage
document.addEventListener("DOMContentLoaded", () => {
  const items = JSON.parse(getItemFromLocalStorage());

  if (items) {
    displayNotes(items);
  }
});
