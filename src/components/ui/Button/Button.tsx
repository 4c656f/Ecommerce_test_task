import React, {ComponentProps, FC, PropsWithChildren, ReactElement} from 'react';
import classes from './Button.module.css'


type DefaultButtonProps = ComponentProps<'button'>

type CustomButtonProps = {

}

type ButtonProps = PropsWithChildren<CustomButtonProps> & Omit<DefaultButtonProps, keyof CustomButtonProps>


const Button:FC<ButtonProps> = (props:ButtonProps) => {

    const {
        children,
        ...rest
    } = props


    return (
        <button
            className={classes.btn}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;