import {ISort} from "./ISort";
import {IFilter} from "./IFilter";

export type DefaultApiProps<T> = {
    sort?: ISort<T>
    filter?: IFilter<T>
}

