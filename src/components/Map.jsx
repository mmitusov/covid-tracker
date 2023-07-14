import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import "../styles/map.scss"
import { showDataOnMap } from '../utils/showDataOnMap';

const Map = ({casesType, mapCountries, mapCenter, mapZoom}) => {
    return (
        <div className='map'>
            <MapContainer center={mapCenter} zoom={mapZoom} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* Если дефолтные координаты для всего мира, то не показываем маркер */}
                {mapCenter[0] !== 44 && mapCenter[1] !== 10 &&
                    <Marker position={mapCenter}>
                        <Popup>
                            Current country.
                        </Popup>
                    </Marker>
                }

                {/* Отображаем кружочки */}
                {showDataOnMap(mapCountries, casesType)}
                {/* {showDataOnMap(mapCountries, 'recovered')} */}
            </MapContainer>
        </div>
    )
}

export default Map