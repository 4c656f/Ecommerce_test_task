import {createSelector} from "redux-orm";
import {orm} from "../index";
import {Cart} from "../models/cart";


export const cartSelector = createSelector(orm.Cart);