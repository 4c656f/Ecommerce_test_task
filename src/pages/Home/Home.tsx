import React, {FC, useEffect, useRef, useState} from 'react';
import productService from "../../services/productService";
import {IProduct} from "../../types/IProduct";
import {IRange} from "../../types/IRange";
import ProductCard from "../../components/ui/ProductCard/ProductCard";
import classes from './Home.module.css'
type HomeProps = {}


const Home: FC<HomeProps> = (props: HomeProps) => {

    const {} = props

    const lastElem = useRef<any>();
    const observer = useRef<any>();

    const [range, setRange] = useState<IRange>([0, 10])

    const [isLast, setIsLast] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [products, setProducts] = useState<IProduct[]>([])

    const [categories, setCategories] = useState<Record<number, string>>({})


    useEffect(() => {

        setIsLoading(true)


        if (Object.keys(categories).length < 1) {

            productService.getProductCategories({}).then((data) => {
                const obj = data.reduce<Record<number, string>>((acum, data) => {

                    acum[data["id"]] = data["name"]

                    return acum
                }, {})

                setCategories(obj)

            })
        }


        productService.getProductsList({
            range: range,
            sort: ['id', 'ASC']
        }).then((data) => {
            if (data.length <= 0) {
                setIsLast(true)
                return
            }
            setProducts(prevState => [...prevState, ...data])

        }).finally(() => {
            setIsLoading(false)
        })


    }, [range[1]])


    useEffect(() => {

        if (isLoading) return;
        if (isLast) {
            if (observer.current) observer.current.disconnect();
            return;
        }
        ;
        if (observer.current) observer.current.disconnect();

        const observerCallback = (entries: any[]) => {

            if (entries[0].isIntersecting) {
                console.log('observerd', range)
                setRange((prevState) => {
                    return [prevState[1] + 1, prevState[1] + 10]
                })
            }

        }

        observer.current = new IntersectionObserver(observerCallback)
        observer.current.observe(lastElem.current)
    }, [isLoading, isLast]);

    return (
        <div className={classes.container}>
            <h2>Категории</h2>
            <div className={classes.category_section}>
                {
                    Object.entries(categories).map(value => {

                        return (
                            <button
                                key={value[0]}
                                className={classes.category_btn}
                            >
                                <h4>{value[1]}</h4>
                            </button>
                        )
                    })
                }
            </div>
            <div className={classes.product_container}>
                {
                    products?.map(value => {
                        return (
                            <ProductCard
                                key={value.id}
                                categories={categories}
                                {...value}

                            />
                        )
                    })
                }
                <div ref={lastElem} className={classes.observer}></div>
            </div>

        </div>
    );
};

export default Home;