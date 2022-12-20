import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import AddToCart from '../../components/Add-To-Cart';
import styles from '../../styles/Home.module.css';

export async function getStaticPaths() {
    const url = new URL('http://localhost:3000');
    url.pathname = '/api/products';

    const res = await fetch(url.toString());

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const results = await res.json();

    return {
        paths: results.data.products.edges.map(({ node }) => `/product/${node.handle}`),
        fallback: false,
    };
};

export async function getStaticProps({ params }) {
    const url = new URL('http://localhost:3000');
    url.pathname = '/api/products';

    const res = await fetch(url.toString());

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const results = await res.json();

    const product = results.data.products.edges.map(({ node }) => {
        return {
            id: node.id,
            title: node.title,
            description: node.description,
            imgSrc: node.images.edges[0].node.src,
            imgAlt: node.title,
            price: node.variants.edges[0].node.priceV2.amount,
            slug: node.handle,
            variants: node.variants.edges
        }
    }).find(({ slug }) => slug === params.slug);

    return {
        props: { product }
    };
};

function Product({ product }) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return (
        <div className={styles.product}>
            <Image
                width={100}
                height={100}
                src={product.imgSrc}
                alt={product.imgAlt}
            />

            <h2>
                {product.title}
            </h2>

            <p>
                {product.description}
            </p>

            <p className={styles.price}>
                {formattedPrice.format(product.price)}
            </p>

            <AddToCart
                buttonText={`Purchase for ${formattedPrice.format(product.price)}`}
                variantId={product.variants[0].node.id}
                options={product.variants}
            />
        </div>
    )
}

const ProductPage = ({ product }) => {
    return (
        <div className={styles.container}>
            <Link href={'/'}>
                &larr; Back Home
            </Link>

            <div className={styles.products}>
                <Product
                    product={product}
                />
            </div>

        </div>
    )
}

export default ProductPage;