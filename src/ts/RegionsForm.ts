import { Region } from './Region';
import { Search } from './search';

export class RegionsForm {
    search: Search;
    regions: Region[] = []
    constructor(search:Search) {
        this.search = search
        this.showRegions()
    }

    showRegions() {
        this.regions = this.search.regions.filter(region => region.isAdded)
        this.regions.forEach(region => {
            const form = document.createElement('form')
            form.className = 'regions__form'
            const formheader = document.createElement('div')
            formheader.className = 'regions__form-header'
            formheader.innerHTML = `<h2 class="regions__form-title">${region.name}</h2>
            <button class="regions__delete app-button" data-id=${region.id}>Удалить</button>`
            form.append(formheader)
            const baseCost = document.createElement('div')
            baseCost.className = 'regions__base-cost'
            baseCost.innerHTML = `<label for="base-cost_${region.id}">Базовая стоимость доставки:</label>
            <div>
            <input type="text" class='base-cost__input' id="base-cost_${region.id}" data-id=${region.id} placeholder="base coast" value=${region.baseCost}> &#8381;
            ${region.errors.baseCostError ? '<p class="base-cost__error">Укажите базовую стоимость</p>' : ''}
            </div>
            <button class="regions__add-cost app-button" data-id=${region.id}>Добавить наценку</button>`
            form.append(baseCost)
            const additionalCosts = document.createElement('div')
            additionalCosts.className = 'region__additional-costs'
            region.extraCosts.forEach((cost, idx) => {
                const additionalCost = document.createElement('div')
                additionalCost.className = 'additional-cost'
                additionalCost.innerHTML = `<div class="additional-cost__controlls">
                <div class="additional-cost__weights">
                    <input type="text" class="min-weight" data-id=${region.id} data-index=${idx} value=${cost.minWeight} placeholder="min-weight">
                    <span>кг -</span> 
                    <input type="text" class="max-weight" data-id=${region.id} data-index=${idx} value=${cost.maxWeight} placeholder="max-weight">
                    <span>кг</span>
                </div>
                <input class="additional-cost__price" type="text" data-id=${region.id} data-index=${idx} value=${cost.cost} placeholder="cost"> &#8381;
                <button class='delete-cost app-button' data-id=${region.id} data-index=${idx}>Удалить наценку</button>
            </div>
            <p class="total-cost" data-id=${region.id} data-index=${idx}>Итоговая стоимость ${region.baseCost + cost.cost} &#8381;</p>`
            additionalCosts.append(additionalCost)
            })
            form.append(additionalCosts)
            if (region.errors.weightError) {
                const errorMessage = document.createElement('p')
                errorMessage.className = 'error-message'
                errorMessage.textContent = 'Диапазоны веса перекрываются'
                form.append(errorMessage)
            }
            const formContainer = document.querySelector('.regions-forms')
            const saveBtn = document.createElement('button')
            saveBtn.className = 'save-btn app-button'
            saveBtn.textContent = 'Сохранить изменения'
            formContainer.append(form)
            formContainer.append(saveBtn)
        })
    }

    deleteRegions() {
        const formContainer = document.querySelector('.regions-forms')
        formContainer.innerHTML = ''
    }

    updateRegions() {
        this.deleteRegions()
        this.showRegions()
    }

    updateTotalPrice() {
        const totalPrices = document.querySelectorAll('.total-cost')
        totalPrices.forEach((price: any) => {
            const region = this.search.regions.find(region => region.id === +price.dataset.id)
            const cost = region.extraCosts[+price.dataset.index]
            price.innerHTML = `Итоговая стоимость ${region.baseCost + cost.cost} &#8381;`
        })
    }
}