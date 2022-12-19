import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
    const { cartId, variantId } = JSON.parse(req.body);

    const data = await postToShopify({
        query: `
        mutation AddToCart($cartId: ID!, $variantId: ID!) {
            cartLinesAdd(cartId: $cartId, lines: [{ quantity: 1, merchandiseId: $variantId}]) {
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
        variables: { cartId, variantId }
    });

    res.status(200).json({ data })
}