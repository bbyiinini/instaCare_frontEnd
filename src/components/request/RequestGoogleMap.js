import React, {Component, useState} from 'react';
import {GoogleMap, LoadScript, useLoadScript, Marker} from '@react-google-maps/api';
import styled from 'styled-components';
import db, {firestore} from "../../base";
import { useSelector} from "react-redux";

const center = {
    lat: 43,
    lng: -79,
};

const mapContainerStyle = {
    width: '100%',
    height: '100%'
}
const libraries = ['places']

//TODO find a fancy map style on snazzymaps
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}


function RequestGoogleMap(props) {

    let intervalId
    const [currentLat, setCurrentLat] = useState(200);
    const [currentLng, setCurrentLng] = useState(200);


    const locateStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        zIndex: '10',
    }

    const mapRef = React.useRef();

    const onLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        clearInterval(intervalId);
    }, [])

    const panTo = React.useCallback(({lat,lng}) =>{
        mapRef.current.panTo({lat, lng});
    },[])

    function Tracking({panTo}){
        return <button style={locateStyle} onClick={TrackingGeoLocation}><div>Start sending my location</div></button>
    }
    function TrackingGeoLocation(){
        console.log("TrackingGeoLocation function")
        intervalId = setInterval(updatePosition,10000)
    }

    function updatePosition() {
        navigator.geolocation.getCurrentPosition((pos) => {
            panTo({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            })
            setCurrentLat(pos.coords.latitude);
            setCurrentLng(pos.coords.longitude);
            // console.log(pos.coords)
            firestore.collection('mapApi').doc(props.id).set({
                volunteerLat:pos.coords.latitude,
                volunteerlng:pos.coords.longitude,
            }).then((res)=>{
                console.log(res)
            }).catch((err)=>{console.log(err)})
        },(err) => {
            console.log(err)
        },{
            enableHighAccuracy: true,
        })
    }

    return (
        <LoadScript googleMapsApiKey="AIzaSyCZBZEfqeZbQkO1c_q7AkeySMN4aAJMO0Y">
            <Tracking panTo={panTo}></Tracking>
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >
                <Marker position={{lat:currentLat,lng:currentLng}}/>
            </GoogleMap></LoadScript>
    )
}

export default React.memo(RequestGoogleMap)