import React, {FC, memo, useEffect, useState} from 'react';
import classes from "./CustomImage.module.css"

type CustomImageProps = {
    className?: string;
    src?: string;
}

const CustomImage: FC<CustomImageProps> = (props: CustomImageProps) => {

    const {
        className,
        src
    } = props

    const [url, setUrl] = useState<string>()

    useEffect(() => {
        if (!src) return
        const img = new Image()
        img.src = `https://test2.sionic.ru${src}`
        img.onload = () => setUrl(`https://test2.sionic.ru${src}`)

    }, [src])


    return (
        <>
            {
                url ?
                    <img
                        src={url}
                        className={`${className ? className : ""} ${classes.img}`}
                    /> :
                    <div
                        className={`loader_bg ${className ? className : ""} ${classes.img}`}
                    />

            }
        </>
    );
};

export default memo(CustomImage);