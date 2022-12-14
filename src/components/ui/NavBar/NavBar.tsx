import React, {FC, memo, useEffect} from 'react';
import classes from './NavBar.module.css'
import {ReactComponent as GeoIcon} from '../../../materials/icons/geoTag.svg'
import {ReactComponent as SearchIcon} from '../../../materials/icons/search.svg'
import {ReactComponent as CartIcon} from '../../../materials/icons/cart.svg'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../../store/hooks";
import {cartSelector} from "../../../store/selectors/selectors";
import {useSelector} from "react-redux";

type NavBarProps = {}

const NavBar: FC<NavBarProps> = (props: NavBarProps) => {

    const {} = props


    const cart = useSelector(state => cartSelector(state))



    return (
        <div className={classes.container}>
            <Link className={classes.logo} to={'/'}>React</Link>
            <div className={classes.geo_section}>
                <GeoIcon className={classes.geo_icon}/>
                <h4>
                    Александровск-Са...
                </h4>
            </div>
            <div className={classes.search_section}>
                <input
                    className={classes.search_input}
                    placeholder={'Поиск бренда, товара, категории'}
                />
                <button
                    className={classes.search_btn}
                >
                    <SearchIcon/>
                </button>
            </div>
            <Link className={classes.cart} to={'/cart'}>
                <CartIcon
                />
                <h3 className={classes.cart_counter}>
                    {
                        cart.length > 0 && cart.length
                    }
                </h3>
            </Link>
            <Link className={classes.avatar} to={'/order-history'}>

            </Link>
        </div>
    );
};

export default memo(NavBar);