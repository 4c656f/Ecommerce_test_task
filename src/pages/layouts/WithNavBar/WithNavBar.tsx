import React, {FC} from 'react';
import {Outlet} from 'react-router-dom';
import classes from "./WithNavBar.module.css"
import NavBar from "../../../components/ui/NavBar/NavBar";
import Footer from "../../../components/ui/Footer/Footer";

type WithNavBarProps = {}

const WithNavBar: FC<WithNavBarProps> = (props: WithNavBarProps) => {

    const {} = props


    return (
        <div className={classes.container}>
            {/*navbar*/}
            <NavBar/>

            <div
                className={classes.content_container}
            >
                <Outlet/>
            </div>
            <Footer/>
        </div>
    );
};

export default WithNavBar;