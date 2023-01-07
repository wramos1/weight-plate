import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Protein from '../images/protein.jpeg';
import Employee from '../images/worker.png';

const AboutUs = () => {
    return (
        <div className='w-full'>
            <div className='w-full h-[60vh] flex flex-col justify-center items-center bg-slate-800 text-white'>
                <h1 className="title">
                    About Us
                </h1>
                <p>Our Story</p>
            </div>

            <div className="flex my-5 gap-10 w-full h-[65vh] items-center">

                <div className='w-2/3 h-full flex flex-col justify-evenly'>
                    <h2 className="subTitle text-5xl mobile:text-center mobile:text-3xl">
                        We Are Passionate About Our Mission
                    </h2>
                    <p className='text-center text-lg mobile:text-base'>
                        In 2021, the dream to make Weight Plate a reality started.
                        Up to this day, the initial idea was to make the nutrition
                        side of training quick and easier for all. Weight Plate brings
                        all a fast and delicious way to get their protein in that align
                        with their macros and plans.
                    </p>
                </div>

                <div className='w-2/3 h-full relative'>
                    <Image
                        src={Protein}
                        fill
                        alt='protein'
                    />
                </div>

            </div>

            <div className="flex flex-col gap-10 w-full h-[60vh] items-center justify-center bg-slate-800">
                <h2 className="title text-5xl text-white">
                    Commitment To Efficiency
                </h2>
                <p className="text-lg text-white">
                    Dedicated to Helping You Meet Your Goals
                    With Our Recipes
                </p>
                <button className='formal-button'>
                    Learn More
                </button>
            </div>

            <div className="flex gap-10 w-full h-[65vh] items-center justify-around">
                <div className='w-2/3 h-full flex flex-col justify-evenly'>
                    <h2 className="title">
                        Interested in Joining Our Team?
                    </h2>
                    <Link href={'/careers'} className="formal-button my-0 mx-auto">
                        Find Careers Now
                    </Link>
                </div>

                <div className='w-1/2 h-full relative'>
                    <Image
                        src={Employee}
                        fill
                        alt='protein'
                    />
                </div>

            </div>

        </div>
    )
}

export default AboutUs