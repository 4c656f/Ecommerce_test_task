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
export const deleteFromCart = createAction<Omit<IChangeQuantity, 'amount'>>("models/cart/delete");
export const hydrateCart = createAction<CartFields[]>("models/cart/hydrate");

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
    payload: Omit<IChangeQuantity, 'amount'>
}
interface hydrateCart {
    type: "models/cart/hydrate"
    payload: CartFields[]
}

type IActions = addToCart | removeFromCart | changeQuantity | hydrateCart

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
                    productId,
                    variationId
                } = payload
                let cartElem = Cart.withId(`${productId}${variationId}`)
                cartElem?.delete();
                break;
            }
            case 'models/cart/change': {
                const{
                    productId,
                    variationId,
                    amount
                } = payload
                let cartElem = Cart.withId(`${productId}${variationId}`)
                if(cartElem.quantity < 2 && amount < 0){
                    cartElem?.delete()
                    break
                }
                if (cartElem) {
                    cartElem?.update(
                        {
                            quantity: cartElem.quantity + amount
                        }
                    )
                }
                break;
            }
            case 'models/cart/hydrate':{
                const arr = payload

                arr.forEach(value=>{
                    Cart.create(value)
                })
                break;


            }
            default:
                break;

        }
    }
}

Cart.modelName = "Cart";
