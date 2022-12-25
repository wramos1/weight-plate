import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";


const Collection = ({ collection }) => {
    const mapProducts = collection.products.slice(0, 1).map(({ node }) => {
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
    });

    return (
        <div>
            <Link href={`/collection/${collection.title}`}>
                {collection.title}
            </Link>
            {mapProducts}
        </div>
    )
};

const CollectionList = () => {
    const [collections, setCollections] = useState([]);

    const fetchCollections = async () => {
        const url = new URL('http://localhost:3000');
        url.pathname = '/api/collections';

        const res = await fetch(url.toString());

        if (!res.ok) {
            console.error(res);
            return { props: {} };
        }

        const results = await res.json();

        const collections = results.collections.splice(1).map(({ node }) => {
            return {
                title: node.title,
                description: node.description,
                products: node.products.edges,
                imgSrc: node.image === null ? '' : node.image.src,
                id: node.id
            }
        });

        setCollections(collections);
    }

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div>
            {collections.map((collection) => {
                return (
                    <Collection
                        key={collection.id}
                        collection={collection} />
                )
            })}
        </div>
    )
};

export default CollectionList;