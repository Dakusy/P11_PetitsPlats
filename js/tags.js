const tagsNameArray = ['ustensils', 'appliances', 'ingredients']

const tagsButtons = document.querySelectorAll('.tags-btn')

const closeTagsButtons = document.querySelectorAll('.tags-opened i')

const tagsInput = {
    ingredients : document.querySelector('.ingredients-opened input')

}

for (const tag in tagsInput){
    tagsInput[tag].addEventListener('input', (event) =>{
        filterTagItemsByText(event, tag)
    } )
}
for (let i = 0 ; i < closeTagsButtons.length ; i++) {
    const closeTagsButton = closeTagsButtons[i]
    closeTagsButton.addEventListener('click', function(){
        closeTag(closeTagsButton.className.split(' ')[0].split('-')[1])
    })
}
for (let i = 0 ; i < tagsButtons.length ; i++){
    const tagsButton = tagsButtons[i]
    tagsButton.addEventListener('click' , function() {
        openTag(tagsButton.className.split('-')[0])
    })
}

const tagsItems = {
    ingredientsTagsItems: document.querySelector('.ingredients-opened .tags-items')

}

function openTag(tag){
//TODO
}

function closeTag(tag){
//TODO
}

