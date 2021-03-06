let myLibrary = []
let newBookToggle = false
const library = document.getElementById("library")
const bookProperties = ["title", "author", "pages", "read"]

let favoriteBook = new Book("Hiero's Journey",
                            "Sterling E. Lanier",
                            200,
                            true)
let otherBook = new Book("The Martian Chronicles",
                          "Ray Bradbury",
                          300,
                          true)
let nextBook = new Book("Infinite Jest",
                        "David Foster Wallace",
                        500,
                        false)
myLibrary.push(favoriteBook, otherBook, nextBook)

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read ? "read" : "nope"
}

function newBookButton() {
  if (newBookToggle == true) {
    let emptyDiv = document.createElement("div")
    emptyDiv.id = "book-form"
    document.getElementById("book-form").replaceWith(emptyDiv)
  } else {
    renderForm()
  }
  newBookToggle = !newBookToggle
}

// It would probably be better to use template strings,
// But this is good practice with DOM manipulation.
function renderForm() {
  let formTag = document.createElement("form")

  for (let i = 0; i < bookProperties.length; i++) {
    let input = document.createElement("input")
    input.name = bookProperties[i]
    input.placeholder = bookProperties[i]

    if (bookProperties[i] == "read") {
      input.type = "checkbox"
      let checkBoxLabel = document.createElement("label")
      checkBoxLabel.setAttribute("class", "label-inline")
      checkBoxLabel.setAttribute("for", "checkbox")
      checkBoxLabel.innerHTML = "read"
      formTag.append(input)      
      formTag.append(checkBoxLabel)
      formTag.append(document.createElement("br"))
    } else {
      input.type = "text"
      formTag.append(input)
    }
  }    

  let submitButton = document.createElement("button")
  submitButton.type = "button"
  submitButton.innerHTML = "Add to library"
  submitButton.addEventListener("click", addToLibrary)
  formTag.append(submitButton)
  document.getElementById("book-form").append(formTag)
}

function addToLibrary() {
  let newBook = new Book(
    document.forms[0].title.value,
    document.forms[0].author.value,
    document.forms[0].pages.value,    
    document.forms[0].read.value == "on" ? "read" : "nope")
  myLibrary.push(newBook)
  newBookButton()
  render()
}

function removeFromLibrary(index) {
  myLibrary.splice(index, 1)
  render()
}

function toggleRead(index) {
  myLibrary[index].read = (myLibrary[index].read == "read" ? "nope" : "read")
  render()
}

function render() {
  library.innerHTML = ""
    for (let [index, book] of myLibrary.entries()) {
    let entry = document.createElement("tr")
    
    // Can't use for loop on book because it's unordered
    for (let i = 0; i < bookProperties.length; i++) {
      let tableData = document.createElement("td")
      if (bookProperties[i] == "read") {
        // Anonymous function necessary to prevent calling right now        
        tableData.innerHTML = `<a href='#'>${book[bookProperties[i]]}</a>`
        tableData.addEventListener("click", function() { toggleRead(index) })
      } else {
        tableData.innerHTML = book[bookProperties[i]]
      }
      entry.append(tableData)
    }

    let removeButton = document.createElement("a")
    removeButton.href = "#"    
    removeButton.innerHTML = "×"
    removeButton.addEventListener("click", function() { removeFromLibrary(index) })

    let removeCell = document.createElement("td")
    removeCell.append(removeButton)
    entry.append(removeCell)
    library.append(entry)
  }
}

render()
document.getElementById("add-book").addEventListener("click", newBookButton)
