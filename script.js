// Constants and variables

const promptButton = document.querySelector("#promptButton");
const addBookButton = document.querySelector("#addBookButton");
const deleteButton = document.querySelectorAll(".deleteButton");
const bookContainer = document.querySelector(".bookContainer");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

const book = {
    title: "test",
    author: "ben",
    pages: "350",
    read: "read",
    index: 1,
};

let library = [book];

let bookCard;
let cardTitle;

// Event listeners

promptButton.addEventListener("click", () => displayPrompt());

addBookButton.addEventListener("click", () => addBookToLibrary());

// Functions

displayLibrary();

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = library.length;
}

function addBookToLibrary() {
    let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
    library.push(newBook);
    hidePrompt();
    displayLibrary();
}

function removeFromLibrary(i) {
    for (let book of library) {
        if (book.index == i) {
            library.splice(book, 1);
        } else if (book.index > i) {
            book.index -= 1;
        }
    }
    displayLibrary();
}

function displayLibrary() {
    clearLibrary();
    for (let book of library) {
        bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookContainer.appendChild(bookCard);
        // create delete button with class .deleteButton and id #${book.index} => set listener above to run removeFromLibrary while passing the id number
        for (let prop in book) {
            cardTitle = document.createElement("div");
            cardTitle.classList.add("cardTitle");
            cardTitle.innerHTML = `${book[prop]}`;
            bookCard.appendChild(cardTitle);
            //if (prop != "index") {
                
                // add property to book card
            //}
        }
    }
}

function displayPrompt() {
    // display prompt as pop up or drop down menu
}

function hidePrompt() {
    // clear input values
    // hide prompt. 
    // maybe merge with displayPrompt and set to toggle?
}

function clearLibrary() {
    let children = bookContainer.firstElementChild;
    while (children) {
        children.remove();
        children = bookContainer.firstElementChild;
    }
}