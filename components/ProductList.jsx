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
        <div>
            <Link href={`/product/${product.slug}`}>
                <Image
                    width={100}
                    height={100}
                    src={product.imgSrc}
                    alt={product.imgAlt}
                />
            </Link>

            <h2>
                {product.title}
            </h2>

            <p>
                {product.description}
            </p>

            <p>
                {formattedPrice.format(product.price)}
            </p>
        </div>
    )
};

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const url = new URL('http://localhost:3000');
        url.pathname = '/api/products';

        const res = await fetch(url.toString());

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
        <div>
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