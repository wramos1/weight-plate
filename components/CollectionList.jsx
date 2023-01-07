import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";


const Collection = ({ collection }) => {
    return (
        <div className="w-1/4 flex justify-evenly flex-col h-full relative border-2 border-slate-800 hover:bg-slate-800 hover:border-white hover:border-2 hover:z-10 hover:text-white transition-all hover:scale-110 mobile:w-2/3">
            <Link href={`/collection/${collection.handle}`} className="absolute h-full w-full">
                <div className="h-1/3 w-full flex justify-center items-center mobile:h-1/5">
                    <h1 className="text-5xl w-screen flex-[4_1_0%] text-center mobile:text-2xl">{collection.title}</h1>
                </div>
                <div className="relative h-2/3 w-full p-2 mobile:h-4/5">
                    <Image
                        fill
                        src={collection.imgSrc}
                        alt={collection.title}
                    />
                </div>
            </Link>
        </div>
    )
};

const CollectionList = () => {
    const [collections, setCollections] = useState([]);

    const fetchCollections = async ({ params }) => {
        const url = new URL('http://localhost:3000' || params.slug);
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
                id: node.id,
                handle: node.handle
            }
        });

        setCollections(collections);
    }

    useEffect(() => {
        fetchCollections();
    }, []);

    return (
        <div className="flex flex-col w-full h-screen border-t-2 border-white">
            <div className="flex flex-col justify-center w-full items-center mt-4">
                <h1 className="title mobile:text-4xl">We Got The Weight For Your Plate</h1>
                <h1 className="text-5xl mobile:text-2xl">All Day</h1>
            </div>
            <div className="h-full w-full flex mobile:flex-col mobile:items-center">
                {collections.map((collection) => {
                    return (
                        <Collection
                            key={collection.id}
                            collection={collection} />
                    )
                })}
            </div>

        </div>
    )
};

export default CollectionList;