import {Model, fk, oneToOne, many, attr} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";

export const addToCart = createAction<number>("models/cart/create");
export const deleteFromCart = createAction<number>("models/cart/delete");


export class Cart extends Model{
    static get fields() {
        return {
            id: attr(),
            name: attr(),

        };
    }
    static reducer({ type, payload }:{type:string, payload:any}, Cart:any, session:any) {
        switch (type) {
            case addToCart.type: {
                Cart.create({name: payload});
                break;
            }
            case deleteFromCart.type: {
                let post = Cart.withId(payload);
                post?.delete();
                break;
            }
            default:
                break;
        }
    }
}
Cart.modelName = "Cart";
