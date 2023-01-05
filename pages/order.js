import React, { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import Map from '../components/Map';
import { Markers } from '../markersData';
import Link from 'next/link';

const Order = () => {
    const [selectedMarker, setSelectedMarker] = useState("");
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        setMarkers(Markers)
    }, [])


    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
    });

    const selectMarker = (marker) => {
        setSelectedMarker(marker);
        const index = markers.indexOf(marker);
        markers.unshift(markers.splice(index, 1)[0]);
        setMarkers(markers)
    }

    const listOutMarkers = () => {
        if (markers)
            return markers.map((marker) => {
                return (
                    <div key={marker.id} className={`flex flex-col gap-1 w-full h-full ${selectedMarker.id === marker.id ? 'border border-white' : ''}`}>
                        <h1 className='text-2xl'>Weight Plate #{marker.id}</h1>
                        <p className='font-medium'>{marker.location}</p>
                        <h2>9:00am-10:00pm</h2>
                        <Link href={'/menu'}>
                            <button className='formal-button w-full p-1'>
                                Order
                            </button>
                        </Link>
                    </div>
                )
            })
    }

    {
        return !isLoaded ?
            (
                <div>Loading...</div>
            ) : (
                <div className='w-full h-screen flex justify-between pt-[1rem]'>

                    <div className='flex flex-col w-1/3 gap-2 h-full bg-slate-800 text-white'>
                        <h1 className='subTitle text-2xl font-bold text-center z-20'>Find your local Weight-Plate</h1>
                        <div className='h-1/2 flex flex-col gap-5'>
                            {listOutMarkers()}
                        </div>
                    </div>

                    <Map selectMarker={selectMarker} />
                </div>
            )
    }
}
export default Order