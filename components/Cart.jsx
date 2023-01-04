import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import Item from './Item';

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

    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    });

    const deleteItems = async (itemId) => {
        const localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));
        if (!localCartData.cartId) {
            console.error('Error loading your cart');
            return;
        };

        const result = await fetch('/api/remove-from-cart', {
            method: 'POST',
            body: JSON.stringify({ cartId: localCartData.cartId, lineIds: itemId })
        });

        if (!result.ok) {
            console.error('There was a problem removing the item to the cart');
        };
    };


    const confirmDeletion = (item) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className=''>
                        <div>
                            <div>
                                <h1 className="title">
                                    Delete Item
                                </h1>
                                <p>
                                    {`Are you sure you want to delete ${item.quantity} ${item.merchandise?.product?.title}`}
                                </p>
                            </div>

                            <div>
                                <button onClick={onClose}>
                                    Cancel
                                </button>
                                <button
                                    onClick={
                                        () => {
                                            deleteItems(item.id)
                                                .then(() => {
                                                    toast.success(`${item.quantity} ${item.merchandise?.product?.title} ${item.merchandise?.title === 'Default Title' ? '' : `- ${item.merchandise?.title}`} deleted from your cart`);
                                                })
                                                .catch(() => {
                                                    toast.error(`Failed to delete ${item.quantity} ${item.merchandise?.product?.title} ${item.merchandise?.title === 'Default Title' ? '' : `- ${item.merchandise?.title}`} from your cart`)
                                                })
                                                .finally(() => {
                                                    onClose();
                                                })
                                        }
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    };


    return (
        <div className='h-[75vh] w-full flex justify-evenly items-center'>
            {cart.lines.length > 0 ? (
                <>
                    <div className='w-1/2 border border-green-500 h-full px-10'>
                        <h3 className='title'>
                            My Bag
                        </h3>

                        <Link href={'/menu'}>
                            <button className="formal-button p-2">
                                Add More Items
                            </button>
                        </Link>


                        <ul className='mt-10 w-full flex flex-col gap-4'>
                            {
                                cart.lines.map(({ node: item }, num) => (
                                    <Item
                                        key={num}
                                        item={item}
                                        deleteItem={(item) => confirmDeletion(item)}
                                    />
                                ))
                            }
                        </ul>
                    </div>

                    <div className='w-1/2 border border-red-500'>
                        <ul>
                            {
                                cart.lines.map(({ node: item }, num) => (
                                    <li key={num} className='w-full flex flex-col my-3'>
                                        <div className='w-full flex justify-between'>
                                            <p>
                                                {item.merchandise?.product?.title}
                                            </p>
                                            <p>
                                                {formattedPrice.format(item.estimatedCost?.totalAmount?.amount)}
                                            </p>
                                        </div>

                                        <div className='w-full flex justify-between'>
                                            <p>{item.merchandise?.title === 'Default Title' ? 'Original' : `${item.merchandise?.title}`}</p>
                                            <p>Qty: {item.quantity}</p>
                                        </div>
                                        <button className="formal-button p-1 mx-auto my-0" onClick={() => confirmDeletion(item)}>
                                            Delete
                                        </button>
                                    </li>
                                ))
                            }
                            <li className="total">
                                <p>Total: {cart.estimatedCost === 0 ? 'FREE' : `${formattedPrice.format(cart.estimatedCost)}`}</p>
                            </li>
                        </ul>

                        <div>
                            <Link href={`${cart.checkoutUrl}`} className="button">
                                Check Out
                            </Link>

                            <button className="button" onClick={emptyCart}>
                                Empty Cart
                            </button>
                        </div>
                    </div>


                    <ToastContainer />
                </>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    )
}

export default Cart