import {createReducer, ORM} from "redux-orm";
import {Cart} from "./models/cart";
import {configureStore} from "@reduxjs/toolkit";


const orm = new ORM({ stateSelector: (state) => state.orm })

orm.register(Cart)



export const store = configureStore({
    reducer:{
        orm: createReducer(orm)
    }
})
export {orm}
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
