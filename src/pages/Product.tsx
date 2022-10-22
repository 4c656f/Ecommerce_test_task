import React, {FC, useEffect} from 'react';
import {useParams} from "react-router-dom";
import ProductFull from "../components/ui/ProductFull/ProductFull";

type ProductProps = {

}

const Product:FC<ProductProps> = (props:ProductProps) => {

    const {
        
    } = props

    const {productId} = useParams()

    useEffect(()=>{

    },[productId])

    return (
        <div>

        </div>
    );
};

export default Product;