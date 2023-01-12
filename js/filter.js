const searchBar = document.querySelector('.search-bar')
const emptyRecipesMessage = document.getElementById('empty-recipes-message')
let recipesFiltered = new Set(recipes)

const filters = {
    textInputed  : "",
    ingredients  : [],
    ustensils  : [],
    appliances  : []
}

searchBar.addEventListener('input', (event) => {
    filters.textInputed = event.target.value
    filterRecipes(filters)
})

function filterRecipes(research){
    recipesFiltered = new Set(recipes)
    filterByText(research.textInputed.toLowerCase())
    //filterByIngredients(research.ingredients)
    //filterByUstensils(research.ustensils)
    //filterByAppliances(research.appliances)
    recipesSection.innerHTML = ''
    if (!recipesFiltered.size){
        const elt = document.getElementById('empty-recipes-model');
        const dupNode = document.importNode(elt.content,true);
        emptyRecipesMessage.innerHTML = ''
        emptyRecipesMessage.appendChild(dupNode)
    }
    else {
        emptyRecipesMessage.innerHTML = ''
        hydrateRecipes(recipesFiltered)
    }

    
}

function filterByText(text) { 
    const filteredRecipesList = []
    if (text.length < 3) return
    for (let i= 0 ; i < recipesFiltered.size ; i++){
        const recipe = Array.from(recipesFiltered)[i]
        if (recipe.name.toLowerCase().includes(text)) 
        { 
            filteredRecipesList.push(recipe)
        }
        else if (recipe.description.toLowerCase().includes(text)) {
            filteredRecipesList.push(recipe)
        }
        else
        for (let i= 0 ; i < recipe.ingredients.length ; i++){
            const ingredient = recipe.ingredients[i] 
            if (ingredient.ingredient.toLowerCase().includes(text))
            {
                filteredRecipesList.push(recipe)
            }
        }
    }
    recipesFiltered = new Set(filteredRecipesList)
}
