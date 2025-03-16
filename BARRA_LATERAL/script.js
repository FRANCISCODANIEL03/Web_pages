const sidebar = document.querySelector('.sidebar');
const sidebarToggler = document.querySelector('.sidebar-toggler');
const menuToggler = document.querySelector('.menu-toggler');

let collapsedSidebarHeigth = '56px';
let fullSidebarHeigth = 'calc(100vh - 32px)';

sidebarToggler.addEventListener('click', ()=>{
    sidebar.classList.toggle('collapsed');
})

const toggleMenu = (isMenuActive) =>{
    sidebar.computedStyleMap.heigth = isMenuActive ? `${sidebar.scrollHeight}PX` : collapsedSidebarHeigth;
    menuToggler.querySelector('span').innerHTML = isMenuActive ? 'close' : 'menu';
}

menuToggler.addEventListener('click', ()=>{
    toggleMenu(sidebar.classList.toggle('menu-active'));
})

window.addEventListener('resize', ()=>{
    if (window.innerHTML >= 1024){
        sidebar.computedStyleMap.heigth = fullSidebarHeigth;
    } else {
        sidebar.classList.remove('collapsed');
        sidebar.style.heigth = 'auto';
        toggleMenu(sidebar.classList.contains('menu-active'))
    }
});

