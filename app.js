// -------------------- global variables --------------------
// object with all methods performed on page
const funcPerform = {
    showForm: displayForm,
}
// drop down menu
const menuIcon = document.querySelector('.drop-menu i');
const menuItems = document.querySelector('.drop-menu .menu-items');
// main form 
const newBookButton = document.querySelector('.form-button');
const mainForm = document.querySelector('.form-container');

// -------------------- main program --------------------
// drop down menu main event
// menuIcon.addEventListener('click', ()=>performMenu('toggle'));

// a lot of crazy stuff will go here almost all program will go here
window.addEventListener('click', (e)=>{
    (e.target.dataset.toggle)? performMenu('toggle') : performMenu('remove');
    if (e.target.dataset.category) console.log(e.target);
    if (e.target.dataset.id) funcPerform[e.target.dataset.id](e.target);
})

// -------------------- helper functions --------------------
function performMenu(action) {
    menuIcon.classList[action]('active-menu-icon');
    menuItems.classList[action]('active-menu');
}

function showAll() {
    console.log('all books');
}

function displayForm() {
    console.log('yes man');
    newBookButton.classList.toggle('form-button-clicked');
    mainForm.classList.toggle('display-form');
}