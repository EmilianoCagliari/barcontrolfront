export interface UserInterface {
    id?:        number;
    name:      string;
    surname:   string;
    email:     string;
    password:  string;
    role?:      number;
    isActive?:  boolean;
    createdAt?: Date;
    updatedAt?: Date;
}