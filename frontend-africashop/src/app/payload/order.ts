import { CartItems } from "./cartItems";
import { OrderItems } from "./orderItems";
import { OrderStatus } from "./orderStatus";

export class Order{

    id! : number;
    orderDescription! : string;
    date! :  Date;
    address! : string;
    orderStatus! : OrderStatus;
    amount! : number;
    totalAmount! : number;
    discount! : number;
    trackingId! : string;
    userName! : string;
    email! : string;
    couponName! : string;
    cartItemsDto! : CartItems[];
    orderItems! : OrderItems[];
    
}