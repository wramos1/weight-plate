import Image from 'next/image'
import Link from 'next/link';
import { useState } from 'react';
import AddToCart from '../../components/Add-To-Cart';

export async function getStaticPaths() {
    const url = new URL('http://localhost:3000' || process.env.PUBLIC_URL);
    url.pathname = '/api/products';

    const res = await fetch(url.toString());

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const results = await res.json();

    return {
        paths: results.data.products.edges.map(({ node }) => `/product/${node.handle}`),
        fallback: true,
    };
};

export async function getStaticProps({ params }) {
    const url = new URL('http://localhost:3000' || process.env.PUBLIC_URL);
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
            variants: node.variants.edges,
            tags: node.tags
        }
    }).find(({ slug }) => slug === params.slug);

    return {
        props: { product }
    };
};

function Product({ product }) {
    const [photo, setPhoto] = useState(product.imgSrc)
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const swapVariantPhoto = (picture) => {
        setPhoto(picture);
    };

    return (
        <div className='flex h-[100vh] justify-between w-full mobile:flex-col mobile:h-auto'>
            <div className='w-2/3 bg-slate-800 flex justify-center p-2 transition-all mobile:h-[450px] mobile:w-full mobile:p-5'>
                <div className="w-full relative transition-all">
                    <Image
                        className='rounded-2xl transition-all'
                        fill
                        src={photo}
                        alt={product.imgAlt}
                    />
                </div>

            </div>

            <div className='w-1/2 flex flex-col gap-8 justify-center h-4/5 px-20 pt-24 mobile:w-full mobile:pt-0 mobile:items-center mobile:px-4'>
                <div className='mobile:text-center'>
                    <h2 className='title text-5xl'>
                        {product.title}
                    </h2>

                    <p className='subTitle'>
                        {formattedPrice.format(product.price)}
                    </p>
                    <div className='flex gap-5 mobile:justify-center'>
                        {product.tags.map((tag, i) => {
                            return (
                                <li key={i} className="p-1 bg-slate-400/30 border text-sm border-black list-none">
                                    {tag}
                                </li>
                            )
                        })}
                    </div>
                </div>

                <p className='border border-slate-50 w-4/5'>
                    {product.description}
                </p>

                <AddToCart
                    price={product.price}
                    product={product}
                    variantId={product.variants[0].node.id}
                    options={product.variants}
                    changePhoto={swapVariantPhoto}
                />

                <Link href={'/menu'} className="formal-button w-40 text-sm text-center">
                    Explore More Items
                </Link>
            </div>
        </div>
    )
}

const ProductPage = ({ product }) => {
    return (
        <div className='flex flex-col'>
            <Product
                product={product}
            />
        </div>
    )
}

export default ProductPage;