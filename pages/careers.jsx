import Image from 'next/image';
import React, { useRef } from 'react';
import Perks from '../images/perks.png';
import Employee from '../images/worker.png'
import Team2 from '../images/twoPersonTeam.jpg';
import Staff from '../images/staff.png';

const Careers = () => {
    const myRef = useRef(null);


    const shiftToContent = () => {
        myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    };

    return (
        <div className='w-full'>
            <div className='w-full h-[80vh] careers flex flex-col justify-center items-center gap-10'>
                <h1 className="title text-white">
                    Where YOU Belong
                </h1>

                <h2 className="title text-white">
                    Find YOUR Weight Plate
                </h2>
                <button onClick={shiftToContent} className="title text-white hover:text-slate-400">
                    &#x21a1;
                </button>
            </div>

            <section className='flex flex-row justify-around py-20 my-20 items-center scroll-mt-24 bg-slate-800 text-white' ref={myRef}>
                <div className='text-center w-3/5 flex flex-col h-full items-center gap-10'>
                    <div>
                        <h1 className="title inline">
                            Join The Weight Plate Team
                        </h1>
                        <h2 className="title -scale-x-100 scale-y-100 inline-block">
                            &#128170;
                        </h2>
                    </div>

                    <div className='text-center'>
                        <button className="formal-button">
                            Join Now
                        </button>
                    </div>
                </div>

                <div className='max-w-xs basis-1/4 gap-5'>
                    <div className='border border-slate-800 rounded-xl h-[450px] relative'>
                        <Image
                            className='rounded-xl'
                            src={Team2}
                            fill
                        />
                    </div>
                </div>
            </section>

            <section className='w-full h-[70vh] flex flex-col gap-15'>
                <div className='w-full'>
                    <h1 className="title">
                        One Big Strong Family
                    </h1>
                </div>

                <div className='w-full flex justify-evenly h-[500px] items-center'>
                    <div className='w-1/2 text-center px-10 flex flex-col justify-evenly items-center h-full'>
                        <div>
                            <h2 className='subTitle'>
                                We believe in growing STRONG together
                            </h2>
                            <h2 className='subTitle'>
                                WORKING HARD and PLAYING HARD!
                            </h2>
                            <h2 className="subTitle">
                                You'll feel right at home
                            </h2>
                        </div>

                        <button className="formal-button my-0 mx-auto">
                            Learn More About Our Culture
                        </button>
                    </div>
                    <div className='relative w-1/2 h-full'>
                        <Image
                            className='rounded-xl border border-slate-800'
                            src={Staff}
                            fill
                            alt='staff'
                        />
                    </div>
                </div>
            </section>

            <section className='w-full h-[40vh] flex bg-slate-800'>
                <div className='relative w-1/2 px-20 h-full'>
                    <Image
                        src={Perks}
                        fill
                        alt='staff'
                    />
                </div>

                <div className="w-full flex flex-col justify-evenly text-white">
                    <h1 className="title text-center">
                        Perks & Benefits
                    </h1>
                    <h1 className="text-xl px-10 text-center">
                        We Make Sure You Are Benefitting In All Ways At Weight Plate
                        In Appreciation For Your Hard Work .
                        You'll receive competitive benefits including:
                    </h1>
                    <h1 className="subTitle text-center">
                        A FREE GYM MEMBERSHIP
                    </h1>
                    <button className="formal-button my-0 mx-auto">
                        Find All Participating Locations
                    </button>
                </div>
            </section>
        </div>
    )
}

export default Careers