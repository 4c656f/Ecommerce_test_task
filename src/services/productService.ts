import {IProduct} from "../types/IProduct";
import api from "./HTTPConfig/HTTPConfig";
import {ISort} from "../types/ISort";
import {IFilter} from "../types/IFilter";
import {DefaultApiProps} from "../types/DefaultApiProps";
import {IRange} from "../types/IRange";


type getProductsListProps = {
    range: IRange
} & DefaultApiProps<IProduct>




export default class productService {

    static async getProduct(id: number): Promise<IProduct> {

        const resp = await api.get<IProduct>(`/Products/${id}`)

        return resp.data

    }

    static async getProductsList(props:getProductsListProps): Promise<IProduct[]> {

        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProduct[]>(`/Products`, {
            params: {
                range: JSON.stringify(range),
                ...(sort&&{
                    sort: JSON.stringify(sort)
                }),
                ...(filter&&{
                    filter: JSON.stringify(filter)
                }),

            }
        })

        return resp.data
    }
}

