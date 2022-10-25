import {createReducer, ORM} from "redux-orm";
import {Cart} from "./models/cart";
import {configureStore, Middleware} from "@reduxjs/toolkit";
import {ActiveOrder} from "./models/activeOrder";
import {OrdersHistory} from "./models/ordersHistory";


const orm = new ORM({stateSelector: (state) => state.orm})

orm.register(Cart)
orm.register(ActiveOrder)
orm.register(OrdersHistory)


const localStorageMiddleware: Middleware = ({getState}) => {
    return next => action => {
        const result = next(action);
        if (!action.type.includes('hydrate')) {
            if (action.type.startsWith('models/cart/')) {
                const cart = getState().orm.Cart
                const serializeState = cart.items.map((value: number) => {
                    return cart.itemsById[value]
                })
                localStorage.setItem('cart', JSON.stringify(serializeState))
            }
            if(action.type.startsWith('models/OrdersHistory')){
                const ordersHistory = getState().orm.OrdersHistory
                const serializeState = ordersHistory.items.map((value: number) => {
                    return ordersHistory.itemsById[value]
                })
                localStorage.setItem('ordersHistory', JSON.stringify(serializeState))
            }

        }
    };
};

export const store = configureStore({
    reducer: {
        orm: createReducer(orm)
    },
    middleware: (getDefaultMiddleware => {

        return [...getDefaultMiddleware(), localStorageMiddleware]
    })
})
export {orm}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
