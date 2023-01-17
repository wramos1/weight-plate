import { postToShopify } from "./shopify";
export const fetchCollections = async () => {
    const response = await postToShopify({
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
    })
    return response;
};