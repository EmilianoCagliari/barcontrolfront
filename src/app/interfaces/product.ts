import { ProductInterface } from "./product.interface";

export class Product implements ProductInterface {

    id?: Number | undefined;
    name: string;
    price: string;
    quantity: Number;
    brand_id: Number;
    type: string;
    initialWeight: string;
    barcode: string;
    updatedAt?: string | undefined;
    createdAt?: string | undefined;

    constructor(
        name = "",
        price = "",
        qty = 0,
        brand_id = 0,
        type = "",
        iniWeight = "",
        barcode = ""
    ) {
        this.name = name;
        this.price = price;
        this.quantity = qty;
        this.brand_id = brand_id;
        this.type = type;
        this.initialWeight = iniWeight;
        this.barcode = barcode;
    }

    




   
}