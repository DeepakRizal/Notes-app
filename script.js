const triggerModalBtn = document.querySelector(".trigger-modal-btn");
const writeNoteModal = document.querySelector(".write-note-modal");
const cancel = document.querySelector(".cancel");
const create = document.querySelector(".create-note");
const modalform = document.querySelector(".modal-form");
const noteTitle = document.querySelector("#title");
const notesBody = document.querySelector("#notes");
const notesTitleError = document.querySelector(".notes-title-error");
const notesbodyError = document.querySelector(".notes-body-error");

const note = {
  id: null,
  title: "",
  note: "",
};

const notes = [];

function generateID() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
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
  if (noteTitle.value.trim() === "" && notesBody.value.trim() === "") {
    notesTitleError.textContent = "title cannot be empty!";
    notesbodyError.textContent = "notes cannot be empty!";
    return;
  }

  if (noteTitle.value.trim() === "" && notesBody.value.trim() !== "") {
    notesTitleError.textContent = "title cannot be empty!";
    return;
  }
  if (noteTitle.value.trim() !== "" && notesBody.value.trim() === "") {
    notesbodyError.textContent = "notes cannot be empty!";
    return;
  }

  //   writeNoteModal.classList.remove("active");
});

//remove the error message when the user starts typing
noteTitle.addEventListener("input", () => {
  notesTitleError.textContent = "";
});

notesBody.addEventListener("input", () => {
  notesbodyError.textContent = "";
});
