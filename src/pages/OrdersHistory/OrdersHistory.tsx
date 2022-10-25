import React, {FC, useEffect} from 'react';
import {useAppSelector} from "../../store/hooks";
import {ordersHistorySelector} from "../../store/selectors/selectors";
import {OrderFields} from "../../store/models/ordersHistory";
import classes from './OrdersHistory.module.css'

type OrdersHistoryProps = {}

const OrdersHistory: FC<OrdersHistoryProps> = (props: OrdersHistoryProps) => {

    const {} = props

    const orders: OrderFields[] = useAppSelector(state => ordersHistorySelector(state))



    return (
        <div
            className={classes.container}
        >
            <h2>История заказов</h2>
            <div
                className={classes.order_container}
            >
                {
                    orders.map(value => {
                        return (
                            <div
                                className={classes.order_card}
                                key={value.id}
                            >
                                <div
                                    className={classes.card_header_section}
                                >
                                    <h2>Xiaomi</h2>
                                    <span>{value.orderDate}</span>
                                </div>
                                <div
                                    className={classes.card_section}
                                >

                                    <div
                                        className={classes.card_section_section}
                                    >
                                            <span>
                                                Статус заказа
                                            </span>
                                        <h3>
                                            Оплачен/завершён
                                        </h3>
                                    </div>
                                    <div
                                        className={classes.card_section_section}
                                    >
                                            <span>
                                                Номер заказа
                                            </span>
                                        <h3>
                                            {`#${value.id}`}
                                        </h3>
                                    </div>

                                </div>
                                <div
                                    className={classes.card_section}
                                >
                                    <div
                                        className={classes.card_section_section}
                                    >
                                        <span>
                                            кол-во товаров
                                        </span>
                                        <h3>
                                            {value.orderProducts.reduce((previousValue, currentValue) => {
                                                return previousValue + currentValue.quantity
                                            }, 0)}
                                        </h3>
                                    </div>
                                    <div
                                        className={classes.card_section_section}
                                    >
                                        <span>
                                            Стоимость товаров
                                        </span>
                                        <h3>
                                            {value.orderPrice}
                                        </h3>
                                    </div>
                                    <div
                                        className={classes.card_section_section}
                                    >
                                        <span>
                                            Адресс доставки
                                        </span>
                                        <h3>
                                            {
                                                value.orderAddress
                                            }
                                        </h3>
                                    </div>
                                </div>
                            </div>

                        )
                    })
                }
            </div>
        </div>
    );
};

export default OrdersHistory;