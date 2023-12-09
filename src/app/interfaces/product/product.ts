import { ProductInterface } from "./product.interface";

export class Product implements ProductInterface {

    id?: number | undefined;
    name: string;
    price: string;
    quantity: number;
    brand_id: number;
    type: string;
    initialWeight: string;
    fullWeight: string;
    barcode: string;
    updatedAt?: Date | undefined;
    createdAt?: Date | undefined;

    constructor(
        name = "",
        price = "",
        qty = 0,
        brand_id = 0,
        type = "",
        iniWeight = "",
        fullWeight = "",
        barcode = ""
    ) {
        this.name = name;
        this.price = price;
        this.quantity = qty;
        this.brand_id = brand_id;
        this.type = type;
        this.initialWeight = iniWeight;
        this.fullWeight = fullWeight;
        this.barcode = barcode;
    }


}