import React, {FC, memo, useEffect, useState} from 'react';
import {IProduct} from "../../../types/IProduct";
import productService from "../../../services/productService";
import {Link, useNavigate} from "react-router-dom";
import classes from './ProductCart.module.css'
import Button from "../Button/Button";
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

        const img = new Image()

        productService.getProductImages({
            filter: {product_id: id}
        }).then((data) => {

            img.src = `https://test2.sionic.ru${data[0].image_url}`
            img.onload=()=>setImageUrl(data[0].image_url)
        })
        productService.getProductVariations(
            {
                filter:
                    {
                        product_id: id
                    },
                sort: ["price", 'ASC']
            }).then((data) => {
                setPrice(data[0].price)
            })
    }, [])



    return (
        <Link
            to={`/product/${id}`}
            className={classes.container}
        >
            {imageUrl?
                <img
                    className={classes.image}
                    src={`https://test2.sionic.ru${imageUrl}`}
                />:<div className={`loader_bg ${classes.image_loader}`}>

                </div>
            }

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

            <Button
                className={classes.cart_btn}
                onClick={(e)=>{
                    e.preventDefault()

                }}
            >
                Add to cart
            </Button>
        </Link>
    );
};

export default memo(ProductCard);