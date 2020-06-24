function PopularesUfs() {
    const ufSelect = document.querySelector("select[name=uf]")
   
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}
PopularesUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const inputSelected = document.querySelector("input[name=state")

    const indexOfSelectedState = event.target.selectedIndex
    inputSelected.value = event.target.options[indexOfSelectedState].text 

    const ufValue = event.target.value

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for(city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Itens da lista
// Pegar todos os itens

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    // adicionar ou remover uma class com JavaScript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id 

    // verifica se existem selecionados, se sim
    // pegar os itens selecionados
    
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId
        return itemFound
    })

    console.log(alreadySelected)

    //se já tive selecionador, tira ele da seleção
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })
        
        selectedItems = filteredItems
    } else {
        // se não tive selecionado 
        // adicionar ele a seleção
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}