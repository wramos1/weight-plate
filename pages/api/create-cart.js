import fetch from "node-fetch";
import { postToShopify } from "../../utils/shopify";

export default async function handler(req, res) {
    const data = await postToShopify({
        query: `
        mutation CreateCart {
            cartCreate {
                cart {
                    checkoutUrl
                    id
                }
            }
        }`,
        variables: {}
    });

    if (!data) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'There was a problem creating a cart.' }),
        }
    };

    res.status(200).json({ cartId: data.cartCreate.cart.id, checkoutUrl: data.cartCreate.cart.checkoutUrl })
}