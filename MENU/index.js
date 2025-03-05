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

setInterval(()=>{
    const time =  new Date;
    let seconds = time.getSeconds();
    let minutes = time.getMinutes();
    let hours = time.getHours();
    let day = time.getDay();

    switch(day){
        case 0: day = 'Sun'; break;
        case 1: day = 'Mon'; break;
        case 2: day = 'Tue'; break;
        case 3: day = 'Wed'; break;
        case 4: day = 'Thu'; break;
        case 5: day = 'Fri'; break;
        case 6: day = 'Sat'; break;
    }

    if(seconds == 0 || seconds < 10) seconds = `0${seconds}`;
    if(minutes == 0 || minutes < 10) minutes = `0${minutes}`;

    const timer = document.getElementById('time');
    timer.innerHTML = `${day}, ${hours}:${minutes}:${seconds}`;
    list = document.getElementsByTagName('li');

    for(let i = 0; i < list.length; i++){
        list[i].className = '';
    }
    list[value].className = 'active';
})
