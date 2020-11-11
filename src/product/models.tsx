export interface Product {
    id: number;
    name: string;
    price: number;
    quantityPerPrice: number;
    imagePath: string;
    description: string;
    brewingInfo: BrewingInfo;
    categories: string[];
}

export interface BrewingInfo {
    weightInfo: string;
    temperatureInfo: string;
    timeInfo: string;
    numberOfBrewingsInfo: string;
}
