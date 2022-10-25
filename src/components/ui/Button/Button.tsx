import React, {ComponentProps, FC, memo, PropsWithChildren} from 'react';
import classes from './Button.module.css'


type DefaultButtonProps = ComponentProps<'button'>

type CustomButtonProps = {
    disabled?: boolean
}

type ButtonProps = PropsWithChildren<CustomButtonProps> & Omit<DefaultButtonProps, keyof CustomButtonProps>


const Button: FC<ButtonProps> = (props: ButtonProps) => {

    const {
        disabled,
        children,
        className,
        ...rest
    } = props


    return (
        <button

            className={`${classes.btn} ${className ? className : ''} ${disabled && classes.disabled}`}
            {...rest}
        >
            {children}
        </button>
    );
};

export default memo(Button);