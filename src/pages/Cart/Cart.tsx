import React, {FC} from 'react';
import {useAppSelector} from "../../store/hooks";
import {cartSelector} from "../../store/selectors/selectors";
import {CartFields} from "../../store/models/cart";

type CartProps = {}

const Cart: FC<CartProps> = (props: CartProps) => {

    const {

    } = props

    const cart:CartFields[] = useAppSelector(state => cartSelector(state))


    return (
        <div>
            {cart.map(value=>{
                return(
                    <div key={value.id}>
                        {value.productId}
                    </div>
                )
            })}
        </div>
    );
};

export default Cart;