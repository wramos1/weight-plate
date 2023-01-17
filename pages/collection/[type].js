import Image from "next/image";
import Link from "next/link";

export async function getStaticPaths() {
    const res = await fetch(process.env.SHOPIFY_API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token':
                process.env.SHOPIFY_STOREFRONT_API_TOKEN,
        },
        body: JSON.stringify({
            query: `
            query GetCollections {
                collections(first: 5) {
                  edges {
                    node {
                      title
                      image {
                        src
                      }
                      id
                      handle
                      description
                      products(first: 10) {
                        edges {
                          node {
                            id
                            title
                            handle
                            description
                            images(first: 1) {
                              edges {
                                node {
                                  src
                                  altText
                                }
                              }
                            }
                            variants(first: 3) {
                              edges {
                                node {
                                  id
                                  title
                                  priceV2 {
                                    amount
                                    currencyCode
                                  }
                                  image {
                                    url
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }`,
            variables: {}
        }),
    });

    if (!res.ok) {
        console.error(res.data);
        return { props: {} };
    }

    const results = await res.json();

    return {
        paths: results.data.collections.edges.map(({ node }) => `/collection/${node.handle}`),
        fallback: true,
    };
};


export async function getStaticProps({ params }) {
    const res = await fetch(process.env.SHOPIFY_API_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Shopify-Storefront-Access-Token':
                process.env.SHOPIFY_STOREFRONT_API_TOKEN,
        },
        body: JSON.stringify({
            query: `
            query GetCollections {
                collections(first: 5) {
                  edges {
                    node {
                      title
                      image {
                        src
                      }
                      id
                      handle
                      description
                      products(first: 10) {
                        edges {
                          node {
                            id
                            title
                            handle
                            description
                            images(first: 1) {
                              edges {
                                node {
                                  src
                                  altText
                                }
                              }
                            }
                            variants(first: 3) {
                              edges {
                                node {
                                  id
                                  title
                                  priceV2 {
                                    amount
                                    currencyCode
                                  }
                                  image {
                                    url
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }`,
            variables: {}
        }),
    });

    if (!res.ok) {
        console.error(res);
        return { props: {} };
    }

    const results = await res.json();

    const collection = results.data.collections.edges.map(({ node }) => {
        return {
            title: node.title,
            description: node.description,
            products: node.products.edges,
            imgSrc: node.image === null ? '' : node.image.src,
            id: node.id,
            handle: node.handle
        }
    }).find(({ handle }) => handle === params.type)

    return {
        props: { collection }
    }
}

const CollectionPage = ({ collection }) => {

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const mapProducts = collection.products.map(({ node }) => {
        return (
            <div key={node.id} className="flex flex-col max-w-[360px] h-[500px] basis-1/2 rounded-2xl justify-between items-stretch p-2">

                <div className="h-full relative w-full">
                    <h2 className="subTitle text-2xl text-center">
                        {node.title}
                    </h2>

                    <div className='rounded-2xl relative h-full'>
                        <Link href={`/product/${node.handle}`}>
                            <Image
                                className="rounded-2xl static"
                                fill
                                src={node.images.edges[0].node.src}
                                alt={node.title}
                            />
                        </Link>
                    </div>
                </div>


                <div className="w-full flex flex-col justify-center items-center h-full relative">
                    <p className="text-center">
                        {node.description}
                    </p>

                    <Link href={`/product/${node.handle}`} className="button my-0 mx-auto bottom-0 absolute">
                        Purchase For {formattedPrice.format(node.variants.edges[0].node.priceV2.amount)}
                    </Link>
                </div>
            </div>
        )
    });

    return (
        <div className="flex flex-col w-full pt-[2rem]">
            <h1 className="title text-center">
                {collection.title}
            </h1>


            <div className="flex flex-wrap flex-row gap-8 justify-evenly items-evenly">
                {mapProducts}
            </div>

            <Link href={'/menu'} className="my-0 mx-auto p-10">
                <button className="formal-button">
                    View Entire Menu
                </button>
            </Link>
        </div>
    )
}

export default CollectionPage;
