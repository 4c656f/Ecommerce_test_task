import React, {FC, useEffect, useState} from 'react';
import {activeOrderSelector} from "../../store/selectors/selectors";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import Button from "../../components/ui/Button/Button";
import classes from './CreateOrder.module.css'
import Input from "../../components/ui/Input/Input";

type CreateOrderProps = {}

const CreateOrder: FC<CreateOrderProps> = (props: CreateOrderProps) => {

    const {} = props

    const [formCheck, setFormCheck] = useState<boolean>()


    const activeOrder = useSelector(state => activeOrderSelector(state))

    const navigator = useNavigate()

    useEffect(() => {
        if (activeOrder.length < 1) navigator('/')
        console.log(activeOrder)
    }, [])







    return (
        <>
            <h1>Доставка</h1>
            <div
                className={classes.container}
            >

                <div
                    className={classes.form_container}
                >

                    <div
                        className={classes.form_container_element_container}
                    >
                        <h3>Когда доставить?</h3>
                    </div>
                    <div
                        className={classes.form_container_element_container}
                    >
                        <h3>Куда доставить?</h3>
                        <Input
                            placeholder={'Выберите адрес доставки'}
                        />
                    </div>
                    <div
                        className={classes.form_container_element_container}
                    >
                        <h3>Имя</h3>
                        <Input
                            placeholder={''}
                        />
                    </div>
                    <div
                        className={classes.form_container_element_container}
                    >
                        <h3>Телефон</h3>
                        <Input
                            placeholder={''}
                        />
                    </div>
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
                        disabled
                    >Оформить</Button>
                </div>
            </div>
        </>
    );
};

export default CreateOrder;