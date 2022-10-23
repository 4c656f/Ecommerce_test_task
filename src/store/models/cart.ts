import {attr, Model} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";


export type CartFields = {
    id: number;
    productId: number;
    variationId: number;
    productImg: string;
    quantity: number
}

export const addToCart = createAction<Omit<CartFields, 'quantity'>>("models/cart/create");
export const deleteFromCart = createAction<number>("models/cart/delete");


interface addToCart {
    type: "models/cart/create"
    payload: Omit<CartFields, 'quantity'>
}

interface removeFromCart {
    type: "models/cart/delete"
    payload: {
        id: number
    }
}

type IActions = addToCart | removeFromCart

export class Cart extends Model {
    static get fields() {
        return {
            id: attr(),
            productId: attr(),
            variationId: attr(),
            productImg: attr(),
            quantity: attr(),
        };
    }

    static reducer({type, payload}: IActions, Cart: any, session: any) {
        switch (type) {
            case "models/cart/create": {
                let cartElem = Cart.withId(payload.id)
                if (cartElem) {
                    cartElem?.update(
                        {
                            quantity: cartElem.quantity + 1
                        }
                    )
                } else {
                    Cart.upsert({
                        quantity: 1,
                        ...payload
                    })
                }
                break;
            }
            case "models/cart/delete": {

                const {
                    id
                } = payload
                let post = Cart.withId(id);
                post?.delete();
                break;
            }
            default:
                break;
        }
    }
}

Cart.modelName = "Cart";
