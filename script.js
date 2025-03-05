const triggerModalBtn = document.querySelector(".trigger-modal-btn");
const writeNoteModal = document.querySelector(".write-note-modal");
const cancel = document.querySelector(".cancel");
const create = document.querySelector(".create-note");
const modalContainer = document.querySelector(".modal-container");

triggerModalBtn.addEventListener("click", () => {
  writeNoteModal.classList.remove("none");
});

cancel.addEventListener("click", () => {
  writeNoteModal.classList.add("none");
});

create.addEventListener("click", () => {
  writeNoteModal.classList.add("none");
  //write the note creation logic below
});

modalContainer.addEventListener("click", (e) => {
  e.stopPropagation();
});

writeNoteModal.addEventListener("click", () => {
  writeNoteModal.classList.add("none");
});
