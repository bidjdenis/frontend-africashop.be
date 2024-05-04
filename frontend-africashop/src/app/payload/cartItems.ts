import { Product } from "./product";
import { User } from "./user";

export class CartItems {

    id! : number;

    price! : number;

    quantity! : number;

    product! : Product;

    user! : User;
    
    productName! : string;

    processedImg!: string; 
    
    returnedImg!: string;
}