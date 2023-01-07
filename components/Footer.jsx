import React from 'react'
import Logo from '../images/store-logo.png';
import Apple from '../images/app_store.png';
import Google from '../images/google_play.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='border-slate-800 border-t-2 px-12 mt-2 mobile:px-0'>
            <div className='flex flex-row w-full justify-evenly items-center mobile:flex-col'>
                <Image
                    height={70}
                    weight={70}
                    src={Logo}
                    alt='Store Logo'
                />
                <ul className='flex flex-row gap-4 mobile:text-xs mobile:gap-2'>
                    <li className='cursor-pointer hover:text-slate-800'>Terms of Use</li>
                    <li>|</li>
                    <li className='cursor-pointer hover:text-slate-800'>Privacy Policy</li>
                    <li>|</li>
                    <li className='cursor-pointer hover:text-slate-800'>California Privacy Notice</li>
                    <li>|</li>
                    <li className='cursor-pointer hover:text-slate-800'>Do Not Sell My Personal Information</li>
                    <li>|</li>
                    <li className='cursor-pointer hover:text-slate-800'>Cookie Preferences</li>
                </ul>
            </div>
            <div className='flex flex-row w-full justify-center items-center gap-x-5'>
                <Image
                    className='cursor-pointer'
                    height={110}
                    width={160}
                    src={Apple}
                    alt='App Store'
                />
                <Image
                    className='cursor-pointer'
                    height={140}
                    width={172}
                    src={Google}
                    alt='Google Play'
                />
            </div>
            <p className='text-center mobile:text-sm'>
                @2022 Weight Plate's Restaurants, LLC. All trademarks are owned by Weight Plate's USA, LLC.
            </p>
        </div>
    )
}

export default Footer