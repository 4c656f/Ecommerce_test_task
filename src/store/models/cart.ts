import {attr, Model} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";


export type CartFields = {
    id: string;
    productId: number;
    variationId: number;
    productImg: string;
    quantity: number
}

type IAddToCart = {
    productId: number;
    variationId: number;
    productImg: string;
}
type IChangeQuantity = {
    productId: number|string;
    variationId:number|string
    amount: number
}

export const addToCart = createAction<IAddToCart>("models/cart/create");
export const changeQuantity = createAction<IChangeQuantity>("models/cart/change");
export const deleteFromCart = createAction<number>("models/cart/delete");


interface addToCart {
    type: "models/cart/create"
    payload: IAddToCart
}
interface changeQuantity {
    type: "models/cart/change"
    payload: IChangeQuantity
}

interface removeFromCart {
    type: "models/cart/delete"
    payload: {
        id: number
    }
}

type IActions = addToCart | removeFromCart | changeQuantity

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
                let cartElem = Cart.withId(`${payload.productId}${payload.variationId}`)
                if (cartElem) {
                    cartElem?.update(
                        {
                            quantity: cartElem.quantity + 1
                        }
                    )
                } else {
                    Cart.create({
                        id: `${payload.productId}${payload.variationId}`,
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
            case 'models/cart/change': {
                const{
                    productId,
                    variationId,
                    amount
                } = payload
                let cartElem = Cart.withId(`${productId}${variationId}`)
                if (cartElem) {
                    cartElem?.update(
                        {
                            quantity: cartElem.quantity + amount
                        }
                    )
                }



                break;
            }
            default:
                break;

        }
    }
}

Cart.modelName = "Cart";
