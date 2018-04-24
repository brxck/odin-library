let myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    infoString = title + " by " + author + ", " + pages
    infoString += (this.read ? "read" : "not read yet")
    return infoString
  }
}

function addBookToLibrary() {

}

function render()