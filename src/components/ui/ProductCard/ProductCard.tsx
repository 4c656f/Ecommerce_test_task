import React, {FC, memo, useEffect, useState} from 'react';
import {IProduct} from "../../../types/IProduct";
import productService from "../../../services/productService";
import {Link, useNavigate} from "react-router-dom";
import classes from './ProductCart.module.css'
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



    return (
        <Link
            to={`/product/${id}`}
            className={classes.container}
        >
            <img
                className={classes.image}
                src={`https://test2.sionic.ru${imageUrl}`}
            />
            <button
                className={classes.category}
            >
                {categories[category_id]}
            </button>

            <h4
                className={classes.name}
            >
                {name}
            </h4>
            <h2
                className={classes.price}
            >
                {`от: ${price?price:""}`}
            </h2>

            <button
                className={classes.cart_btn}
                onClick={(e)=>{
                    e.preventDefault()

                }}
            >
                Add to cart
            </button>
        </Link>
    );
};

export default memo(ProductCard);