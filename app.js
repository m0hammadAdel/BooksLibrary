// -------------------- global variables --------------------
// object with all methods performed on page
const funcPerform = {
    
}
// drop down menu variables
const menuIcon = document.querySelector('.drop-menu i');
const menuItems = document.querySelector('.drop-menu .menu-items');

// -------------------- main program --------------------
// drop down menu main event
menuIcon.addEventListener('click', ()=>performMenu('toggle'));

// a lot of crazy stuff will go here almost all program will go here
window.addEventListener('click', (e)=>{
    if (e.target.dataset.toggle) return;
    else if (menuIcon.classList.contains('active-menu-icon')) performMenu('remove');
    if (e.target.dataset.category) console.log(e.target);
})

// -------------------- helper functions --------------------
function performMenu(action) {
    menuIcon.classList[action]('active-menu-icon');
    menuItems.classList[action]('active-menu');
}

function showAll() {
    console.log('all books');
}
 