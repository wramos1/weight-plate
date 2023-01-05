import React, { useEffect, useState } from 'react'
import { GoogleMap, MarkerF, InfoWindowF } from '@react-google-maps/api'
import { Markers } from '../markersData'
import Link from 'next/link';

const Map = ({ selectMarker }) => {
    const [selectedMarker, setSelectedMarker] = useState("");
    const [map, setMap] = useState('');
    const [zoom, setZoom] = useState(11)

    const goToMarker = (marker) => {
        selectMarker(marker);
        setSelectedMarker(marker);
    }

    return (
        <GoogleMap zoom={zoom} center={{ lat: 34.130752, lng: -118.383484 }} onLoad={(map) => setMap(map)} mapContainerClassName='map-container'>
            {Markers.map((marker) => {
                return (
                    <MarkerF
                        key={marker.id}
                        position={marker.position}
                        onClick={() => goToMarker(marker)}
                    >

                    </MarkerF>
                )
            })}
            {selectedMarker &&
                <InfoWindowF position={{ lat: selectedMarker.infoWindowPosition.lat, lng: selectedMarker.infoWindowPosition.lng }} onCloseClick={() => setSelectedMarker("")}>
                    <div className='text-black flex flex-col'>
                        <div>
                            <h1 className='text-lg font-black'>Weight Plate #{selectedMarker.id}</h1>
                            <p className='text-slate-800 font-medium'>{selectedMarker.location}</p>
                            <h2>9:00am-10:00pm</h2>
                        </div>

                        <hr className='text-black my-2 border-1 border-black' />

                        <div className='flex flex-row gap-5'>
                            <p>(570)-904-5026</p>
                            <Link href={'/menu'}>
                                <button className='border border-1 px-2 bg-primary-color text-white font-bold'>Begin Order</button>
                            </Link>
                        </div>


                    </div>
                </InfoWindowF>
            }
        </GoogleMap>
    )
}

export default Map