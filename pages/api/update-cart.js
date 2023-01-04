import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
    let { cartId, lines } = JSON.parse(req.body);

    const data = await postToShopify({
        query: `
        mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
                cart {
                    lines(first: 100){
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
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
        variables: { cartId, lines }
    })
        .then(response => {
            res.status(200).json({ response });
        })
        .catch(error => {
            res.json(error);
            res.status(405).end();
        })
}