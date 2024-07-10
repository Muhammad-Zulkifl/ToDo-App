import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase  , ref , push , onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://todo-list-5055b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

let inputEL = document.getElementById("input-field")
let BTN = document.getElementById("add-button")
let UlEl = document.getElementById("shopping-list")

BTN.addEventListener("click" , function(){
    if(inputEL.value !== ""){
    let inputValue = inputEL.value
    push(shoppingListInDB , inputValue)
    clearInputEl()
    }
})

onValue(shoppingListInDB , function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val())
        clearShoppingListEl()
        for(let i = 0; i<itemsArray.length ; i++){
    
            let currentItem = itemsArray[i]
    
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
    
            appendItemToShoppingListEl(currentItem)
    
        }

    } else{
        UlEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl(){
    UlEl.innerHTML =""
}

function clearInputEl(){
    
    inputEL.value = ""
}
function appendItemToShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]
    let newEl = document.createElement("li")
    newEl.textContent = itemValue
    
    newEl.addEventListener("click" , function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItemInDB)
    })

    UlEl.append(newEl)
}
