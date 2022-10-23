import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import productService from "../../services/productService";
import {IProductVariations} from "../../types/IProductVariations";
import {IProductVariationProperties} from "../../types/IProductVariationProperties";
import {IProductVariationPropertyValues} from "../../types/IProductVariationPropertyValues";
import {IProductVariationPropertyListValues} from "../../types/IProductVariationPropertyListValues";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {cartSelector} from "../../store/selectors/selectors";
import classes from './Product.module.css'
import Button from "../../components/ui/Button/Button";
import {DropDown, MenuItem} from "4c656f_react_ui_kit";
import {addToCart} from "../../store/models/cart";
import CustomImage from "../../components/ui/CustomImage/Image";

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

    const [dropDownIndex, setDropDownIndex] = useState<number>()

    const [imageUrl, setImageUrl] = useState<string>()


    const [variations, setVariations] = useState<Map<string | number, IProductVariations>>(new Map<string | number, IProductVariations>())

    const [variationProperties, setVariationProperties] = useState<Map<string, IProductVariationPropertyValues>>(new Map<string, IProductVariationPropertyValues>())

    const getProductVariations = async () => {
        if (!productId) return
        const prodId = Number(productId)
        const product = await productService.getProductImages({filter: {product_id: prodId}})

        setImageUrl(product[0].image_url)



        const data = await productService.getProductVariations({filter: {product_id: prodId}})
        console.log(data, 'productVariations')
        setVariationId(data[0].id)
        data.forEach(value => setVariations(prevState => prevState.set(value.id, value)))


        const values = await productService.getProductVariationPropertyValues(
            {
                filter:
                    {
                        product_variation_id: data.map((val) => val.id)
                    },
                sort: ["id", 'ASC']
            })

        values.forEach((value) => {

            setVariationProperties(prevState => {
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


    const dispatch = useAppDispatch()


    const handleDropDown = (item:number) => {
        setDropDownIndex(item)
    }
    useEffect(()=>{

        const variationId = variations.get(Array.from(variations.keys())[dropDownIndex?dropDownIndex:0])?.id
        //@ts-ignore
        setVariationId(variationId)
    },[dropDownIndex])


    const handleAddToCart = () => {
        if(!variations?.get(variationId)?.stock)return
        if(!productId || !imageUrl)return;
        dispatch(addToCart({
            productId: Number(productId),
            productImg: imageUrl,
            variationId: variationId,
        }))
    }

    return (
        <div
            className={classes.container}
        >
            <CustomImage
                className={classes.image}
                src={imageUrl}
            />
            <div
                className={classes.price_properties_container}
            >


                <div
                    className={classes.price_stock_container}
                >
                    <div>
                        <span>
                            цена:
                        </span>
                        <h1 className={classes.price}>
                            {
                                variations?.get(variationId)?.price

                            }
                        </h1>
                    </div>
                    <div>
                        <span>
                            наличие:
                        </span>

                        <span>
                            {
                                variations?.get(variationId)?.stock
                            }
                        </span>
                    </div>
                </div>
                <DropDown
                    colorIndex={'1'}
                    label={variations.get(variationId)?.id.toString()??'Выбать'}
                    onChange={handleDropDown}
                    search={true}

                >
                    {
                        Array.from(variations.keys()).map((value, index) => {


                            return (
                                <MenuItem
                                    key={value}
                                    value={variations.get(value)?.id}
                                >
                                    {
                                        variations.get(value)?.id.toString()
                                    }
                                </MenuItem>
                            )
                        })

                    }
                </DropDown>
                <div
                    className={classes.properties_container}
                >
                    {


                        (() => {
                            if (isRenderProperties && propertiesObj) {
                                return productVariationProperties?.map((data) => {


                                    let dataString = calculateProperty(
                                        variationId,
                                        data.id,
                                        data.type,
                                        propertiesObj,
                                        variationProperties
                                    )


                                    return (
                                        <div
                                            key={data.id}
                                            className={classes.properties_container_container}
                                        >

                                            <span>
                                                {
                                                    data.name
                                                }

                                            </span>
                                            <span>
                                                {
                                                    dataString ? dataString : "null"
                                                }
                                            </span>

                                        </div>
                                    )
                                })
                            }

                            return (
                                <>
                                    {[...Array(10)].map((value, index) => {
                                        return (
                                            <div
                                                className={`loader_bg ${classes.properties_loader}`}
                                                key={index}
                                            />
                                        )
                                    })

                                    }
                                </>
                            )
                        })()

                    }
                </div>
                <Button
                    onClick={handleAddToCart}
                >
                    Add to cart
                </Button>
            </div>

        </div>
    );
};

export default Product;