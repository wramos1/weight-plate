import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../images/store-logo.png'
import Cart from '../images/cart.png'
import { useEffect, useState } from 'react'

const Header = () => {
    const [items, setItems] = useState(0)
    const [headerClicked, setHeaderClicked] = useState(false);

    const getNumberOfItems = async () => {
        let localCartData = JSON.parse(window.localStorage.getItem('Weight-Plate:cart'));

        if (localCartData) {
            const existingCart = await fetch(`/api/load-cart?cartId=${localCartData.cartId}`)
                .then((res) => res.json());
            if (existingCart.cart === null) {
                window.localStorage.clear();
            }
            setItems(existingCart.cart.totalQuantity);
        }
        return;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            getNumberOfItems()
        }, 500)

        tabSelecting();

        return () => {
            clearInterval(interval);
        };
    }, []);

    const tabSelecting = () => {
        const tabs = document.getElementsByClassName('nav-link');
        if (window.innerWidth < 768) {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i].addEventListener('click', () => {
                    closeSideNav();
                })
            };
        }
    }

    const closeSideNav = () => {
        document.querySelector('.main-nav').classList.remove('mobile', 'appear');
        setHeaderClicked(false)
    }

    const hamburgerClicked = () => {
        setHeaderClicked(!headerClicked)
        document.querySelector('.main-nav').classList.toggle('appear');
        document.querySelector('.main-nav').classList.toggle('mobile');
    }

    return (
        <nav className='z-50 fixed bg-slate-800 text-white text-xl w-full flex items-center justify-between py-4 px-6'>
            <div className='w-1/3'>
                <Link href='/'>
                    <Image
                        height={95}
                        weight={95}
                        src={Logo}
                        alt='Store Logo'
                    />
                </Link>
            </div>

            <div className="main-nav w-1/3 flex items-center transition-all mobile:h-4/5 mobile:bg-slate-800 mobile:top-[127px] mobile:justify-center mobile:fixed mobile:-left-full mobile:flex mobile:flex-col mobile:w-full mobile:z-20">
                <div className='w-full mobile:flex mobile:justify-center mobile:h-full mobile:text-center'>
                    <ul className='flex item-center justify-between flex-row mobile:flex-col mobile:justify-start mobile:gap-[20%]'>
                        <li className='hover:text-slate-400 nav-link'>
                            <Link href={'/menu'}>
                                Menu
                            </Link>
                        </li>

                        <li className='hover:text-slate-400 nav-link'>
                            <Link href={'/about-us'}>
                                About Us
                            </Link>
                        </li>

                        <li className='hover:text-slate-400 nav-link'>
                            <Link href={'/careers'}>
                                Careers
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            <div className='w-1/3 flex items-center justify-end mobile:justify-between mobile:w-[48%]'>
                <div className='flex justify-end gap-x-3 items-center'>
                    <Link href={'/my-bag'} onClick={closeSideNav} className='flex flex-row gap-x-1'>
                        <p className={items !== 0 ? "bg-black rounded-xl w-5 text-center" : ''}>{items !== 0 ? items : ''}</p>
                        <Image
                            src={Cart}
                            alt="cart"
                            width={30}
                            height={30}
                        />
                    </Link>

                    <Link href={'/order'} onClick={closeSideNav}>
                        <button className="formal-button rounded-lg">
                            Order Now
                        </button>
                    </Link>
                </div>


                <div className='hamburger hidden mobile:block' onClick={hamburgerClicked}>
                    <button className="relative group">
                        <div className={`relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 ring-opacity-30 duration-200 shadow-md ${headerClicked ? 'ring-4' : ''}`}>
                            <div className={`flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-500 origin-center overflow-hidden ${headerClicked ? 'rotate-180' : ''}`}>
                                <div className={`bg-white h-[2px] w-7 transform transition-all duration-500 -translate-x-1 ${headerClicked ? '-rotate-45' : ''}`}></div>
                                <div className="bg-white h-[2px] w-7 rounded transform transition-all duration-500 "></div>
                                <div className={`bg-white h-[2px] w-7 transform transition-all duration-500 -translate-x-1 ${headerClicked ? 'rotate-45' : ''}`}></div>
                            </div>
                        </div>
                    </button>
                </div>
            </div>

        </nav>
    )
}

export default Header