let title = document.getElementById('title')
let total = document.getElementById('total')
let count = document.getElementById('count')
let category = document.getElementById('category')
let button = document.getElementById('submit')

let price = document.getElementById('price')
let taxes = document.getElementById('taxes')
let ads = document.getElementById('ads')
let discount = document.getElementById('discount')

let mode = 'Create'
let globalI

function calculateTotal(){
    if(price.value != '' || taxes.value != '' || ads.value != '' || discount.value != ''){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value
        total.innerHTML = result
        total.style.background = '#040'
    } else{
        total.innerHTML = 0
        total.style.background = '#a00d02'
    }
}

let data
if(localStorage.crud != null){
    data = JSON.parse(localStorage.crud)
} else{
    data = []
}

button.addEventListener('click', () =>{
    let obeject = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase()
    }
