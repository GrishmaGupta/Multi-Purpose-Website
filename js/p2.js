const notesConatiner = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");

function updateStorage() {
    localStorage.setItem("notes", notesConatiner.innerHTML);
}

function showNotes() {
    notesConatiner.innerHTML = localStorage.getItem("notes") || "";
    bindNoteEvents();
}

function bindNoteEvents() {
    const notes = document.querySelectorAll(".input-box");

    notes.forEach(note => {
        note.addEventListener("keyup", updateStorage);

        const img = note.querySelector("img");
        if (img) {
            img.addEventListener("click", () => {
                note.remove();
                updateStorage();
            });
        }
    });
}

createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");
    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");
    img.src = "assets/p2/delete.png"; // ✅ use relative path
    inputBox.appendChild(img);
    notesConatiner.appendChild(inputBox);
    updateStorage();
    bindNoteEvents(); // ✅ bind events to the new note
});

document.addEventListener("keydown", event => {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});

// Initialize
showNotes();
