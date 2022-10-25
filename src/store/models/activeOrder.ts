import {attr, Model} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";


export type ActiveOrderFields = {
    id: string;
    orderPrice: number;
}

type IAddToActiveOrder = {
    orderPrice: number;
}


export const addToActiveOrder = createAction<IAddToActiveOrder>("models/ActiveOrder/create");


interface addToActiveOrder {
    type: "models/ActiveOrder/create"
    payload: IAddToActiveOrder
}

type IActions = addToActiveOrder

export class ActiveOrder extends Model {
    static get fields() {
        return {
            id: attr(),
            orderPrice: attr()
        };
    }

    static reducer({type, payload}: IActions, ActiveOrder: any, session: any) {
        switch (type) {
            case "models/ActiveOrder/create": {
                const {
                    orderPrice
                } = payload

                ActiveOrder.upsert({
                    id: 0,
                    orderPrice: orderPrice
                })

                break;
            }
            default:
                break;

        }
    }
}

ActiveOrder.modelName = "ActiveOrder";
