// -------------------- global variables --------------------
// main object holds every data
class Book {
    constructor(title, author, number, img, category, id){
        this.title = title;
        this.author = author;
        this.number = number;
        this.img = img;
        this.category = category;
        this.id = id;
    }
}

// object with all methods performed on page
const buttonAction = {
    // drop down menu
    showForm: displayForm,
    // main form
    newCancel: hideForm,
    addBook: saveBook,
    showMore: displayBookForm,
    cancel: hideBookForm,
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
})

// -------------------- helper functions --------------------
// dealing with css class
function operateElement(ele, operation, style) {
    ele.classList[operation](style)
}

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

function saveBook() {
    console.log('book saved');
}

// book
function displayBookForm(btn) {
    btn.closest('.book').classList.add('edit-book');
}

function hideBookForm(btn) {
    btn.closest('.book').classList.remove('edit-book');
}