// Create a DOM element in your index.html with a class of foodList.
// Create a function which returns a string template. The template is the HTML representation for a food item.
// Create a function that inserts an HTML representation of a food into the DOM

const container = document.querySelector("article")
container.className = "foodList"
const foodFactory = (foods) => {
    return `<h2>${foods.name}</h2><p>Ethnicity: ${foods.ethnicity}</p><p>Category: ${foods.category}</p><p>Ingredients: ${foods.ingredients}</p><p>Country of Origin: ${foods.countryOrigin}</p><p>Calories: ${foods.caloriesPerServing}</p><p>Fat: ${foods.fatPerServing}</p><p>Sugars: ${foods.sugarPerServing}</p>`
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
        parsedFoods.forEach(foods => {
            fetch(`https://world.openfoodfacts.org/api/v0/product/${foods.barcode}.json`)
                .then(response => response.json())
                .then(productInfo => {
                    foods.ingredients = productInfo.product.ingredients_text
                    foods.countryOrigin = productInfo.product.purchase_places
                    foods.caloriesPerServing = productInfo.product.nutriments.energy
                    foods.fatPerServing = productInfo.product.nutriments.fat
                    foods.sugarPerServing = productInfo.product.nutriments.sugars

                    // Produce HTML representation
                    const foodAsHTML = foodFactory(foods)

                    // Add representaiton to DOM
                    addFoodToDom(foodAsHTML)
                })

        })
    })