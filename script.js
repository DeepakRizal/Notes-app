const triggerModalBtn = document.querySelector(".trigger-modal-btn");
const writeNoteModal = document.querySelector(".write-note-modal");
const cancel = document.querySelector(".cancel");
const create = document.querySelector(".create-note");
const modalContainer = document.querySelector(".modal-form");
const noteTitle = document.querySelector("#title");
const notesBody = document.querySelector("#notes");

triggerModalBtn.addEventListener("click", () => {
  writeNoteModal.classList.add("active");
});

cancel.addEventListener("click", () => {
  writeNoteModal.classList.remove("active");
});

create.addEventListener("click", (e) => {
  e.preventDefault();
  writeNoteModal.classList.remove("active");
  //write the note creation logic below
});

modalContainer.addEventListener("click", (e) => {
  e.stopPropagation();
});

writeNoteModal.addEventListener("click", () => {
  writeNoteModal.classList.remove("active");
});
