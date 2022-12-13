import React, { useEffect, useState } from 'react'

const Cart = () => {
    const [cart, setCart] = useState({ id: null, lines: [] });
    const [open, setOpen] = useState(false);

    const getCart = async () => {
        let localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (localCartData) {
            setCart({
                id: localCartData.cartId,
                checkoutUrl: localCartData.checkoutUrl,
                estimatedCost: null,
                lines: []
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
            lines: []
        })

        window.localStorage.setItem(
            'Weight-Plate:cart',
            JSON.stringify(localCartData)
        )

    };

    useEffect(() => {
        getCart();
    }, [])


    let cost = Number(cart?.estimatedCost?.totalAmount?.amount || 0);

    return (
        <div>
            Cart
        </div>
    )
}

export default Cart