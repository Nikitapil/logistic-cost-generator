import { Region } from './Region';
import { IRegion } from "./types";

export class Search {
    regions: Region[] = []
    filteredRegions: Region[] = []
    searchList: HTMLDivElement | null = null
    isSearchListOpened: boolean = false
    constructor() {
        const searchBtn = document.querySelector('.search-btn')
        searchBtn.addEventListener('click', () => {
            if (this.isSearchListOpened) {
                this.closeSearch()
            } else {
                this.openSearch()
            }
        })

        const searchInput: HTMLInputElement = document.querySelector('.search__input')
        searchInput.addEventListener('input', (e) => {
            this.filteredRegions = this.regions.filter(item => item.name.toLowerCase().includes((e.target as HTMLInputElement).value.toLowerCase()))
            this.updateSearch()
        })
    }

    async getRegions() {
        const response = await fetch('../json/regions.json')
        const json: IRegion[] = await response.json()
        this.regions = json.map(item => new Region(item))
        this.filteredRegions = [...this.regions]
    }

    openSearch() {
        if (!this.isSearchListOpened) {
            const container = document.querySelector('.search')
            this.searchList = document.createElement('div')
            this.searchList.className = 'region-list open'
            container.append(this.searchList)
            this.addRegions()
            this.isSearchListOpened = true
        }
        
    }

    closeSearch() {
        const regionList = document.querySelector('.region-list')
        if (regionList) {
            regionList.remove()
            this.isSearchListOpened = false
        }
    }

    addRegions() {
        this.filteredRegions.forEach(item => {
            const region = document.createElement('div')
            region.className = 'region'
            region.innerHTML = `<p class="region__name">${item.name}</p>
            <button class="region__button app-button" id=${item.id}>${item.isAdded ? 'Удалить' : 'Добавить'}</button>`
            this.searchList.append(region)
        })
    }

    updateSearch() {
        this.closeSearch()
        this.openSearch()
    }

}