import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
    const { cartId } = req.query;

    const data = await postToShopify({
        query: `
        query GetCart($cartId: ID!) {
            cart(id: $cartId){
                checkoutUrl
                estimatedCost {
                    totalAmount {
                        amount
                    }
                }
                totalQuantity
                lines(first: 100) {
                    edges {
                        node {
                            quantity
                            estimatedCost {
                                subtotalAmount {
                                    amount
                                    currencyCode
                                }
                                totalAmount {
                                    amount
                                    currencyCode
                                }
                            }
                            merchandise {
                                ... on ProductVariant {
                                    title
                                    product {
                                        title
                                    }
                                    priceV2 {
                                        amount
                                        currencyCode
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        `,
        variables: { cartId }
    });

    if (!data) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was a problem.' }),
        }
    };

    res.status(200).json({ cart: data.cart })
}