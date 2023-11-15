import { Product } from "./product";

export interface ProductResponse {
    count: number;
    rows:  Product[];
}

export interface Row {
    id:            number;
    name:          string;
    price:         number;
    quantity:      number;
    brand_id:      number;
    type:          string;
    initialWeight: number;
    barcode:       string;
    createdAt:     Date;
    updatedAt:     Date;
}