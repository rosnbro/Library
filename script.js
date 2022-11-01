// Constants and variables

const promptContainer = document.querySelector(".addBookPrompt")
const promptButton = document.querySelector("#promptButton");
const clearButton = document.querySelector("#clearButton");
const addBookButton = document.querySelector("#addBookButton");
const deleteButton = document.querySelectorAll(".deleteButton");
const bookContainer = document.querySelector(".bookContainer");
const titleInput = document.getElementById("title");
const authorInput = document.getElementById("author");
const pagesInput = document.getElementById("pages");
const readInput = document.getElementById("read");

let library = [];

// Event listeners

promptButton.addEventListener("click", () => displayPrompt());
clearButton.addEventListener("click", () => clearAll());
addBookButton.addEventListener("click", () => addBookToLibrary());

// Default Books

let test1 = {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    pages: 1214,
    read: "read",
    index: 0,
}
let test2 = {
    title: "The Fire Next Time",
    author: "James Baldwin",
    pages: 167,
    read: "read",
    index: 1,
}
let test3 = {
    title: "Dune",
    author: "Frank Herbert",
    pages: 604,
    read: "unread",
    index: 2,
}
library.push(test1);
library.push(test2);
library.push(test3);
displayLibrary();

// Book constructor

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.index = library.length;
    }
}

// Functions

function addBookToLibrary() {
    if (titleInput.validity.valid && authorInput.validity.valid && pagesInput.validity.valid) {
        let newBook = new Book(titleInput.value, authorInput.value, pagesInput.value, readInput.value);
        library.push(newBook);
        displayPrompt();
        displayLibrary();
    } else {
        alert('uh oh');
    }
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

function toggleRead(i) {
    for (let book of library) {
        if (book.index === i) {
            if (book.read == "read") {
                book.read = "unread";
            } else {
                book.read = "read"
            }
        }
    }
    displayLibrary();
}

function displayLibrary() {
    clearLibrary();
    for (let book of library) {
        let bookCard = document.createElement("div");
        let cardText = document.createElement("div");
        let buttonContainer = document.createElement("div");
        let readButton = document.createElement("button");
        let deleteButton = document.createElement("button");

        bookCard.classList.add("bookCard");
        buttonContainer.classList.add("buttonContainer");
        readButton.classList.add("readButton");
        deleteButton.classList.add("deleteButton");

        readButton.innerHTML = `&#128065`;
        deleteButton.innerHTML = `&#128683`; //`&#x2715`;

        readButton.addEventListener("click", () => toggleRead(book.index));
        deleteButton.addEventListener("click", () => removeFromLibrary(book.index));

        bookContainer.appendChild(bookCard);

        cardText.classList.add("cardText");
        for (let prop in book) {
            let cardProp = document.createElement("div");
            cardProp.classList.add("cardProp");

            switch (prop) {
                case "title":
                    cardProp.classList.add("cardTitle");
                    cardProp.innerHTML = `${book[prop]}`;
                    break;
                case "author":
                    cardProp.classList.add("cardAuthor");
                    cardProp.innerHTML = `by ${book[prop]}`;
                    break;
                case "pages":
                    cardProp.classList.add("cardPages");
                    cardProp.innerHTML = `${book[prop]} pages`;
                    break;
                case "read":
                    switch (book.read) {
                        case "read":
                            bookCard.classList.add("read");
                            break;
                        case "unread":
                            bookCard.classList.add("unread");
                            break;
                    }
                    break;
            }
            cardText.appendChild(cardProp);
        }

        bookCard.appendChild(cardText);
        bookCard.appendChild(buttonContainer);
        buttonContainer.appendChild(readButton);
        buttonContainer.appendChild(deleteButton);
    }
}

function displayPrompt() {
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    promptContainer.classList.toggle("hidden");
    promptContainer.classList.toggle("visible");
}

function clearLibrary() {
    let children = bookContainer.firstElementChild;
    while (children) {
        children.remove();
        children = bookContainer.firstElementChild;
    }
}

function clearAll() {
    clearLibrary()
    library = [];
}

// Add star slider for rating books you've read?