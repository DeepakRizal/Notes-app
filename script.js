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

let notesArray = [];

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function createNote(id, title, note, category) {
  const newCategory = {
    id,
    title,
    note,
    category,
  };

  notesArray = [...notesArray, newCategory];
}

triggerModalBtn.addEventListener("click", () => {
  writeNoteModal.classList.add("active");
});

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

  //form validation logic
  if (
    noteTitle.value.trim() === "" &&
    notesBody.value.trim() === "" &&
    category.value.trim() === ""
  ) {
    notesTitleError.textContent = "Title cannot be empty!";
    notesbodyError.textContent = "Notes cannot be empty!";
    categoryError.textContent = "Please select the category";
    return;
  }

  if (
    noteTitle.value.trim() === "" &&
    notesBody.value.trim() !== "" &&
    category.value.trim() !== ""
  ) {
    notesTitleError.textContent = "Title cannot be empty!";
    return;
  }
  if (
    noteTitle.value.trim() !== "" &&
    notesBody.value.trim() === "" &&
    category.value.trim() !== ""
  ) {
    notesbodyError.textContent = "Notes cannot be empty!";
    return;
  }
  if (
    category.value.trim() === "" &&
    notesBody.value.trim() !== "" &&
    noteTitle.value.trim() !== ""
  ) {
    categoryError.textContent = "Category cannot be empty!";
  }

  if (
    noteTitle.value.trim() !== "" &&
    notesBody.value.trim() === "" &&
    category.value.trim() === ""
  ) {
    notesbodyError.textContent = "Notes cannot be empty!";
    categoryError.textContent = "Category cannot be empty!";
    return;
  }
  if (
    noteTitle.value.trim() === "" &&
    notesBody.value.trim() !== "" &&
    category.value.trim() === ""
  ) {
    categoryError.textContent = "Category cannot be empty!";
    notesTitleError.textContent = "Title cannot be empty!";

    return;
  }
  if (
    category.value.trim() !== "" &&
    notesBody.value.trim() === "" &&
    noteTitle.value.trim() === ""
  ) {
    notesTitleError.textContent = "Title cannot be empty!";
    notesbodyError.textContent = "Notes cannot be empty!";
  }

  //   writeNoteModal.classList.remove("active");
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
