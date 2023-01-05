import React from 'react'
import Logo from '../images/store-logo.png';
import Apple from '../images/app_store.png';
import Google from '../images/google_play.png';
import Image from 'next/image';

const Footer = () => {
    return (
        <div className='border-slate-800 border-t-2 px-12 mt-2'>
            <div className='flex flex-row w-full justify-evenly items-center'>
                <Image
                    height={70}
                    weight={70}
                    src={Logo}
                    alt='Store Logo'
                />
                <ul className='flex flex-row gap-4'>
                    <li>Terms of Use</li>
                    <li>|</li>
                    <li>Privacy Policy</li>
                    <li>|</li>
                    <li>California Privacy Notice</li>
                    <li>|</li>
                    <li>Do Not Sell My Personal Information</li>
                    <li>|</li>
                    <li>Cookie Preferences</li>
                </ul>
            </div>
            <div className='flex flex-row w-full justify-center items-center gap-x-5'>
                <Image
                    height={120}
                    width={170}
                    src={Apple}
                    alt='App Store'
                />
                <Image
                    height={150}
                    width={182}
                    src={Google}
                    alt='Google Play'
                />
            </div>
            <p className='text-center'>
                @2022 Weight Plate's Restaurants, LLC. All trademarks are owned by Weight Plate's USA, LLC.
            </p>
        </div>
    )
}

export default Footer