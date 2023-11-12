import { UserInterface } from "./user.interface";

export class User implements UserInterface {
    id?: number | undefined;
    name: string;
    surname: string;
    email: string;
    password: string;
    role?: number;
    isActive?: boolean;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;


    constructor(
        name = "",
        surname = "",
        email = "",
        password = ""
    ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

}