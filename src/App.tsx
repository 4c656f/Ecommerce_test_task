import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home/Home";
import WithNavBar from "./pages/layouts/WithNavBar/WithNavBar";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart/Cart";
import ShoppingList from "./pages/ShoppingList";
import productService from "./services/productService";
import {IProductVariationProperties} from "./types/IProductVariationProperties";
import {IProductVariationPropertyListValues} from "./types/IProductVariationPropertyListValues";
import './materials/styles/index.css'
import './materials/styles/variables.css'
import CreateOrder from "./pages/CreateOrder/CreateOrder";
import {useAppDispatch} from "./store/hooks";
import {CartFields, hydrateCart} from "./store/models/cart";




function App() {

    const [variationsProperties, setVariationsProperties] = useState<IProductVariationProperties[]>([])
    const [productVariationPropertyListValues, setProductVariationPropertyListValues] = useState<Record<number, IProductVariationPropertyListValues>>({})


    const dispatch = useAppDispatch()

    useEffect(() => {

        //HYDRATE STORE
        console.log('HYDRATE')
        const cart = localStorage.getItem('cart')
        if(cart){
            dispatch(hydrateCart(JSON.parse(cart)))
        }




        //GET CATEGORIES
        console.log('categoryrequest')
        productService.getProductVariationProperties({
            sort: ["id", 'ASC']
        }).then((data) => {
            console.log(data, '-----properties')
            setVariationsProperties([...data])
        })
        productService.getProductVariationPropertyListValues({}).then(value => {
            const obj = value.reduce((acum, val) => {
                acum[val["id"]] = val
                return acum
            }, {} as Record<number, IProductVariationPropertyListValues>)
            setProductVariationPropertyListValues({...obj})
        })
    }, [])

    return (
        <BrowserRouter>
            <Routes>
                {/*pages with nav bar*/}
                <Route element={<WithNavBar/>}>


                    <Route path={"*"} element={<h1>notFound</h1>}/>

                    <Route path={"/"} element={<Home/>}/>

                    <Route path={"/product/:productId"} element={<Product
                        productVariationProperties={variationsProperties}
                        propertiesObj={productVariationPropertyListValues}
                    />}/>

                    <Route path={"/cart"} element={<Cart/>}/>

                    <Route path={"/create-order"} element={<CreateOrder/>}/>

                    <Route path={"/shopping-list"} element={<ShoppingList/>}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;
