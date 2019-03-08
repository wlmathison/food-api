// Create a DOM element in your index.html with a class of foodList.
// Create a function which returns a string template. The template is the HTML representation for a food item.
// Create a function that inserts an HTML representation of a food into the DOM

const container = document.querySelector("article")
container.className = "foodList"
const foodFactory = (foods) => {
    return `<h2>${foods.name}</h2><p>${foods.ethnicity}</p><p>${foods.category}</p>`
}

const addFoodToDom = (foods) => {
    const foodListSection = document.createElement("section")
    foodListSection.innerHTML = ""
    foodListSection.innerHTML += foods
    container.appendChild(foodListSection)  
}

fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods)
        parsedFoods.forEach(foods => {
            const foodAsHTML = foodFactory(foods)
            addFoodToDom(foodAsHTML)
        })
    })