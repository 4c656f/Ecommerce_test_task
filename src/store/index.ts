import {createReducer, ORM} from "redux-orm";
import {addToCart, Cart} from "./models/cart";
import {configureStore, createListenerMiddleware, Middleware} from "@reduxjs/toolkit";
import {ActiveOrder} from "./models/activeOrder";


const orm = new ORM({stateSelector: (state) => state.orm})

orm.register(Cart)
orm.register(ActiveOrder)


const localStorageMiddleware: Middleware = ({ getState }) => {
    return next => action => {
        const result = next(action);
        if(action.type.startsWith('models/cart/') && action.type!=='models/cart/hydrate'){
            const cart = getState().orm.Cart
            const serializeState = cart.items.map((value:number)=>{
                return cart.itemsById[value]
            })
            localStorage.setItem('cart', JSON.stringify(serializeState))

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
