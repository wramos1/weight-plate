import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Logo from '../images/store-logo.png'

const Header = () => {
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
                    <li>About Us</li>
                    <li>Careers</li>
                    <li>Menu</li>
                </ul>
            </div>

            <div>
                <button>Order Now</button>
            </div>

        </nav>
    )
}

export default Header