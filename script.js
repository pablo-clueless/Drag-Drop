const draggable_list = document.getElementById('draggable-list')
const check = document.getElementById('check')

const topTenMusic = [
    // { title: "Dior", artiste: "Ruger" },
    // { title: "Holy Father", artiste: "Victony x Mayorkun" },
    // { title: "Don't Call Me (ft. Zinoleesky)", artiste: "Lil Kesh" },
    // { title: "Ballon D'Or (ft. Wizkid)", artiste: "Burna Boy" },
    // { title: "Pour Me Water", artiste: "Kizz Daniel" },
    // { title: "Champion Sound", artiste: "Davido x Focalistic" },
    // { title: "Emiliana", artiste: "CKay" },
    // { title: "Ozumba Mbadiwe", artiste: "Reekado Bankz" },
    // { title: "Peru", artiste: "Fireboy DML x Ed Sheeran" },
    // { title: "Cold Outside (ft. Buju)", artiste: "Timaya" }
    "Dior",
    "Holy Father",
    "Don't Call Me",
    "Ballon D'Or",
    "Pour Me Water",
    "Champion Sound",
    "Emiliana",
    "Ozumba Mbadiwe",
    "Peru",
    "Cold Outside"
]

// store list items
const listItems = []

let dragStartIndex

createList()

// insert list items into DOM
function createList() {
    [...topTenMusic]
    .map(item => ({ value: item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(item => item.value)
    .forEach((song, index) => {
        const listItem = document.createElement('li')

        listItem.setAttribute('data-index', index)

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
            <div class="item">
                <p>${song}</p>
                
            </div>
            <i class="fas fa-grip-lines"></i>
        </div>
        `

        listItems.push(listItem)

        draggable_list.appendChild(listItem)
    })

    addEventListeners()
}

// event listeners functions
function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function dragEnter() {
    this.classList.add('over')
}

function dragLeave() {
    this.classList.remove('over')
}

function dragOver(e) {
    e.preventDefault()
}

function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index')
    swapItems(dragStartIndex, dragEndIndex)

    this.classList.remove('over')
}


// swap function
function swapItems (fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable')
    const itemTwo = listItems[toIndex].querySelector('.draggable')

    listItems[fromIndex].appendChild(itemTwo)
    listItems[toIndex].appendChild(itemOne)
}

// function to check order of list item
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const item = listItem.querySelector('.draggable').innerText.trim()

        if(item !== topTenMusic[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.remove('wrong')
            listItem.classList.add('right')
        }
    })
}

// add event listeners
function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.draggable-list li')

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart)
    })
    
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver)
        item.addEventListener('drop', dragDrop)
        item.addEventListener('dragenter', dragEnter)
        item.addEventListener('dragleave', dragLeave)
    })
}

check.addEventListener('click', checkOrder)