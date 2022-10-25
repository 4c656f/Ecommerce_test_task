import {attr, Model} from "redux-orm";
import {createAction} from "@reduxjs/toolkit";


export type serializedProduct = {
    productId: number;
    variationId: number;
    quantity: number;
    price:number;
}

export type OrderFields = {
    id: string;
    orderPrice: number;
    orderAddress: string;
    orderProducts: serializedProduct[]
    orderDate: string
    orderUUID: number;
}

type IAddToOrder = Omit<OrderFields, 'id'>
type IHydrateOrders = OrderFields[]

export const addOrder = createAction<IAddToOrder>("models/OrdersHistory/add");
export const hydrateOrdersHistory = createAction<IHydrateOrders>("models/OrdersHistory/hydrate");

interface addOrder {
    type: "models/OrdersHistory/add"
    payload: IAddToOrder
}

interface hydrateOrdersHistory {
    type: "models/OrdersHistory/hydrate"
    payload: IHydrateOrders
}

type IActions = addOrder | hydrateOrdersHistory

export class OrdersHistory extends Model {
    static get fields() {
        return {
            id: attr(),
            orderPrice: attr(),
            orderAddress: attr(),
            orderProducts: attr(),
            orderDate: attr(),
            orderUUID: attr(),
        };
    }

    static reducer({type, payload}: IActions, OrdersHistory: any, session: any) {
        switch (type) {
            case "models/OrdersHistory/add": {

                const {
                    orderPrice,
                    orderAddress,
                    orderDate,
                    orderProducts,
                    orderUUID,
                } = payload

                OrdersHistory.create({
                    orderPrice: orderPrice,
                    orderAddress: orderAddress,
                    orderProducts: orderProducts,
                    orderDate: orderDate,
                    orderUUID: orderUUID
                })
                break;
            }
            case "models/OrdersHistory/hydrate": {
                payload.forEach(value => {
                    OrdersHistory.create(value)
                })
                break;
            }
            default:
                break;

        }
    }
}

OrdersHistory.modelName = "OrdersHistory";
