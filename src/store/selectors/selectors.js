import {createSelector} from "redux-orm";
import {orm} from "../index";


export const cartSelector = createSelector(orm.Cart);