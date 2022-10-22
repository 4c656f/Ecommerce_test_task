import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import productService from "../services/productService";
import {IProductVariations} from "../types/IProductVariations";
import {IProductVariationProperties} from "../types/IProductVariationProperties";
import {IProductVariationPropertyValues} from "../types/IProductVariationPropertyValues";
import {IProductVariationPropertyListValues} from "../types/IProductVariationPropertyListValues";

type ProductProps = {
    productVariationProperties?: IProductVariationProperties[]
    propertiesObj?: Record<number, IProductVariationPropertyListValues>
}

const calculateProperty = (
    variationId: number,
    propertyId: number,
    type: number,
    propertyObj: Record<string, IProductVariationPropertyListValues>,
    variationProperty: Map<string,
        IProductVariationPropertyValues>
) => {

    switch (type) {
        case 0:
            return variationProperty.get(`${propertyId}${variationId}`)?.value_string
        case 1:
            return variationProperty.get(`${propertyId}${variationId}`)?.value_int
        case 2:
            return variationProperty.get(`${propertyId}${variationId}`)?.value_float
        case 3:
            const index = variationProperty.get(`${propertyId}${variationId}`)?.product_variation_property_list_value_id
            return propertyObj[index ? index : 0]?.title
        default:
            return "string"
    }
}

const Product: FC<ProductProps> = (props: ProductProps) => {

    const {
        productVariationProperties,
        propertiesObj
    } = props

    const {productId} = useParams()

    const [isRenderProperties, setIsRenderProperties] = useState(false)

    const [variationId, setVariationId] = useState<number>(0)

    const [variations, setVariations] = useState<IProductVariations[]>()

    const [variationProperties, setVariationProperties] = useState<Map<string, IProductVariationPropertyValues>>(new Map<string, IProductVariationPropertyValues>())

    const getProductVariations = async () => {
        const data = await productService.getProductVariations({filter: {product_id: Number(productId)}})

        setVariationId(data[0].id)
        setVariations(data)

        const values = await productService.getProductVariationPropertyValues(
            {
                filter:
                    {
                        product_variation_id: data.map((val) => val.id)
                    },
                sort: ["id", 'ASC']
            })
     
        values.forEach((value) => {

            setVariationProperties(prevState =>{
                prevState.set(`${value.product_variation_property_id}${value.product_variation_id}`, value)
                return prevState
            }
            )

        })
        setIsRenderProperties(true)



    }


    useEffect(() => {
        getProductVariations()
    }, [productId])



    return (
        <div>
            <button
                onClick={()=>setVariationId(prevState => prevState+1)}

            >change variation id</button>
            {
                (()=>{
                    if(isRenderProperties && propertiesObj){
                        return productVariationProperties?.map((data) => {



                            let dataString = calculateProperty(
                                variationId,
                                data.id,
                                data.type,
                                propertiesObj,
                                variationProperties
                            )



                            return (
                                <div key={data.id}>
                                    <div>
                                        {
                                            data.name
                                        }

                                    </div>
                                    <div>
                                        {
                                            dataString?dataString:"null"
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }

                    return "str"
                })()

            }
        </div>
    );
};

export default Product;