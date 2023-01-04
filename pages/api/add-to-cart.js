import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
    let { cartId, variantId, quantity } = JSON.parse(req.body);

    quantity = parseInt(quantity);

    const data = await postToShopify({
        query: `
        mutation AddToCart($cartId: ID!, $variantId: ID!, $quantity: Int!) {
            cartLinesAdd(cartId: $cartId, lines: [{ quantity: $quantity, merchandiseId: $variantId}]) {
                cart {
                    lines(first: 100){
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        title 
                                        id
                                        product {
                                            title
                                            id
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
        variables: { cartId, variantId, quantity }
    })
        .then(response => {
            res.status(200).json({ response });
        })
        .catch(error => {
            res.json(error);
            res.status(405).end();
        })
}