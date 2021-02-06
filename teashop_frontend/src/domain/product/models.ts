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

export interface SortOption {
    name: string;
    displayName: string;
}

export const productsSortOptions: SortOption[] = [
    {
        name: "priceAsc",
        displayName: "Price from lowest",
    },
    {
        name: "priceDesc",
        displayName: "Price from highest",
    },
    {
        name: "nameAsc",
        displayName: "Name a-z",
    },
    {
        name: "nameDesc",
        displayName: "Name z-a",
    },
];
