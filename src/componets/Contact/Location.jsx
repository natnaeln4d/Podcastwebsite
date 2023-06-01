/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'
export default function Location({ zoomLevel }) {
  
      const location = {
        address: 'Alem Gena,Oromia Region, Ethiopia',
        lat:  9.040453880738829,
        lng: 38.75409071053879,
      }
     
      const LocationPin = ({ text }) => (
        <div className=" text-[1rem]  ">
          <Icon icon={locationIcon}   className="text-[1rem] h-8 w-8 text-red-500" />
          <p className=" text-purple-400 text-[18px]">{text}</p>
        </div>
      )
  return (
    <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBqGZKcHosW7hMtKasAW4mN2cD9H7eT6Yw' }}
        defaultCenter={location}
        defaultZoom={zoomLevel}
      >
        <LocationPin
          lat={location.lat}
          lng={location.lng}
          text={location.address}
        />
      </GoogleMapReact>
  )
}
