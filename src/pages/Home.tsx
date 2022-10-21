import React, {FC, useEffect, useRef, useState} from 'react';
import productService from "../services/productService";
import {IProduct} from "../types/IProduct";
import {IRange} from "../types/IRange";

type HomeProps = {}

const Home: FC<HomeProps> = (props: HomeProps) => {

    const {} = props

    const lastElem = useRef<any>();
    const observer = useRef<any>();

    const [range, setRange] = useState<IRange>([0, 20])

    const [isLast, setIsLast] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [products, setProducts] = useState<IProduct[]>([])

    useEffect(() => {

        setIsLoading(true)
        console.log(range)
        productService.getProductsList({
            range: range,
            sort: ['id', 'ASC']
        }).then((data) => {
            if(data.length <= 0) {
                setIsLast(true)
                return
            }
            setProducts(prevState => [...prevState, ...data])

        }).finally(()=>{
            setIsLoading(false)
        })

    }, [range[1]])


    useEffect(() => {

        if (isLoading) return;
        if (isLast) {
            if (observer.current)observer.current.disconnect();
            return;
        };
        if (observer.current) observer.current.disconnect();

        const observerCallback = (entries:any[]) => {
            console.log("observed")
            if (entries[0].isIntersecting) {
                setRange((prevState) => {
                    return [prevState[1] + 1, prevState[1] + 10]
                })
            }

        }

        observer.current = new IntersectionObserver(observerCallback)
        observer.current.observe(lastElem.current)
    }, [isLoading, isLast]);

    return (
        <div>
            {
                products?.map(value => {
                    return (
                        <div
                            key={value.id}
                        >
                            <h1>
                                {value.name}
                            </h1>
                            <h4>
                                {value.id}
                            </h4>
                        </div>
                    )
                })
            }
            <div ref={lastElem} style={{backgroundColor: "red", height: '50px', width: '50px'}}></div>
        </div>
    );
};

export default Home;