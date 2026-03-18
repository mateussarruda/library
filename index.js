const addBookBtn = document.querySelector('#addBookBtn');
const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read ? 'already read' : 'not read yet'}`;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


function showBooks() {
    for(let book of myLibrary) {
        console.log(book.info());
    }
}

let book1 = new Book('Código Limpo', 'Robert C. Martin', 423, true);
let book2 = new Book('Sobre a brevidade da vida', 'Sêneca', 95, false);
addBookToLibrary(book1);
addBookToLibrary(book2);
showBooks();

let table = document.createElement('table');
let thead = document.createElement('thead');
let tbody = document.createElement('tbody');

table.appendChild(thead);
table.appendChild(tbody);


function deleteBtn() {
    const button = document.createElement('button');
    const image = document.createElement('img');
    image.src = './img/delete.svg'
    image.alt = 'Delete button';
    button.setAttribute('id', 'deleteBtn');
    button.appendChild(image);
    button.onclick = deleteClick;
    return button;
}
function deleteClick(e) {
    const row = e.target.parentNode.parentNode;
    const id = row.getAttribute('data-id');
    for (let index = 0; index < myLibrary.length; index++) {
        if (myLibrary[index].id === id) {
            myLibrary.splice(index, 1);
        }
    }
    row.remove();
}
function showTable(tbody) {
    while (tbody.firstChild) {
        tbody.removeChild(tbody.firstChild);
    }
    for (let book of myLibrary) {
        let row = document.createElement('tr');
        for (let item of Object.keys(book)) {
            let td = document.createElement('td');
            if (typeof book[item] !== 'function' && item !== 'id') {
                td.textContent = book[item];
                row.setAttribute('data-id', book.id);
                row.appendChild(td);
            }
            tbody.appendChild(row);
        }
        row.appendChild(deleteBtn());
    }
}
function getBookInput() {
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const pages = document.querySelector('#pages');
    const read = document.querySelector('#read');
    let book = new Book(title.value, author.value, pages.value, read.checked);
    return book;
}

let = columns = ['title', 'author', 'pages', 'read'];
let row = document.createElement('tr')
for (let item of columns) {
    let th = document.createElement('th');
    th.textContent = item;
    row.appendChild(th);
}
const output = document.querySelector('.output');
thead.appendChild(row);
output.appendChild(table);

document.querySelector('.form-book').addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    addBookToLibrary(getBookInput());
    showTable(tbody);
    document.querySelector('.form-book').reset();
});
