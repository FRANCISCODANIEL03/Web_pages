const sidebar = document.getElementById('sidebar');
const btnClose = document.getElementById('btn-close');
const btnOpen = document.getElementById('btn-open');
const btnLigthMode = document.getElementById('ligth-mode');
const btnDarkmode = document.getElementById('dark-mode');
const elemSidebar = document.getElementById('sidebar');
const listSiderbar = document.getElementsByTagName('a');
const elemBody = document.getElementsByTagName('body')[0];
const timer = document.getElementById('time');

const sidebarOpen = ()=>{
    sidebar.style.display = 'block';
    btnClose.style.display = 'block';
    btnOpen.style.display = 'none';
}

const sidebarClose = ()=>{
    sidebar.style.display = 'none';
    btnClose.style.display = 'none';
    btnOpen.style.display = 'block';
}

const enableLigthMode = ()=>{
    elemBody.style.background = '#f5f5f5';
    elemSidebar.style.background = '#e1e9ee';
    btnLigthMode.style.color = '#0077b5';
    btnDarkmode.style.color = '#000';
    timer.style.color = '#000';

    for (let i = 0; i < listSiderbar.length; i++){
        listSiderbar[i].style.color = '#000';
    }
}

const enableDarkMode = ()=>{
    elemBody.style.background = '#e1e9ee';
    elemSidebar.style.background = '#283e4a';
    btnDarkmode.style.color = '#0077b5';
    btnLigthMode.style.color = '#fff';
    timer.style.color = '#fff';
    for (let i = 0; i < listSiderbar.length; i++){
        listSiderbar[i].style.color = '#fff';
    }
}

btnOpen.addEventListener('click', sidebarOpen);
btnClose.addEventListener('click', sidebarClose);
btnLigthMode.addEventListener('click', enableLigthMode);
btnDarkmode.addEventListener('click', enableDarkMode);