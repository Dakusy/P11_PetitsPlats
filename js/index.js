const recipesSection = document.getElementById("recipes")

hydrateRecipes(recipes) // Show all recipes.

function hydrateRecipes(recipes){
    recipesLength = recipes.length || recipes.size
    for (let i = 0 ; i< recipesLength ; i++ ){
        const recipe = Array.from(recipes)[i]
        showRecipe(recipe)
    }
}

// Fonction allowing the recipes showing using HTML Template.

function showRecipe(recipe) {
    const model = document.getElementById('recipe-model');
    const dupNode = document.importNode(model.content,true);
    dupNode.querySelector('.recipe-name').textContent= recipe.name;
    dupNode.querySelector('.recipe-duration').textContent= recipe.time;
    const ingredientsList = dupNode.querySelector(".recipe-ingredients")
    const ingredientModel = document.getElementById('ingredient-model');
    for (let i = 0 ; i < recipe.ingredients.length ; i++){
        const ingredient = recipe.ingredients[i]
        const dupIngredientNode = document.importNode(ingredientModel.content,true);
        dupIngredientNode.querySelector('.recipe-ingredient-name').textContent = ingredient.ingredient
        if (ingredient.quantity) {
            dupIngredientNode.querySelector('.recipe-ingredient-quantity').textContent = ': ' + ingredient.quantity
        }
        if (ingredient.unit) {
            dupIngredientNode.querySelector('.recipe-ingredient-unit').textContent = ingredient.unit
        }
        ingredientsList.appendChild(dupIngredientNode)
    }
    dupNode.querySelector('.recipe-instructions').textContent = recipe.description
    recipesSection.appendChild(dupNode);
}