import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../images/store-logo.png'
import { useEffect, useState } from 'react'

const Header = () => {
    const [items, setItems] = useState(0)

    const getNumberOfItems = async () => {
        let localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (localCartData) {
            const existingCart = await fetch(`/api/load-cart?cartId=${localCartData.cartId}`)
                .then((res) => res.json());
            setItems(existingCart.cart.totalQuantity);
        }
        return;
    }

    useEffect(() => {

        const interval = setInterval(() => {
            getNumberOfItems()
        }, 500)

        return () => {
            clearInterval(interval);
        };
    }, [])

    return (
        <nav className='bg-slate-800 w-full flex items-center justify-between border-b-2 border-gray-100 py-4 px-6'>
            <div>
                <Link href={'/'}>
                    <Image
                        height={95}
                        weight={95}
                        src={Logo}
                        alt='Store Logo'
                    />
                </Link>
            </div>

            <div className='w-1/2'>
                <ul className='flex item-center justify-evenly flex-row'>
                    <li>
                        <Link href={'/about-us'}>
                            About Us
                        </Link>
                    </li>

                    <li>
                        <Link href={'/careers'}>
                            Careers
                        </Link>
                    </li>

                    <li>
                        <Link href={'/menu'}>
                            Menu
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex flex-row gap-x-3'>
                <Link href={'/checkout'} className='flex flex-row gap-x-1'>
                    <p className={items !== 0 ? "bg-black rounded-xl w-5 text-center" : ''}>{items !== 0 ? items : ''}</p>
                    <Image
                        src="https://www.freeiconspng.com/thumbs/cart-icon/basket-cart-icon-27.png"
                        alt=""
                        width={25}
                        height={25}
                    />
                </Link>
                <Link href={'/order'}>
                    Order Now
                </Link>
            </div>

        </nav>
    )
}

export default Header