import React, { useState } from 'react'
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "../styles/map.scss"

const Map = () => {
    const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
    const [mapZoom, setMapZoom] = useState(3);

    return (
        <div className='map'>
            <MapContainer center={mapCenter} zoom={mapZoom}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' //Ссылка на разработчиков этого пакета
                />
            </MapContainer>
        </div>
    )
}

export default Map