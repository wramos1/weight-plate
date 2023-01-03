import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
    let { cartId, lineIds } = JSON.parse(req.body);

    const data = await postToShopify({
        query: `
        mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                cart {
                    lines(first: 100){
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        product {
                                            title
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
          }          
        `,
        variables: { cartId, lineIds }
    });

    res.status(200).json({ data })
}