const tagsButtons = document.querySelectorAll('.tags-btn')
const tagsNameArray = ['ingredients', 'appliances', 'ustensils']
const closeTagsButtons = document.querySelectorAll('.tags-opened i')

const emptyTagsMessage = {
    ingredients: document.getElementById('ingredients-opened-empty'),
    appliances: document.getElementById('appliances-opened-empty'),
    ustensils: document.getElementById('ustensils-opened-empty')
}

const tagsInput = {
    ingredients: document.querySelector('.ingredients-opened input'),
    appliances: document.querySelector('.appliances-opened input'),
    ustensils: document.querySelector('.ustensils-opened input')
}

const tagsItems = {
    ingredientsTagsItems: document.querySelector('.ingredients-opened .tags-items'),
    appliancesTagsItems: document.querySelector('.appliances-opened .tags-items'),
    ustensilsTagsItems: document.querySelector('.ustensils-opened .tags-items')
}

// a chaque input dans un tag on utilise la fonction filter pour filtrer par le texte.
for (const tag in tagsInput) {
    tagsInput[tag].addEventListener('input', (event) => {
        filterTagItemsByText(event, tag)
    })
}

// a partir du click sur le bouton pour fermer, on lance la fonction closeTag en lui passant en paramètre le tag en question
for (let i = 0; i < closeTagsButtons.length; i++) {
    closeTagsButtons[i].addEventListener('click', function () {
        closeTag(closeTagsButtons[i].className.split(' ')[0].split('-')[1])
    })
}

// a partir du click sur le bouton pour ouvrir, on lance la fonction openTag en lui passant en paramètre le tag en question
for (let i = 0; i < tagsButtons.length; i++) {
    tagsButtons[i].addEventListener('click', function () {
        openTag(tagsButtons[i].className.split('-')[0])
    })
}

function openTag(tag) {
    for (let i = 0; i < tagsNameArray.length; i++) {
        const tagName = tagsNameArray[i]
        if (tagName !== tag) closeTag(tagName)
    }
    const tagToOpen = document.querySelector('.' + tag + '-opened')
    const buttonToHide = document.querySelector('.' + tag + '-btn')
    tagToOpen.style.display = 'block'
    tagToOpen.querySelector('input').focus()
    buttonToHide.style.setProperty('display', 'none', 'important')
}

function closeTag(tag) {
    const tagToHide = document.querySelector('.' + tag + '-opened')
    const buttonToShow = document.querySelector('.' + tag + '-btn')
    tagToHide.style.display = 'none'
    buttonToShow.style.setProperty('display', 'block', 'important')
    tagsInput[tag].value = ''
    hydrateTagByText(tag)
}




function hydrateTagByText(tag, text) {
    const tagsItemsList = new Set();
    tagsItems[tag + 'TagsItems'].innerHTML = ''
    if (tag === 'ingredients') {
        for (let i = 0; i < recipesFiltered.size; i++) {
            const recipe = Array.from(recipesFiltered)[i]
            for (let i = 0; i < recipe.ingredients.length; i++) {
                const ingredient = recipe.ingredients[i]
                if (
                    (ingredient.ingredient.toLowerCase().includes(text) || !text)
                    && !filters[tag].includes(normalizeData(ingredient.ingredient))
                ) {
                    tagsItemsList.add(normalizeData(ingredient.ingredient))
                }
            }
        }
    }

    else if (tag === 'appliances') {
        for (let i = 0; i < recipesFiltered.size; i++) {
            const recipe = Array.from(recipesFiltered)[i]
            if ((recipe.appliance.toLowerCase().includes(text) || !text)
                && (!filters[tag].includes(normalizeData(recipe.appliance)))) {
                tagsItemsList.add(normalizeData(recipe.appliance))
            }
        }
    }
    else if (tag === 'ustensils') {
        for (let i = 0; i < recipesFiltered.size; i++) {
            const recipe = Array.from(recipesFiltered)[i]
            for (let i = 0; i < recipe.ustensils.length; i++) {
                const ustensil = recipe.ustensils[i]
                if ((ustensil.toLowerCase().includes(text) || !text)
                    && (!filters[tag].includes(normalizeData(ustensil))
                    )) {
                    tagsItemsList.add(normalizeData(ustensil))
                }
            }
        }
    }

    if (!tagsItemsList.size) {
        emptyTagsMessage[tag].style.display = 'block'
    }
    else {
        emptyTagsMessage[tag].style.display = 'none'
    }

    for (let i = 0; i < tagsItemsList.size; i++) {
        const tagsItem = Array.from(tagsItemsList)[i]
        fillTags(tagsItem, tag)
    }
}

function fillTags(tagsItem, tag) {
    const elt = document.getElementById('tags-item-model');
    const dupNode = document.importNode(elt.content, true);
    dupNode.querySelector('.tags-item-name').textContent = tagsItem;
    dupNode.querySelector('.tags-item-name').addEventListener('click', function () {
        selectTag(tagsItem, tag)
    })
    tagsItems[tag + 'TagsItems'].appendChild(dupNode)
}

function selectTag(tagsItem, tag) {
    const selectedTagsItemList = document.querySelector('.selected-tags')
    const elt = document.getElementById('selected-' + tag + '-item-model');
    const impNode = document.importNode(elt.content, true);
    impNode.querySelector('.selected-tags-item-name').textContent = tagsItem;
    impNode.querySelector('.delete-tags-item-btn').addEventListener('click', event => closeTagsItem(event, tag, tagsItem))
    closeTag(tag)
    selectedTagsItemList.appendChild(impNode)
    filters[tag].push(tagsItem)
    tagsInput[tag].value = ''
    hydrateTagByText(tag)
    filterRecipes(filters)
}

function closeTagsItem(e, tag, tagsItem) {
    filters[tag].splice(filters[tag].indexOf(tagsItem))
    e.target.parentElement.parentElement.remove()
    filterRecipes(filters)
}

function filterTagItemsByText(e, tag) {
    const text = e.target.value.toLowerCase()
    hydrateTagByText(tag, text)
}

function hydrateAllTags() {
    hydrateTagByText('ingredients')
    hydrateTagByText('appliances')
    hydrateTagByText('ustensils')
}

// normalise l'écriture de chaque tag
function normalizeData(data) {
    return `${data.slice(0, 1).toUpperCase()}${data.slice(1).toLowerCase()}`
}