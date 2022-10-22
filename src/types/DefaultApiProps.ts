import {ISort} from "./ISort";
import {IFilter} from "./IFilter";
import {IRange} from "./IRange";

export type DefaultApiProps<T> = {
    sort?: ISort<T>
    filter?: IFilter<T>,
    range?: IRange
}

