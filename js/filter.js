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


// filtre le texte taper avec une boucle for à partir de 3 caractères
function filterByText(text) {
    const filteredRecipesList = []
    if (text.length < 3) return
    for (let i = 0; i < recipesFiltered.size; i++) {
        const recipe = Array.from(recipesFiltered)[i]
        if (recipe.name.toLowerCase().includes(text)) {
            filteredRecipesList.push(recipe)
        }
        else if (recipe.description.toLowerCase().includes(text)) {
            filteredRecipesList.push(recipe)
        }
        else
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i]
                if (ingredient.ingredient.toLowerCase().includes(text)) {
                    filteredRecipesList.push(recipe)
                }
            }
    }
    recipesFiltered = new Set(filteredRecipesList)
}


//filtre par les ingrédients
function filterByIngredients(ingredientsList) {
    if (!ingredientsList.length) return
    const filteredRecipesList = []
    for (let i = 0; i < recipesFiltered.size; i++) {
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipeIngredientsList = []
        for (let i = 0; i < recipe.ingredients.length; i++) {
            const ingredient = recipe.ingredients[i]
            recipeIngredientsList.push(ingredient.ingredient)
        }
        for (let i = 0; i < ingredientsList.length; i++) {
            const ingredient = ingredientsList[i];
            if (!recipeIngredientsList.includes(ingredient)) isRecipeValid = false
        }
        if (isRecipeValid) {
            filteredRecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}


//filtre par les ustensiles
function filterByUstensils(ustensilsList) {
    if (!ustensilsList.length) return
    const filteredRecipesList = []
    for (let i = 0; i < recipesFiltered.size; i++) {
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipeUstensilsList = []
        for (let i = 0; i < recipe.ustensils.length; i++) {
            const ustensil = recipe.ustensils[i]
            recipeUstensilsList.push(normalizeData(ustensil))
        }
        for (let i = 0; i < ustensilsList.length; i++) {
            const ustensil = ustensilsList[i];
            if (!recipeUstensilsList.includes(ustensil)) isRecipeValid = false
        }
        if (isRecipeValid) {
            filteredRecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}

//filtre par les appareils
function filterByAppliances(appliancesList) {
    if (!appliancesList.length) return
    const filteredRecipesList = []
    for (let i = 0; i < recipesFiltered.size; i++) {
        const recipe = Array.from(recipesFiltered)[i]
        let isRecipeValid = true
        const recipesIngredientsList = []
        if (appliancesList.includes(normalizeData(recipe.appliance))) {
            filteredRecipesList.push(recipe)
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}