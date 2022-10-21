import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";

type ProductProps = {

}

const Product:FC<ProductProps> = (props:ProductProps) => {

    const {
        
    } = props

    const {productId} = useParams()


    useEffect(()=>{

        console.log(productId)
    },[productId])

    return (
        <div>
            
        </div>
    );
};

export default Product;