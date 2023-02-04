import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import Item from './Item';
import Image from 'next/image';
import CartImg from '../images/cart.png'

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

    const updateCart = async (item, quantity) => {
        const localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (!localCartData.cartId) {
            console.error('Error loading your cart');
            return;
        }

        const result = await fetch('/api/update-cart', {
            method: 'POST',
            body: JSON.stringify({ cartId: localCartData.cartId, lines: [{ id: item.id, quantity }] })
        });

        if (!result.ok) {
            console.error('There was a problem adding the item to the cart');
        }
    }


    const confirmDeletion = (item) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='h-[80vh] w-full flex justify-center items-center top-0 absolute backdrop-blur-sm'>
                        <div className='bg-slate-800/95 border-black border-2 text-white flex flex-col justify-around items-center gap-4 text-center p-8 rounded-lg'>
                            <div>
                                <h1 className="title">
                                    Delete Item
                                </h1>
                                <p>
                                    {`Are you sure you want to delete ${item.quantity} ${item.merchandise?.product?.title}?`}
                                </p>
                            </div>

                            <div className='flex w-full justify-around'>
                                <button onClick={onClose} className='formal-button p-1 rounded-lg text-sm'>
                                    Cancel
                                </button>
                                <button
                                    className='p-1 bg-red-600 hover:bg-red-700 rounded-lg text-sm'
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
        <div className='w-full flex justify-evenly items-center py-[2rem] mobile:flex-col'>
            {cart.lines.length > 0 ? (
                <>
                    <div className='w-1/2 h-full px-10 flex flex-col gap-2'>
                        <h3 className='title'>
                            My Bag
                        </h3>

                        <Link href={'/menu'}>
                            <button className="formal-button p-2">
                                Add More Items
                            </button>
                        </Link>


                        <ul className='w-full h-full flex flex-col'>
                            {
                                cart.lines.map(({ node: item }, num) => (
                                    <Item
                                        key={num}
                                        item={item}
                                        deleteItem={(item) => confirmDeletion(item)}
                                        checkQuantityChange={(item, quantity) => updateCart(item, quantity)}
                                    />
                                ))
                            }
                        </ul>
                    </div>

                    <div className='w-1/2 h-full px-36 lg:px-24 md:px-12 mobile:px-2'>
                        <div className="border-2 shadow-[0px_20px_50px_4px_rgba(0,0,0,0.56)] p-2 pt-20 pb-10 rounded-xl">
                            <h1 className="subTitle font-bold">
                                Order Details
                            </h1>
                            <ul className='text-sm'>
                                {
                                    cart.lines.map(({ node: item }, num) => (
                                        <li key={num} className='w-full flex flex-col my-3'>
                                            <div className='w-full flex justify-between'>
                                                <p className='text-md font-bold'>
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
                                        </li>
                                    ))
                                }
                                <li className="total">
                                    <hr className='h-[10px]' />

                                    <div className='w-full flex justify-between'>
                                        <p>SubTotal:</p>
                                        <p>{cart.estimatedCost === 0 ? 'FREE' : `${formattedPrice.format(cart.estimatedCost)}`}</p>
                                    </div>

                                    <div className='w-full flex justify-between'>
                                        <p>Tax:</p>
                                        <p>{formattedPrice.format(0)}</p>
                                    </div>

                                    <hr className='h-[10px]' />

                                    <div className='w-full flex justify-between'>
                                        <p>Total:</p>
                                        <p>{cart.estimatedCost === 0 ? 'FREE' : `${formattedPrice.format(cart.estimatedCost)}`}</p>
                                    </div>


                                </li>
                            </ul>

                            <div className='w-full flex justify-center gap-4 text-white'>
                                <button className="bg-red-500 hover:bg-red-700 border-black border-2 p-1 rounded-lg text-sm" onClick={emptyCart}>
                                    Empty Cart
                                </button>

                                <Link href={`${cart.checkoutUrl}`}>
                                    <button className="bg-blue-500 hover:bg-blue-700 border-black border-2 p-1 rounded-lg text-sm">
                                        Check Out
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>


                    <ToastContainer />
                </>
            ) : (
                <div className='h-[100vh] flex flex-col justify-center gap-2 items-center'>
                    <Image
                        src={CartImg}
                        width={250}
                        height={250}
                        alt='empty cart'
                    />
                    <p>Your cart is empty</p>
                    <Link href={'/menu'}>
                        <button className='formal-button'>
                            Find Items
                        </button>
                    </Link>
                </div>
            )}
        </div>
    )
}

export default Cart