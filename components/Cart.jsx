import React, { useEffect, useState } from 'react'
import Image from 'next/image';

const Cart = () => {
    const [cart, setCart] = useState({ id: null, lines: [], estimatedCost: 0, items: 0 });

    const getCart = async () => {
        let localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (localCartData) {
            const existingCart = await fetch(`/api/load-cart?cartId=${localCartData.cartId}`)
                .then((res) => res.json());

            setCart({
                id: localCartData.cartId,
                checkoutUrl: localCartData.checkoutUrl,
                estimatedCost: existingCart.cart.estimatedCost.totalAmount.amount,
                lines: existingCart.cart.lines.edges,
                items: existingCart.cart.totalQuantity
            });

            return;
        }


        localCartData = await fetch('/api/create-cart')
            .then((res) => res.json())
            .catch((err) => console.error(err));

        setCart({
            id: localCartData.cartId,
            checkoutUrl: localCartData.checkoutUrl,
            estimatedCost: null,
            lines: [],
            items: 0
        })

        window.localStorage.setItem(
            'Weight-Plate:cart',
            JSON.stringify(localCartData)
        )

    };

    useEffect(() => {
        getCart();

        const interval = setInterval(() => {
            const state = window.localStorage.getItem('Weight-Plate:cart:status');
            if (state && state === 'dirty') {
                getCart();
                window.localStorage.setItem('Weight-Plate:cart:status', 'clean');
            };
        }, 500)

        return () => {
            clearInterval(interval);
        };
    }, [cart.lines])

    const emptyCart = () => {
        window.localStorage.removeItem('Weight-Plate:cart');
        window.localStorage.setItem('Weight-Plate:cart:status', 'dirty');
    }

    const deleteItems = async (itemId) => {
        if (window.confirm('Are you sure you wish to delete this item?')) {
            const localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));
            if (!localCartData.cartId) {
                console.error('Error loading your cart');
                return;
            }
            const result = await fetch('/api/remove-from-cart', {
                method: 'POST',
                body: JSON.stringify({ cartId: localCartData.cartId, lineIds: itemId })
            })

            if (!result.ok) {
                console.error('There was a problem removing the item to the cart');
            }
        }
    }

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    return (
        <div>
            <h3 className='title'>
                Your Cart
            </h3>
            {cart.lines.length > 0 ? (
                <>
                    <ul>
                        {
                            cart.lines.map(({ node: item }, num) => (
                                <li key={num}>
                                    <p>
                                        {item.quantity} &times; {item.merchandise?.product?.title} {item.merchandise?.title === 'Default Title' ? '' : `- ${item.merchandise?.title}`}
                                    </p>
                                    <button className="formal-button bg-red-400" onClick={() => deleteItems(item.id)}>
                                        Delete
                                    </button>
                                </li>
                            ))
                        }
                        <li className="total">
                            <p>Total: {cart.estimatedCost === 0 ? 'FREE' : `${formattedPrice.format(cart.estimatedCost)}`}</p>
                        </li>
                    </ul>

                    <a href={`${cart.checkoutUrl}`} className="button">
                        Check Out
                    </a>

                    <button className="button" onClick={emptyCart}>
                        Empty Cart
                    </button>
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div >
    )
}

export default Cart