// Constants and variables

const promptButton = document.querySelector("#promptButton");
const addBookButton = document.querySelector("#addBookButton");
const deleteButton = document.querySelectorAll(".deleteButton");
const bookContainer = document.querySelector(".bookContainer");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readInput = document.querySelector("#read");

let library = [];

// Event listeners

promptButton.addEventListener("click", () => displayPrompt());

addBookButton.addEventListener("click", () => addBookToLibrary());

// Functions

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
    let newLibrary = [];
    for (let book of library) {
        if (book.index != i) {
            if (book.index > i) book.index = book.index - 1;
            newLibrary.push(book);
        }
    }
    library = newLibrary;
    displayLibrary();
}

function displayLibrary() {
    clearLibrary();
    for (let book of library) {
        // Creates book card
        let bookCard = document.createElement("div");
        bookCard.classList.add("bookCard");
        bookContainer.appendChild(bookCard);

        // Creates delete button
        let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.addEventListener("click", () => removeFromLibrary(book.index));
        bookCard.appendChild(deleteButton);

        // Adds content to card
        for (let prop in book) {
            let cardProp = document.createElement("div");
            switch (prop) {
                case "title":
                    cardProp.classList.add("cardTitle");
                    break;
                case "author":
                    cardProp.classList.add("cardAuthor");
                    break;
                case "pages":
                    cardProp.classList.add("cardPages");
                    break;
                case "read":
                    cardProp.classList.add("cardRead");
                    break;
            }
            cardProp.innerHTML = `${book[prop]}`;
            bookCard.appendChild(cardProp);
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