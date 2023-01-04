import React, { useEffect, useState } from 'react'
import { useLoadScript } from '@react-google-maps/api'
import Map from '../components/Map';
import { Markers } from '../markersData';

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
                    <div key={marker.id} className={`py-8 border border-slate-800 w-full ${selectedMarker.id === marker.id ? 'shadow-[0_15px_60px_5px_rgba(0,0,0,0.3)] shadow-slate-800' : ''}`}>
                        <h1 className='text-lg text-primary-color'>Weight Plate #{marker.id}</h1>
                        <p className='font-medium'>{marker.location}</p>
                        <h2>9:00am-10:00pm</h2>
                        <button>Order</button>
                    </div>
                )
            })
    }

    {
        return !isLoaded ?
            (
                <div>Loading...</div>
            ) : (
                <div className='w-full h-screen flex justify-between'>
                    <div className='flex flex-col w-1/2'>
                        <h1 className='text-2xl font-bold'>Find your local Weight-Plate</h1>
                        {listOutMarkers()}
                    </div>
                    <Map selectMarker={selectMarker} />
                </div>
            )
    }
}
export default Order