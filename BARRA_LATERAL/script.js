const sidebar = document.querySelector('.sidebar');
const sidebarToggler = document.querySelector('.sidebar-toggler');
const menuToggler = document.querySelector('.menu-toggler');

let collapsedSidebarHeigth = '56px';
let fullSidebarHeigth = 'calc(100vh - 32px)';

sidebarToggler.addEventListener('click', ()=>{
    sidebar.classList.toggle('collapsed');
})
