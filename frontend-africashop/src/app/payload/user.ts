import { Role } from "./role";

export class User{
    
    id! : number;
    userId! : string;

    email! : string;

    name! : string;

    password! : string;

   role! : Role;
}