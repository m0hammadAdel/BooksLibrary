// -------------------- global variables --------------------
// main object holds every data
class Book {
    constructor(title, author, number, img="undefined", category){
        this.title = title;
        this.author = author;
        this.number = number;
        this.img = img;
        this.category = category;
    };
    showBookInfo = ()=> {
        console.log(this.author, this.title, this.number, this.img, this. category);
    }
}

// object with all methods performed on page
const buttonAction = {
    // drop down menu
    showForm: displayForm,
    // main form
    newCancel: hideForm,
    addBook: saveBook,
    newClear: clearForm,
    // book
    showMore: displayBookForm,
    cancel: hideBookForm,
    save: editBook,
    delete: removeBook
}

// drop down menu
const menuIcon = document.querySelector('.drop-menu i');
const menuItems = document.querySelector('.drop-menu .menu-items');

// main form 
const newBookButton = document.querySelector('.form-button');
const mainForm = document.querySelector('.form-container');

// main categories
const mainSections = document.querySelectorAll('.category');

// -------------------- main program --------------------
// a lot of crazy stuff will go here almost all program will run here
window.addEventListener('click', (e)=>{
    // drop down menu
    (e.target.dataset.toggle)? performMenu('toggle') : performMenu('remove');
    // category filters
    if (e.target.dataset.category) {
        filterCategory(e.target.dataset.category);
        performMenu('add');
    }
    // all buttons in the page accordingly
    else if (e.target.dataset.id) {
        e.preventDefault();
        buttonAction[e.target.dataset.id](e.target);
    }
    // change a certain book category
    else if (e.target.dataset.book) {
        e.preventDefault();
        changeCategoryBook(e.target);
    }
})

// -------------------- helper functions --------------------
// drop down menu
function performMenu(action) {
    menuIcon.classList[action]('active-menu-icon');
    menuItems.classList[action]('active-menu');
}

// category filter
function filterCategory(category) {
    if (category === 'all') {
        // remove style from all sections
        mainSections.forEach(section=> section.classList.remove('category-hide'));
        // remove style from other links
        menuItems.querySelectorAll('li').forEach(item=> item.classList.remove('active-item'));
        // add active style to all button
        menuItems.querySelector('[data-category="all"]').classList.add('active-item');
    } 
    else {
        // adding active class to selected section
        mainSections.forEach(section=>{
            section.dataset.section !== category? section.classList.add('category-hide'):
            section.classList.remove('category-hide');
        });
        // adding active class to clicked list item
        menuItems.querySelectorAll('li').forEach(item=>{
            item.dataset.category !== category? item.classList.remove('active-item'):
            item.classList.add('active-item');
        });
    }
}

// main form
function displayForm() {
    newBookButton.classList.toggle('form-button-clicked');
    mainForm.classList.toggle('display-form');
}

function hideForm() {
    newBookButton.classList.remove('form-button-clicked');
    mainForm.classList.remove('display-form');
}

function clearForm() {
    mainForm.querySelector('#new-title').value = " ";
    mainForm.querySelector('#new-author').value = " ";
    mainForm.querySelector('#new-pages').value = null;
    mainForm.querySelector('#new-url').value = " ";
}

function saveBook() {
    let newCategory;
    mainForm.querySelectorAll('.radio-input').forEach(input=>{
        if(input.checked) newCategory = input.value;
    });

    const newBook = new Book(
        mainForm.querySelector('#new-title').value,
        mainForm.querySelector('#new-author').value,
        mainForm.querySelector('#new-pages').value,
        mainForm.querySelector('#new-url').value,
        newCategory
    );

    addBookToPage(newBook);
    clearForm();
    hideForm();
}

// book
function displayBookForm(btn) {
    btn.closest('.books-container').querySelectorAll('.book').forEach(book=> book.classList.remove('edit-book'));
    btn.closest('.book').classList.add('edit-book');
    const book = btn.closest('.book');
    const bookForm = book.querySelector('.book-form');
    bookForm.querySelector('.edit-title').value = book.querySelector('.title').textContent;
    bookForm.querySelector('.edit-author').value = book.querySelector('.author').textContent;
    bookForm.querySelector('.edit-pages').value = book.querySelector('.number').textContent;
    bookForm.querySelector('.edit-url').value = book.querySelector('img').src;
    const category = book.dataset.bookcat;
    bookForm.querySelectorAll('.category-btn').forEach(btn=>{
        btn.classList.remove('active-category-btn');
        if (btn.dataset.book === category) btn.classList.add('active-category-btn');
    })
}

function hideBookForm(btn) {
    btn.closest('.book').classList.remove('edit-book');
}

function changeCategoryBook(btn) {
    const container = btn.closest('.category-btns');
    container.querySelectorAll('.category-btn').forEach(catBtn=>{
        catBtn.classList.remove('active-category-btn');
    });
    btn.classList.add('active-category-btn');
}

function editBook(btn) {
    const bookForm = btn.closest('.book-form');
    const book = btn.closest('.book');
    const title = bookForm.querySelector('.edit-title').value;
    const author = bookForm.querySelector('.edit-author').value;
    const number = bookForm.querySelector('.edit-pages').value;
    const url = bookForm.querySelector('.edit-url').value;
    let newCategory;
    bookForm.querySelectorAll('.category-btn').forEach(btn=>{
        if (btn.classList.contains('active-category-btn')) newCategory = btn.dataset.book;
    });
    if (newCategory === book.dataset.bookcat) {
        book.querySelector('.title').textContent = title;
        book.querySelector('.author').textContent = author;
        book.querySelector('.number').textContent = number;
        book.querySelector('.front img').src = url;
        book.querySelector('.back img').src = url;
        hideBookForm(btn);
    }
    else {
        const newBook = new Book(title, author, number, url, newCategory);
        addBookToPage(newBook);
        book.remove();
    }
}

function removeBook(btn){
    const targetBook = btn.closest('.book');
    const currentSection = targetBook.closest('section');
    targetBook.remove();
    if (!currentSection.querySelector('.book')) currentSection.querySelector('.books-container').innerHTML = `<p>this shelf is empty</p>`;
}

function addBookToPage(book) {
    const newBook = document.createDocumentFragment();
    newBook.innerHTML = `
    <article class="book" data-bookcat="${book.category}">
        <div class="front">
            <img src="${book.img}" alt="">
            <div class="info">
                <h3 class="title">${book.title}</h3>
                <p class="author">${book.author}</p>
                <p class="number">${book.number}</p>
            </div>
            <div class="show-more">
                <button title="edit" data-id="showMore">
                    <i class="fa-solid fa-angles-right" data-id="showMore"></i>
                </button>
                <p>edit</p>
            </div>
        </div>
        <div class="back">
            <img src="${book.img}" alt="">
            <form class="book-form">
                <div class="field">
                    <label>title</label>
                    <input type="text" class="edit-title">
                </div>
                <div class="field">
                    <label>author</label>
                    <input type="text" class="edit-author">
                </div>
                <div class="field">
                    <label>pages</label>
                    <input type="number" class="edit-pages">
                </div>
                <div class="field">
                    <label>cover url</label>
                    <input type="text" class="edit-url">
                </div>
                <div class="category-btns">
                    <button class="category-btn" data-book="reading">reading</button>
                    <button class="category-btn" data-book="wishList">wish list</button>
                    <button class="category-btn" data-book="done">done</button>
                </div>
                <div class="new-buttons">
                    <button class="new-btn cancel" data-id="cancel">cancel</button>
                    <button class="new-btn delete" data-id="delete">delete</button>
                    <button class="new-btn" data-id="save">save</button>
                </div>
            </form>
        </div>
    </article>`;

    mainSections.forEach(section=>{
        if (section.dataset.section === book.category) {
            if(!section.querySelector('.book')) section.querySelector('.books-container').innerHTML = '';
            section.querySelector('.books-container').innerHTML += newBook.innerHTML;
        }
    })
}