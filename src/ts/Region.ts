import { IExtraCost, IRegion } from "./types";

export class Region {
  id: Number;
  name: string;
  isAdded: boolean;
  baseCost: number;
  extraCosts: IExtraCost[] = [];
  errors = {
    baseCostError: false,
    weightError: false,
  };

  constructor(region: IRegion) {
    this.id = region.id;
    this.name = region.name;
    this.isAdded = false;
    this.baseCost = 0;
  }

  validate() {
    this.errors.baseCostError = !this.baseCost;
    this.errors.weightError = false;
    const weightsArr = this.extraCosts.map((cost) => [
      cost.minWeight,
      cost.maxWeight,
    ]);
    weightsArr.sort((a, b) => a[0] - b[0]);
    for (let i = 0; i < weightsArr.length; i++) {
      if (weightsArr[i + 1] && weightsArr[i + 1][0] < weightsArr[i][1]) {
        this.errors.weightError = true;
        break;
      }
    }
    return !this.errors.baseCostError && !this.errors.weightError
  }
}
