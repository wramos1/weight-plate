import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
  const data = await postToShopify({
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
                  description
                  products(first: 10) {
                    edges {
                      node {
                        id
                        title
                        handle
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
  });

  res.status(200).json({ collections: data.collections.edges })
} 