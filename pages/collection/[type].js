import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
    const url = new URL('http://localhost:3000');
    url.pathname = '/api/collections';

    const res = await fetch(url.toString());

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const results = await res.json();

    return {
        paths: results.collections.map(({ node }) => `/collection/${node.title}`),
        fallback: false,
    };
};


export async function getStaticProps({ params }) {
    const url = new URL('http://localhost:3000');
    url.pathname = '/api/collections';

    const res = await fetch(url.toString());

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const results = await res.json();

    const collection = results.collections.map(({ node }) => {
        return {
            title: node.title,
            description: node.description,
            products: node.products.edges,
            imgSrc: node.image === null ? '' : node.image.src,
            id: node.id
        }
    }).find(({ title }) => title === params.type)

    return {
        props: { collection }
    }
}

const CollectionPage = ({ collection }) => {

    const mapProducts = collection.products.map(({ node }) => {
        return (
            <div key={node.id}>
                <h1>
                    {node.title}
                </h1>
                <Link href={`/product/${node.handle}`}>
                    <Image
                        width={100}
                        height={100}
                        src={node.images.edges[0].node.src}
                        alt={node.title}
                    />
                </Link>
            </div>
        )
    })

    return (
        <div>
            <Image
                width={100}
                height={100}
                src={collection.imgSrc}
                alt={collection.title} />
            {collection.title}

            {mapProducts}
        </div>
    )
}

export default CollectionPage;
