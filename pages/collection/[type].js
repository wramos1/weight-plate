import Image from "next/image";

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
    return (
        <div>
            <Image
                width={100}
                height={100}
                src={collection.imgSrc}
                alt={collection.title} />
            {collection.title}
        </div>
    )
}

export default CollectionPage;
