import React, {FC} from 'react';
import { Outlet } from 'react-router-dom';
import classes from "./WithNavBar.module.css"

type WithNavBarProps = {

}

const WithNavBar:FC<WithNavBarProps> = (props:WithNavBarProps) => {

    const {

    } = props


    return (
        <div>
            {/*navbar*/}
            navbar



            <Outlet/>

        </div>
    );
};

export default WithNavBar;