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
