export interface IRegion {
    id: number;
    name: string;
    isAdded: boolean
}

export interface IExtraCost {
    minWeight: number;
    maxWeight: number;
    cost: number
}