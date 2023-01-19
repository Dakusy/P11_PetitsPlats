const recipesSection = document.getElementById("recipes")

hydrateRecipes(recipes) // Affiche toutes les recettes.
hydrateAllTags() // Appel la fonction HydrateAllTags qui appel une autre fonction permettant de modifier en temps réels les tags.

function hydrateRecipes(recipes) {
    recipesLength = recipes.length || recipes.size
    for (let i = 0; i < recipesLength; i++) {
        const recipe = Array.from(recipes)[i]
        showRecipe(recipe)
    }
}

// Fonction permettant l'affichage des recettes utilisant le système des templates HTML.

function showRecipe(recipe) {
    const model = document.getElementById('recipe-model');
    const impNode = document.importNode(model.content, true);
    impNode.querySelector('.recipe-name').textContent = recipe.name;
    impNode.querySelector('.recipe-duration').textContent = recipe.time;
    const ingredientsList = impNode.querySelector(".recipe-ingredients")
    const ingredientModel = document.getElementById('ingredient-model');
    for (let i = 0; i < recipe.ingredients.length; i++) {
        const ingredient = recipe.ingredients[i]
        const impIngredientNode = document.importNode(ingredientModel.content, true);
        impIngredientNode.querySelector('.recipe-ingredient-name').textContent = ingredient.ingredient
        if (ingredient.quantity) {
            impIngredientNode.querySelector('.recipe-ingredient-quantity').textContent = ': ' + ingredient.quantity
        }
        if (ingredient.unit) {
            impIngredientNode.querySelector('.recipe-ingredient-unit').textContent = ingredient.unit
        }
        ingredientsList.appendChild(impIngredientNode)
    }
    impNode.querySelector('.recipe-instructions').textContent = recipe.description
    recipesSection.appendChild(impNode);
}