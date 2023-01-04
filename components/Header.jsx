import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../images/store-logo.png'
import Cart from '../images/cart.png'
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
        <nav className='z-50 fixed bg-slate-800 text-white text-xl w-full flex items-center justify-between py-4 px-6'>
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
                    <li className='hover:text-slate-400'>
                        <Link href={'/about-us'}>
                            About Us
                        </Link>
                    </li>

                    <li className='hover:text-slate-400'>
                        <Link href={'/careers'}>
                            Careers
                        </Link>
                    </li>

                    <li className='hover:text-slate-400'>
                        <Link href={'/menu'}>
                            Menu
                        </Link>
                    </li>
                </ul>
            </div>

            <div className='flex flex-row gap-x-3 items-center'>
                <Link href={'/my-bag'} className='flex flex-row gap-x-1'>
                    <p className={items !== 0 ? "bg-black rounded-xl w-5 text-center" : ''}>{items !== 0 ? items : ''}</p>
                    <Image
                        src={Cart}
                        alt="cart"
                        width={30}
                        height={30}
                    />
                </Link>
                <Link href={'/order'}>
                    <button className="button">
                        Order Now
                    </button>
                </Link>
            </div>

        </nav>
    )
}

export default Header