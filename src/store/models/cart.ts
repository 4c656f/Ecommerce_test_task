import {Model, fk, oneToOne, many, attr} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";

export const createPost = createAction("models/cart/create");
export const deletePost = createAction("models/cart/delete");


export class Cart extends Model{
    static get fields() {
        return {
            id: attr(),
            name: attr(),

        };
    }
    static reducer({ type, payload }:{type:string, payload:any}, Post:any, session:any) {
        switch (type) {
            case createPost.type: {
                Cart.upsert(payload);
                break;
            }
            case deletePost.type: {
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
