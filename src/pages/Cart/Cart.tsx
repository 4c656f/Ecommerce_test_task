import React, {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {cartSelector} from "../../store/selectors/selectors";
import {CartFields, changeQuantity} from "../../store/models/cart";
import productService from "../../services/productService";
import {IProduct} from "../../types/IProduct";
import {IProductVariations} from "../../types/IProductVariations";
import classes from './Cart.module.css'

type CartProps = {}

type ICart = {
    products: Record<number | string, IProduct>
    variations: Record<number | string, IProductVariations>
}


const Cart: FC<CartProps> = (props: CartProps) => {

    const {} = props


    const cart: CartFields[] = useAppSelector(state => cartSelector(state))

    const dispatch = useAppDispatch()

    const [cartPrice, setCartPrice] = useState<ICart>()

    const getCart = async () => {


        const variants = await productService.getProductVariations({
            filter: {
                id: cart.map(value => value.variationId)
            },
            sort: ['product_id', 'ASC']
        })
        const products = await productService.getProductsList({
            filter: {
                id: cart.map(value => value.productId)
            },
            sort: ["id", 'ASC']
        })

        setCartPrice({
            products: products.reduce((previousValue, currentValue) => {
                previousValue[currentValue.id] = currentValue
                return previousValue
            }, {} as Record<string | number, IProduct>),
            variations: variants.reduce((previousValue, currentValue) => {
                previousValue[currentValue.id] = currentValue
                return previousValue
            }, {} as Record<string | number, IProductVariations>)
        })


    }

    useEffect(() => {
        console.log('cart_effect---------')
        getCart()

    }, [cart.length])


    return (
        <div
            className={classes.container}
        >
            <div
                className={classes.cart_header}
            >
                <h2>
                    корзина
                </h2>
            </div>
            <div
                className={classes.cart_price_container}
            >
                <div>
                    <h4>Стоимость корзины:</h4>
                    {
                        cartPrice &&
                        <h1>
                            {
                                cart.reduce((prev, value) => {
                                    return prev + (cartPrice.variations[value.variationId].price * value.quantity)
                                }, 0)
                            }
                        </h1>
                    }
                </div>
            </div>
            <div>
                {
                    cartPrice &&
                    cart.map((value, index) => {
                        return (
                            <div>
                                <div>{
                                    cartPrice.variations[value.variationId].price
                                }</div>
                                <button
                                    onClick={()=>dispatch(changeQuantity({
                                        productId:value.productId,
                                        variationId: value.variationId,
                                        amount: 1
                                    }))}
                                >
                                    +
                                </button>
                                <div>
                                    {
                                        value.quantity
                                    }
                                </div>
                                <button
                                    onClick={()=>dispatch(changeQuantity({
                                        productId:value.productId,
                                        variationId: value.variationId,
                                        amount: -1
                                    }))}
                                >
                                    -
                                </button>
                                <div>
                                    {
                                        cartPrice.products[value.productId].name
                                    }
                                </div>
                            </div>

                        )
                    })
                }
            </div>

        </div>
    );
};

export default Cart;