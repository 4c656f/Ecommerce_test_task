import React, {FC, useEffect, useMemo, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {cartSelector} from "../../store/selectors/selectors";
import {CartFields, changeQuantity, deleteFromCart} from "../../store/models/cart";
import productService from "../../services/productService";
import {IProduct} from "../../types/IProduct";
import {IProductVariations} from "../../types/IProductVariations";
import classes from './Cart.module.css'
import Button from "../../components/ui/Button/Button";
import {ReactComponent as DeleteIcon} from "../../materials/icons/delete.svg";
import CustomImage from "../../components/ui/CustomImage/Image";
import {Link, useNavigate} from "react-router-dom";
import {addToActiveOrder} from "../../store/models/activeOrder";
import {serializedProduct} from "../../store/models/ordersHistory";

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

    const [isCartLoading, setIsCartLoading] = useState<boolean>()

    const navigator = useNavigate()

    const getCart = async () => {
        if(cartPrice)return
        setIsCartLoading(true)
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


        setCartPrice((prevState) => {
            return {
                products: products.reduce((previousValue, currentValue) => {
                    previousValue[currentValue.id] = currentValue
                    return previousValue
                }, {} as Record<string | number, IProduct>),
                variations: variants.reduce((previousValue, currentValue) => {
                    previousValue[currentValue.id] = currentValue
                    return previousValue
                }, {} as Record<string | number, IProductVariations>)
            }
        })
        setIsCartLoading(false)
    }

    useEffect(() => {

        getCart()

    }, [cart.length])

    const calcCartPrice = ():number => {

        if (isCartLoading) return 0
        if (!cartPrice) return 0

        return cart.reduce((prev, value) => {
            if (!cartPrice.variations[value.variationId]?.price) return 0
            return prev + (cartPrice.variations[value.variationId].price * value.quantity)
        }, 0)
    }


    const handleCreateOrder = () => {
        if(cart.length< 1)return

        const calc = cart.reduce((prev, value)=>{

            let price = 0
            if (cartPrice?.variations[value.variationId]?.price){
                price = (cartPrice.variations[value.variationId].price)
            }
            prev['orderPrice'] = price * value.quantity
            prev.orderProducts.push({
                productId: value.productId,
                variationId: value.variationId,
                quantity: value.quantity,
                price: price,
            })

            return prev
        }, {orderPrice: 0, orderProducts: []} as {orderPrice: number, orderProducts: serializedProduct[]})


        dispatch(addToActiveOrder({
            orderPrice: calc.orderPrice,
            orderProducts: calc.orderProducts

        }))
        navigator('/create-order')
    }


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
                className={classes.cart_price_main_container}
            >
                <div
                    className={classes.cart_price_container}
                >
                    <div
                        className={classes.price}
                    >
                        <h4>Стоимость корзины:</h4>
                        {
                            cartPrice &&
                            <h2>
                                {calcCartPrice()}
                            </h2>
                        }
                    </div>
                    <Button
                        className={classes.button_checkout}
                        onClick={handleCreateOrder}
                    >Оформить</Button>
                </div>
                {
                    cartPrice &&
                    cart.map((value, index) => {
                        return (
                            <div
                                className={classes.cart_element}
                                key={value['id'] + value["variationId"]}
                            >
                                <Link
                                    to={`/product/${value["productId"]}`}
                                    className={classes.img}

                                >
                                    <CustomImage
                                        src={value.productImg}
                                        className={classes.img}
                                    />
                                </Link>
                                <span>
                                    {
                                        `${cartPrice.products[value.productId]?.name} #${value["variationId"]}`
                                    }
                                </span>
                                <div
                                    className={classes.quantity_container}

                                >
                                    <button
                                        onClick={() => dispatch(changeQuantity({
                                            productId: value.productId,
                                            variationId: value.variationId,
                                            amount: 1
                                        }))}
                                        className={classes.change_button}
                                    >
                                        +
                                    </button>

                                    <span>
                                        {
                                            value.quantity
                                        }
                                    </span>
                                    <button
                                        onClick={() => dispatch(changeQuantity({
                                            productId: value.productId,
                                            variationId: value.variationId,
                                            amount: -1
                                        }))}
                                        className={classes.change_button}
                                    >
                                        {
                                            value.quantity < 2 ? <DeleteIcon/> : '-'
                                        }
                                    </button>
                                </div>
                                <h2>
                                    {cartPrice.variations[value.variationId]?.price}
                                </h2>
                                <button
                                    onClick={() => dispatch(deleteFromCart({
                                        variationId: value["variationId"],
                                        productId: value["productId"]
                                    }))}
                                    className={classes.change_button}
                                >
                                    <DeleteIcon

                                    />
                                </button>
                            </div>

                        )
                    })
                }
            </div>


        </div>
    );
};

export default Cart;