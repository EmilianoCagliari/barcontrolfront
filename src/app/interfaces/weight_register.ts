import { WeightRegisterInterface } from "./weight_register.interface";

export class WeightRegister implements WeightRegisterInterface {
    id?: number | undefined;
    weight: number;
    product_id: number;
    user_id?: number;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    constructor(
        weight = 0,
        product_id = 0
    ) {
        this.weight = weight;
        this.product_id = product_id;
    }


}