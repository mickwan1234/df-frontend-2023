// Your JS code goes here
function openAddBookPopup() {
    let popup = document.getElementById("add-book-popup");
    popup.classList.add("open-popup");
}
function closeAddBookPopup() {
    let popup = document.getElementById("add-book-popup");
    popup.classList.remove("open-popup");
}

function initData() {
    let books = [
        {
            id: 1,
            name: "The Alchemist",
            author: "Paulo Coelho"
        },
        {
            id: 2,
            name: "The Monk Who Sold His Ferrari",
            author: "Robin Sharma"
        },
        {
            id: 3,
            name: "The Power of Your Subconscious Mind",
            author: "Joseph Murphy"
        }]
    localStorage.setItem('books', JSON.stringify(books));
}
function saveBook(id, name, author, topic) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const book = { id, name, author, topic };
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
}

// Function to render books from local storage to the table
function renderBooks(books) {

        const tableBody = document.querySelector('#book-table');

        tableBody.innerHTML = '<tr id="table-header">\n' +
            '      <th>Name</th>\n' +
            '      <th>Author</th>\n' +
            '      <th>Topic</th>\n' +
            '      <th>Action</th>\n' +
            '    </tr>';
    let modalSectionDiv = document.getElementById("modal-section");
    modalSectionDiv.innerHTML = '';
        books.forEach((book) => {
            let modalDiv = document.createElement('div');
            let modalDivId = "removeBookModal" + book.id;
            modalDiv.id = modalDivId;
            modalDiv.classList.add("delete-modal");
                modalDiv.innerHTML = `<span class="close" onclick="closeRemoveBookModal('${modalDivId}')">&times;</span> ` +
                '              <p><strong id="modalTitle">Delete Book</strong></p>\n' +
                `              <p>Do you want to delete <strong>${book.name}</strong> book?</p>\n` +
                `              <button onclick="removeBookById('${book.id}')"  class="delete-button">Delete</button>\n` +
                `              <button onclick="closeRemoveBookModal('${modalDivId}')"  class="delete-button">Cancel</button>\n`;
                    modalSectionDiv.appendChild(modalDiv);

            const row = tableBody.insertRow();
            row.insertCell(0).textContent = book.name;
            row.insertCell(1).textContent = book.author;
            row.insertCell(2).textContent = book.topic;
            row.insertCell(3).innerHTML = `<a id="delete-link" href="#" onclick="openRemoveBookModal('${modalDivId}')">Delete</a>`;
        });
}
 function openRemoveBookModal(divId) {
    let modal = document.getElementById(divId);
    modal.classList.add("open-delete-modal");
 }
function closeRemoveBookModal(divId) {
    let modal = document.getElementById(divId);
    modal.classList.remove("open-delete-modal");
}

// Event listener for the form's submit event
document.querySelector('#add-book-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const id = Date.now(); // Generate a unique ID
    const name = document.querySelector('#book-name').value;
    const author = document.querySelector('#author-name').value;
    const topic = document.querySelector('#topic').value;

    saveBook(id, name, author, topic);
    renderBooks(JSON.parse(localStorage.getItem('books')) || []); // Render the updated book list

    // Clear the form fields
    document.querySelector('#book-name').value = '';
    document.querySelector('#author-name').value = '';
    closeAddBookPopup()
});

function removeBookById(bookId) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    // Find the index of the book with the specified ID
    const indexToRemove = books.findIndex(book => book.id === parseInt(bookId));
    if (indexToRemove !== -1) {
        // Remove the book from the array
        books.splice(indexToRemove, 1);

        // Update the local storage with the updated book list
        localStorage.setItem('books', JSON.stringify(books));
    }
    document.getElementById("search-bar").value = '';
    let bookModal = document.getElementById("removeBookModal" + bookId)
    bookModal.remove();
    renderBooks(JSON.parse(localStorage.getItem('books')) || []) // Render the updated book list
}
document.querySelector('#search-bar').addEventListener('keyup', function (event) {
    const books = JSON.parse(localStorage.getItem('books')) || [];
    const searchTerm = event.target.value;
    const booksSearchList = []
    books.forEach((book) => {
        // Check if the book's name contains the search term (case-insensitive)
        const searchTermLowerCase = searchTerm.toLowerCase();
        const bookNameLowerCase = book.name.toLowerCase();

        if (
            bookNameLowerCase.includes(searchTermLowerCase)
        ) {
            booksSearchList.push(book)
        }
    });
    renderBooks(booksSearchList);
});
document.addEventListener('DOMContentLoaded', function () {
    if(localStorage.getItem('books') === null) {
        initData();
    }
    renderBooks(JSON.parse(localStorage.getItem('books')) || [])
});

