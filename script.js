// Constants and variables

const clearButton = document.querySelector("#clearButton");
const addBookButton = document.querySelector("#addBookButton");
const bookContainer = document.querySelector(".bookContainer");
const titleInput = document.getElementById("title");
const titleError = document.querySelector("#title + span.error");
const authorInput = document.getElementById("author");
const authorError = document.querySelector("#author + span.error");
const pagesInput = document.getElementById("pages");
const pagesError = document.querySelector("#pages + span.error");
const readInput = document.getElementById("read");

let library = [];

// Event listeners

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
        let newBook = new Book(
            titleInput.value, 
            authorInput.value, 
            pagesInput.value, 
            readInput.value
        );
        library.push(newBook);

        titleInput.value = "";
        titleError.style.visibility = "hidden";
        authorInput.value = "";
        authorError.style.visibility = "hidden";
        pagesInput.value = "";
        pagesError.style.visibility = "hidden";
        
        clearLibrary();
        displayLibrary();
    } else {
        if (!titleInput.validity.valid) {
            titleError.style.visibility = "visible";
        } else titleError.style.visibility = "hidden";
        
        if (!authorInput.validity.valid) {
            authorError.style.visibility = "visible";
        } else authorError.style.visibility = "hidden";

        if (!pagesInput.validity.valid) {
            pagesError.textContent = "";
            if (pagesInput.validity.badInput || pagesInput.validity.stepMismatch) {
                pagesError.textContent = "Please enter the number of pages in whole digits.";
            } else if (pagesInput.validity.rangeOverflow) {
                pagesError.textContent = "Bit long innit?";
            } else if (pagesInput.validity.rangeUnderflow) {
                pagesError.textContent = "That's barely an essay, certainly not a book";
            } else pagesError.textContent = "Please enter the number of pages.";
            pagesError.style.visibility = "visible";
        } else pagesError.style.visibility = "hidden";
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
    
    clearLibrary();
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
    clearLibrary();
    displayLibrary();
}

function displayLibrary() {
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

function clearLibrary() {
    while (bookContainer.childNodes.length > 2) {
        bookContainer.removeChild(bookContainer.lastChild);
    }
}

function clearAll() {
    clearLibrary()
    library = [];
}

// Add star slider for rating books you've read?