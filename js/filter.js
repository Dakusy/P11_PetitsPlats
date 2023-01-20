const searchBar = document.querySelector('.search-bar')
const emptyRecipesMessage = document.getElementById('empty-recipes-message')
let recipesFiltered = new Set(recipes)

const filters = {
    textInputed: "",
    ingredients: [],
    ustensils: [],
    appliances: []
}


//event permettant la mise à jour à chaque input utilisant la fonction filterRecipes
searchBar.addEventListener('input', (event) => {
    filters.textInputed = event.target.value
    filterRecipes(filters)
})

//fonction regroupant tout les filtres

function filterRecipes(research) {
    recipesFiltered = new Set(recipes)
    filterByText(research.textInputed.toLowerCase())
    filterByIngredients(research.ingredients)
    filterByUstensils(research.ustensils)
    filterByAppliances(research.appliances)
    recipesSection.innerHTML = ''
    if (!recipesFiltered.size) {
        const model = document.getElementById('empty-recipes-model');
        const dupNode = document.importNode(model.content, true);
        emptyRecipesMessage.innerHTML = ''
        emptyRecipesMessage.appendChild(dupNode)
    }
    else {
        emptyRecipesMessage.innerHTML = ''
        hydrateRecipes(recipesFiltered)
    }
    hydrateAllTags()


}


// filtre le texte taper avec une fonction JS avancé : filter
function filterByText(text) {
    if (text.length < 3) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(e => (
        e.name.toLowerCase().includes(text)
        || e.description.toLowerCase().includes(text)
        || e.ingredients.forEach(ingredient => { return ingredient.ingredient.toLowerCase().includes(text) })
    ))
    recipesFiltered = new Set(filteredRecipesList)
}


//filtre par les ingrédients
function filterByIngredients(ingredientsList) {
    if (!ingredientsList.length) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(recipe => {
        const recipeIngredientsList = recipe.ingredients.map(i => i.ingredient.toLowerCase())
        return ingredientsList.every(x => recipeIngredientsList.includes(x.toLowerCase()))
    })
    recipesFiltered = new Set(filteredRecipesList)
}


//filtre par les ustensiles
function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(recipe => {
        const recipeUstensilList = recipe.ustensils.map(ustensil => ustensil.toLowerCase())
        return ustensilsList.every(x => recipeUstensilList.includes(x.toLowerCase()))
    })
    recipesFiltered = new Set(filteredRecipesList)
}

//filtre par les appareils
function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    let filteredRecipesList = Array.from(recipesFiltered)
    filteredRecipesList = filteredRecipesList.filter(recipe => recipe.appliance.toLowerCase() === appliancesList[0].toLowerCase())
    recipesFiltered = new Set(filteredRecipesList)
}