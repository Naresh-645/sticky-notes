const newNoteButton = document.getElementById("new-note-button");
const editNotePage = document.getElementById("add-note");
const mainBlock = document.querySelector("main");
const changesNotePage = document.getElementById("note-changes");
var currentlyEditingNote = null;
var backgroundClass = '';

// Creating a new note...

newNoteButton.addEventListener("click", ()=> {
    editNotePage.style.display = "block";
    backgroundClass = 'yellow'

    // Animation effect for the new note block...
        setTimeout(() => {
            editNotePage.classList.add("show");
        }, 10); 

    editNotePage.querySelector("input[name='title']").value = ''
    editNotePage.querySelector("textarea[name='content']").value = ''
    editNotePage.style.background = "linear-gradient(135deg, #FFEB3B, #FDD835)"
    editNotePage.querySelectorAll("input[type='radio']").forEach(radio => {
        radio.checked = false
    })

    // Changing new note block BG Dynamically and updating the background class...

    editNotePage.querySelector("input[type='radio'][value='yellow']").addEventListener("change", (event)=> {
        if (event.target.checked) {
            editNotePage.style.background = "linear-gradient(135deg, #FFEB3B, #FDD835)"
            backgroundClass = 'yellow'
        }
    })
    editNotePage.querySelector("input[type='radio'][value='pink']").addEventListener("change", (event)=> {
        if (event.target.checked) {
            editNotePage.style.background = "linear-gradient(135deg, #E1BEE7, #CE93D8)"
            backgroundClass = 'pink'
        }
    })
    editNotePage.querySelector("input[type='radio'][value='green']").addEventListener("change", (event)=> {
        if (event.target.checked) {
            editNotePage.style.background = "linear-gradient(135deg, #A5D6A7, #81C784)"
            backgroundClass = 'green'
        }
    })
    editNotePage.querySelector("input[type='radio'][value='orange']").addEventListener("change", (event)=> {
        if (event.target.checked) {
            editNotePage.style.background = "linear-gradient(135deg, #FFA726, #FB8C00)"
            backgroundClass = 'orange'
        }
    })
})

// Adding a new note...

document.getElementById("add-note-button").addEventListener("click", () => {
    
    let title = editNotePage.querySelector("input[name='title']").value
    let content = editNotePage.querySelector("textarea[name='content']").value

    let newNoteHTML = `
                <div class="note-container ${backgroundClass}">
                    <div class="note-title">
                        <h3>${title}</h3>
                    </div>
                    <div class="note-content">
                        <p>${content}</p>
                    </div>
                    <div class="note-footer">
                        <input type="color" class="colorInput" style="display: none;">
                        <button class="delete">Delete</button>
                    </div>
                </div>
                        `
    mainBlock.insertAdjacentHTML("beforeend", newNoteHTML);

    const newNote = mainBlock.lastElementChild;

    // Animation effect for the added note...
        setTimeout(() => {
            newNote.classList.add("show");
        }, 10);

    // Closing animation effect for the add note block...
        editNotePage.classList.remove("show");
        setTimeout(() => {
            editNotePage.style.display = "none";
        }, 500); 
    
    editNote(); // Calling the edit note Function...
})

// cancelling a new note...

document.getElementById("cancel").addEventListener("click", () => {

    // Closing animation effect for the add note block...
        editNotePage.classList.remove("show");
        setTimeout(() => {
            editNotePage.style.display = "none"; 
        }, 500); 
    
    editNote(); // Calling the edit note Function...
})

// Editing a saved note...

function editNote() {
    mainBlock.querySelectorAll(".note-container").forEach(note => {
        let backgroundClass = ''

        // Deleting a saved Note...

        note.querySelector(".delete").addEventListener("click", ()=> {

            const warningPage = document.querySelector('.delete-note-warning')
            warningPage.style.display = "block"

            document.getElementById("not-delete").addEventListener("click", ()=> {
                warningPage.style.display = "none"
            })

            document.getElementById("confirm-delete").addEventListener("click", ()=> {
                note.classList.add("deleting");

                // Deleting animation...
                    setTimeout(() => {
                        note.remove();
                    }, 300);
                    warningPage.style.display = "none"
            })
        })

        // Displaying Edit block...

        note.querySelector(".note-content").addEventListener("click", ()=> {

            changesNotePage.style.background = window.getComputedStyle(note).background;

            changesNotePage.querySelectorAll("input[type='radio']").forEach(radio => {
                radio.checked = false
            })

            note.classList.forEach(colorClass => {
                if (colorClass == 'yellow' || colorClass == 'pink' || colorClass == 'green' || colorClass == 'orange') {
                    backgroundClass = colorClass;
                }
            })

            currentlyEditingNote = note;
            let title = note.querySelector("h3").textContent;
            let content = note.querySelector("p").textContent;
    
            changesNotePage.querySelector("input[name='title']").value = title
            changesNotePage.querySelector("textarea[name='content']").value = content
            changesNotePage.style.display = "block";

            // Animation effect for the edit block...
                setTimeout(() => {
                    changesNotePage.classList.add("show");
                }, 10); 

            // Changing edit block BG Dynamically and updating the background class...

            changesNotePage.querySelector("input[type='radio'][value='yellow']").addEventListener("change", (event)=> {
                if (event.target.checked) {
                    changesNotePage.style.background = "linear-gradient(135deg, #FFEB3B, #FDD835)"
                    backgroundClass = 'yellow'
                }
            })           
            changesNotePage.querySelector("input[type='radio'][value='pink']").addEventListener("change", (event)=> {
                if (event.target.checked) {
                    changesNotePage.style.background = "linear-gradient(135deg, #E1BEE7, #CE93D8)"
                    backgroundClass = 'pink'
                }
            })           
            changesNotePage.querySelector("input[type='radio'][value='green']").addEventListener("change", (event)=> {
                if (event.target.checked) {
                    changesNotePage.style.background = "linear-gradient(135deg, #A5D6A7, #81C784)"
                    backgroundClass = 'green'
                }
            })           
            changesNotePage.querySelector("input[type='radio'][value='orange']").addEventListener("change", (event)=> {
                if (event.target.checked) {
                    changesNotePage.style.background = "linear-gradient(135deg, #FFA726, #FB8C00)"
                    backgroundClass = 'orange'
                }
            })
        })

        // Saving the Edited Note..

        document.getElementById("save").addEventListener("click", () => {
            if (currentlyEditingNote == note) {
                let title = changesNotePage.querySelector("input[name='title']").value
                let content = changesNotePage.querySelector("textarea[name='content']").value
                let classList = note.classList

                classList.forEach(colorClass => {
                    if (colorClass == 'yellow' || colorClass == 'pink' || colorClass == 'green' || colorClass == 'orange') {
                        note.classList.remove(colorClass)
                    }
                })
                note.classList.add(backgroundClass)
            
                let changedNoteHTML = `
                                <div class="note-title">
                                    <h3>${title}</h3>
                                </div>
                                <div class="note-content">
                                    <p>${content}</p>
                                </div>
                                <div class="note-footer">
                                    <input type="color" class="colorInput" style="display: none;">
                                    <button class="delete">Delete</button>
                                </div>
                                    `
                note.innerHTML = changedNoteHTML
                note.classList.add("show");

                // Closing animation for the edit note block...
                    changesNotePage.classList.remove("show");
                    setTimeout(() => {
                        changesNotePage.style.display = "none";
                    }, 500); 

                currentlyEditingNote = null;
                backgroundClass = ''
                
                editNote() // Calling the edit fuction...
            }  
        })
        
        // Closing Edit block without saving the changes...
        
        document.getElementById("close").addEventListener("click", () => {

            // Closing animation for the edit note block...
                changesNotePage.classList.remove("show");
                setTimeout(() => {
                    changesNotePage.style.display = "none";
                }, 500); 
        })
    })
}
