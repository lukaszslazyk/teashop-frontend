export interface Product {
    id: string;
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

export const availableProductCategories = [
    "GreenTea",
    "BlackTea",
    "RedTea",
    "WhiteTea",
    "Herbs",
    "Accessories",
];
