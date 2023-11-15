import { BrandInterface } from "./brand.interface";

export class Brand implements BrandInterface {
    id?: Number | undefined;
    name: string;
    distributor: string;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;

    constructor(
        name = "",
        distributor = "",
    ) {
        this.name = name;
        this.distributor = distributor;
    }

}