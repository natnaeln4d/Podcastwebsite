/* eslint-disable no-unused-vars */
import React from 'react';
import { GoogleMap, LoadScript, Marker } from 'react-google-maps';

const Map = () => {
  const mapStyles = {
    height: '400px',
    width: '100%'
  };

  const defaultCenter = {
    lat: 37.7749, 
    lng: -122.4194 
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBqGZKcHosW7hMtKasAW4mN2cD9H7eT6Yw">
      <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={10}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
