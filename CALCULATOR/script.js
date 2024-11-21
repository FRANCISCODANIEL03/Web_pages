window.onload=()=>{
    const themeToggle = document.getElementById('theme-toggle')
    const body = document.body
    const expressionDisplay = document.getElementById('expression')
    const resultDisplay = document.getElementById('result')
    const buttons = document.querySelectorAll('.buttons button')
    let expression = ""
    let result = ""
    let lastInput = ""

    themeToggle.addEventListener('change', ()=>{
        body.classList.toggle('dark')
        const themeText = document.querySelector('.theme-text')
        themeText.textContent = themeToggle.checked ? "Switch to Ligth" : "Switch to Dark"
    })

}