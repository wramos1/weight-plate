import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import '../styles/Home.module.css'

function Product({ product }) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });
    return (
        <div className="flex flex-col max-w-[360px] h-[500px] basis-1/2 rounded-2xl justify-between items-stretch p-2">

            <div className="h-full relative w-full">
                <h2 className="subTitle text-2xl text-center">
                    {product.title}
                </h2>

                <div className='rounded-2xl relative h-full'>
                    <Link href={`/product/${product.slug}`}>
                        <Image
                            className="rounded-2xl static"
                            fill
                            src={product.imgSrc}
                            alt={product.imgAlt}
                        />
                    </Link>
                </div>
            </div>


            <div className="w-full flex flex-col justify-center items-center h-full relative">
                <p className="text-center">
                    {product.description}
                </p>

                <Link href={`/product/${product.slug}`} className="button my-0 mx-auto bottom-0 absolute">
                    Purchase For {formattedPrice.format(product.price)}
                </Link>
            </div>
        </div>
    )
};

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const res = await fetch('api/products');

        if (!res.ok) {
            console.error(res);
            return { props: {} };
        }

        const results = await res.json();

        const products = results.data.products.edges.map(({ node }) => {
            return {
                id: node.id,
                title: node.title,
                description: node.description,
                imgSrc: node.images.edges[0].node.src,
                imgAlt: node.title,
                price: node.variants.edges[0].node.priceV2.amount,
                slug: node.handle
            }
        });

        setProducts(products)
    };

    useEffect(() => {
        fetchProducts();
    }, [])


    return (
        <div className="flex flex-wrap flex-row gap-8 justify-evenly items-evenly">
            {products.map((product) => {
                return (
                    <Product
                        key={product.id}
                        product={product} />
                )
            })}
        </div>
    )
}

export default ProductList;