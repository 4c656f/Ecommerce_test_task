import React, {ComponentProps, FC, PropsWithChildren} from 'react';
import classes from './Input.module.css'


type CustomInputProps = {

}
type DefaultInputProps = ComponentProps<'input'>

type InputProps = Omit<DefaultInputProps, keyof CustomInputProps>




const Input:FC<InputProps> = (props:InputProps) => {

    const {
        className,
        ...rest
    } = props


    return (
        <input
            className={`${className?className:''} ${classes.container}`}
            {
                ...rest
            }
        />
    );
};

export default Input;