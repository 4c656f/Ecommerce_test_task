import {createSelector} from "redux-orm";
import {orm} from "../index";
import {Cart} from "../models/cart";
import {ActiveOrder} from "../models/activeOrder";


export const cartSelector = createSelector(orm.Cart);

export const activeOrderSelector = createSelector(orm.ActiveOrder);