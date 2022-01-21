// Constants and variables

const promptButton = document.querySelector("#promptButton");
const addBookButton = document.querySelector("#addBookButton");

let library = [];

// Event listeners

promptButton.addEventListener("click", () => {

});

addBookButton.addEventListener("click", () => {
    addBookToLibrary()
});

// Functions

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = library.length + 1;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
    // clear input values
}

function removeFromLibrary() {

}

function displayLibrary() {
    for (let book of library) {
        // create book card
        for (let prop in book) {
            if (prop != index) {
                // add property to book card
            }
        }
    }
}
