import React, {FC, FormEvent, useEffect, useState} from 'react';
import {activeOrderSelector} from "../../store/selectors/selectors";
import {Navigate, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "../../components/ui/Button/Button";
import classes from './CreateOrder.module.css'
import FormInput from "../../components/ui/FormInput/FormInput";
import {IFormElement} from "../../types/IFormElement";
import {useAppDispatch} from "../../store/hooks";
import {addOrder} from "../../store/models/ordersHistory";
import {clearCart} from "../../store/models/cart";

type CreateOrderProps = {}


const formElements = [
    {
        uuid: 1,
        name: 'date',
        type: 'date',
        placeholder: 'Выберите дату',
        errorMessage: 'Это поле обязательно',
        label: 'Когда доставить?',
        required: true
    },
    {
        uuid: 2,
        name: 'address',
        type: 'text',
        placeholder: 'Выберите Адресс доставки',
        errorMessage: 'Это поле обязательно',
        label: 'Куда доставить?',
        required: true
    },
    {
        uuid: 3,
        name: 'name',
        type: 'text',
        placeholder: '',
        errorMessage: 'Это поле обязательно',
        label: 'Имя',
        required: true
    },
    {
        uuid: 4,
        name: 'tel',
        type: 'tel',
        placeholder: '',
        errorMessage: 'Это поле обязательно',
        label: 'Телефон',
        required: true
    },
] as IFormElement

const CreateOrder: FC<CreateOrderProps> = (props: CreateOrderProps) => {

    const {} = props

    const navigator = useNavigate()

    const [formState, setFormState] = useState<Record<string, string>>(formElements.reduce((previousValue, currentValue) => {
        previousValue[currentValue.name] = ''
        return previousValue
    }, {} as Record<string, string>))

    const activeOrder = useSelector(state => activeOrderSelector(state))
    const dispatch = useAppDispatch()


    useEffect(() => {
        console.log(activeOrder)
    }, [formState])

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(addOrder({
            orderPrice: activeOrder[0].orderPrice + 200,
            orderAddress: formState['address'],
            orderDate: formState['date'],
            orderUUID: 1,
        }))
        dispatch(clearCart())
        navigator('/order-history')
    }
    if (activeOrder.length < 1) {
        return <Navigate to={'/'}/>
    }

    return (
        <>
            <h1>Доставка</h1>
            <form
                className={classes.container}
                onSubmit={handleFormSubmit}
            >

                <div
                    className={classes.form_container}
                >
                    {formElements.map((value, index) => {

                        const {
                            uuid,
                            name,
                        } = value

                        return <FormInput
                            key={uuid}
                            value={formState[name]}
                            onChange={(event => setFormState(prevState => {
                                return {
                                    ...prevState,
                                    [name]: event.target.value
                                }
                            }))}
                            {...value}
                        />
                    })}
                </div>
                <div
                    className={classes.submit_container}
                >
                    <div
                        className={classes.submit_element_container}
                    >
                        <div
                            className={classes.submit_element_property_container}
                        >
                            <span>Стоимость товаров:</span>
                            <h3>
                                {activeOrder[0].orderPrice}
                            </h3>
                        </div>
                        <div
                            className={classes.submit_element_property_container}
                        >
                            <span>Стоимость доставки:</span>
                            <h3>
                                200
                            </h3>
                        </div>
                        <div
                            className={classes.submit_element_property_container}
                        >
                            <span>Итого:</span>
                            <h2>
                                {activeOrder[0].orderPrice + 200}
                            </h2>
                        </div>
                    </div>
                    <Button

                    >Оформить</Button>
                </div>
            </form>
        </>
    );


};

export default CreateOrder;