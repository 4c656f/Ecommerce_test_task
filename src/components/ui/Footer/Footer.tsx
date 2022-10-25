import React, {FC, memo} from 'react';
import classes from './Footer.module.css'
import {ReactComponent as AppStoreIcon} from '../../../materials/icons/App Store.svg'
import {ReactComponent as FacebookIcon} from '../../../materials/icons/Facebook.svg'
import {ReactComponent as VkIcon} from '../../../materials/icons/Vk.svg'
import {ReactComponent as GoogleIcon} from '../../../materials/icons/Google Play.svg'
import {ReactComponent as InstIcon} from '../../../materials/icons/Inst.svg'

type FooterProps = {

}

const Footer:FC<FooterProps> = (props:FooterProps) => {

    const {
        
    } = props

    
    return (
        <footer
            className={classes.container}
        >
            <h1>React</h1>
            <div
                className={classes.social_section}
            >
                <div
                    className={classes.icons_section}
                >
                    <VkIcon/>
                    <FacebookIcon/>
                    <InstIcon/>
                </div>
                <div
                    className={classes.icons_section}
                >
                    <GoogleIcon/>
                    <AppStoreIcon/>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);