import { postToShopify } from "../../utils/shopify";


export default async function handler(req, res) {
  const data = await postToShopify({
    query: `
    query getProductList {
      products(sortKey: PRICE, first: 100, reverse: true) {
        edges {
          node {
            id
            handle
            description
            title
            tags
            variants(first: 3) {
              edges {
                node {
                  id
                  title
                  quantityAvailable
                  image{
                    url
                  }
                  priceV2 {
                    amount
                    currencyCode
                  }
                }
              }
            }
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  src
                  altText
                }
              }
            }
          }
        }
      }
    }`,
    variables: {}
  });

  res.status(200).json({ data })
}
