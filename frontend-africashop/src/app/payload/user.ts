import { Role } from "./role";

export class User{
    
    userId! : string;

    email! : string;

    name! : string;

    password! : string;

   role! : Role;
}