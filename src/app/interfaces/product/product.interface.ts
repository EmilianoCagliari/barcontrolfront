export interface ProductInterface {
    id?: Number,
    name: string,
    price: string,
    quantity: Number,
    brand_id: Number,
    type: string,
    initialWeight: string,
    fullWeight: string,
    barcode: string,
    updatedAt?: Date,
    createdAt?: Date
}