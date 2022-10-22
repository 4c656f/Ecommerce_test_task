import React, {FC, memo, useEffect, useState} from 'react';
import {IProduct} from "../../../types/IProduct";
import productService from "../../../services/productService";
import {useNavigate} from "react-router-dom";

type ProductCardProps = {
    categories: Record<number, string>
} & IProduct

const ProductCard: FC<ProductCardProps> = (props: ProductCardProps) => {


    const [imageUrl, setImageUrl] = useState<string>()

    const [price, setPrice] = useState<number>()

    const {
        categories,
        id,
        name,
        category_id,
        description
    } = props

    useEffect(() => {
        console.log("imagerequest")
        productService.getProductImages({
            filter: {product_id: id}
        }).then((data) => {
            setImageUrl(data[0]["image_url"])
        })
        productService.getProductVariations(
            {
                filter:
                    {
                        product_id: id
                    }
            }).then((data) => {
            console.log(id, data)
            const price = data.reduce((acum, variation, index) => {
                const price = variation.price
                if (price < acum || index === 0) {
                    acum = price
                }
                return acum
            }, 0)
            setPrice(price)
        })


    }, [])

    const navigator = useNavigate()

    return (
        <div onClick={() => {
            navigator(`/product/${id}`)
        }}>
            <h1>
                {id}
            </h1>
            <h1>
                {name}
            </h1>
            <h1>
                {`от: ${price}`}
            </h1>
            <h3>
                {categories[category_id]}
            </h3>
            <img src={`https://test2.sionic.ru${imageUrl}`}/>
            <h5>
                {description}
            </h5>
        </div>
    );
};

export default memo(ProductCard);