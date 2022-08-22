import { RegionsForm } from './RegionsForm';
import { Search } from "./search";

export class App {
    search: Search
    regionsForm: RegionsForm
    constructor() {
        document.addEventListener('click', (e: any) => {
            if(!e.target.closest('.search')) {
                if (this.search) {
                    this.search.closeSearch()
                }
            }
            if (e.target.closest('.region__button')) {
                const region = this.search.regions.find(item => item.id.toString() === e.target.id)
                region.isAdded = !region.isAdded
                this.search.updateSearch()
                this.regionsForm.updateRegions()
            }
            if (e.target.closest('.regions__delete')) {
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                region.isAdded = false
                this.regionsForm.updateRegions()
            }
            if (e.target.closest('.regions__add-cost')) {
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                region.extraCosts.push({minWeight: 0, maxWeight: 0, cost: 0})
                this.regionsForm.updateRegions()
            }
            if (e.target.closest('.delete-cost')) {
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                const idx = +e.target.dataset.index
                region.extraCosts.splice(idx, 1)
                this.regionsForm.updateRegions()
            }
            if (e.target.closest('.save-btn')) {
                let valid = true
                this.search.regions.filter(region => region.isAdded).forEach(region => {
                    const isValid = region.validate()
                    if (!isValid) {
                        valid = false;
                    }
                })
                this.regionsForm.updateRegions()
                if (valid) {
                    console.log(this.search.regions)
                }
            }
        })
        
        document.addEventListener('input', (e:any) => {
            if (e.target.closest('.base-cost__input')) {
                const idx = e.target.value.includes('.') ? e.target.value.indexOf('.') : Infinity
                e.target.value = e.target.value.replace(/[^0-9\.]/g, '').substring(0, idx + 3)
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                region.baseCost = +e.target.value
                this.regionsForm.updateTotalPrice()
            }
            if (e.target.closest('.min-weight')) {
                const idx = e.target.value.includes('.') ? e.target.value.indexOf('.') : Infinity
                e.target.value = e.target.value.replace(/[^0-9\.]/g, '').substring(0, idx + 4)
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                const cost = region.extraCosts[+e.target.dataset.index]
                cost.minWeight = +e.target.value
            }
            if (e.target.closest('.max-weight')) {
                const idx = e.target.value.includes('.') ? e.target.value.indexOf('.') : Infinity
                e.target.value = e.target.value.replace(/[^0-9\.]/g, '').substring(0, idx + 4)
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                const cost = region.extraCosts[+e.target.dataset.index]
                cost.maxWeight = +e.target.value
            }
            if (e.target.closest('.additional-cost__price')) {
                const idx = e.target.value.includes('.') ? e.target.value.indexOf('.') : Infinity
                e.target.value = e.target.value.replace(/[^0-9\.\-]/g, '').substring(0, idx + 3)
                const id = +e.target.dataset.id
                const region = this.search.regions.find(item => item.id === id)
                const cost = region.extraCosts[+e.target.dataset.index]
                cost.cost = +e.target.value
                this.regionsForm.updateTotalPrice()
            }
        })

        document.addEventListener('submit', (e: SubmitEvent) => {
            e.preventDefault()
        })
    }

    async initApp() {
        this.search = new Search()
        await this.search.getRegions()
        this.regionsForm = new RegionsForm(this.search)
    }
}