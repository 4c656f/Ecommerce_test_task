import React, {ComponentProps, FC, PropsWithChildren, useState} from 'react';
import classes from './FormInput.module.css'


type CustomFromInputProps = {
    label?: string
    errorMessage?: string
}
type DefaultFromInputProps = ComponentProps<'input'>

type FromInputProps = CustomFromInputProps & Omit<DefaultFromInputProps, keyof CustomFromInputProps>




const FormInput:FC<FromInputProps> = (props:FromInputProps) => {

    const {
        label,
        errorMessage,
        className,
        ...rest
    } = props

    const [left , setLeft] = useState(false)


    return (
        <div
            className={classes.container}
        >
            <h3>
                {label}
            </h3>
            <input
                className={`${className?className:''} ${classes.input}`}
                onBlur={()=>setLeft(true)}
                data-left={left?'true':'false'}
                {
                    ...rest
                }
            />
            <span
                className={classes.error_message}
            >
                {errorMessage}
            </span>
        </div>
    );
};

export default FormInput;