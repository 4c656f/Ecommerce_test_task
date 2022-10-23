import {IProduct} from "../types/IProduct";
import api from "./HTTPConfig/HTTPConfig";
import {DefaultApiProps} from "../types/DefaultApiProps";
import {ICategory} from "../types/ICategory";
import {IProductImage} from "../types/IProductImage";
import {IProductVariations} from "../types/IProductVariations";
import {IProductVariationProperties} from "../types/IProductVariationProperties";
import {IProductVariationPropertyListValues} from "../types/IProductVariationPropertyListValues";
import {IProductVariationPropertyValues} from "../types/IProductVariationPropertyValues";


export default class productService {

    static async getProduct(id: number|string): Promise<IProduct> {

        const resp = await api.get<IProduct>(`/Products/${id}`)

        return resp.data

    }

    static async getProductsList(props: DefaultApiProps<IProduct>): Promise<IProduct[]> {

        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProduct[]>(`/Products`, {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),

            }
        })

        return resp.data
    }

    static async getProductCategories(props: DefaultApiProps<ICategory>): Promise<ICategory[]> {
        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<ICategory[]>('/Categories', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data

    }

    static async getProductImages(props: DefaultApiProps<IProductImage>): Promise<IProductImage[]> {
        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProductImage[]>('/ProductImages', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data

    }

    static async getProductVariations(props: DefaultApiProps<IProductVariations>): Promise<IProductVariations[]> {
        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProductVariations[]>('/ProductVariations', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }

    static async getProductVariationProperties(props: DefaultApiProps<IProductVariationProperties>): Promise<IProductVariationProperties[]> {
        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProductVariationProperties[]>('/ProductVariationProperties', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }

    static async getProductVariationPropertyListValues(props: DefaultApiProps<IProductVariationPropertyListValues>): Promise<IProductVariationPropertyListValues[]> {
        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProductVariationPropertyListValues[]>('/ProductVariationPropertyListValues', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }

    static async getProductVariationPropertyValues(props: DefaultApiProps<IProductVariationPropertyValues>): Promise<IProductVariationPropertyValues[]> {

        const {
            range,
            sort,
            filter
        } = props

        const resp = await api.get<IProductVariationPropertyValues[]>('/ProductVariationPropertyValues', {
            params: {
                ...(range && {
                    range: JSON.stringify(range)
                }),
                ...(sort && {
                    sort: JSON.stringify(sort)
                }),
                ...(filter && {
                    filter: JSON.stringify(filter)
                }),
            }
        })

        return resp.data
    }
}

