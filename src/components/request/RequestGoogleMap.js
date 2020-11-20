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
    // const { isLoaded, loadError } = useLoadScript({
    //     googleMapsApiKey: "AIzaSyDLB3etEpCoDoo4CLRW9JFCbL0dzY5CaOM",
    //     libraries,
    // })

    let intervalId
    const [currentLat, setCurrentLat] = useState(0);
    const [currentLng, setCurrentLng] = useState(0);


    const locateStyle = {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        background: 'none',
        border: 'none',
        zIndex: '10',
    }
    const mapRef = React.useRef();
    function GetGeoLocation(){
        console.log("GetGeoLocation function")
        // panTo({
        //     lat: 43,
        //     lng: 79,
        // })
        navigator.geolocation.getCurrentPosition((pos) => {
            panTo({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            })
        },(err) => {
            console.log(err)
        })
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
    function TrackingGeoLocation(){
        console.log("TrackingGeoLocation function")
        // panTo({
        //     lat: 43,
        //     lng: 79,
        // })
        intervalId = setInterval(updatePosition,10000)
    }
    function Locate({panTo}){
        return <button style={locateStyle} onClick={GetGeoLocation}><div>locate me</div></button>
    }


    function Tracking({panTo}){
        return <button style={locateStyle} onClick={TrackingGeoLocation}><div>Start sending my location</div></button>
    }

    const onLoad = React.useCallback((map) => {
        // const bounds = new window.google.maps.LatLngBounds();
        // map.fitBounds(bounds);
        // setMap(map)
        mapRef.current = map;
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        // setMap(null)
        clearInterval(intervalId);
    }, [])

    const panTo = React.useCallback(({lat,lng}) =>{
        mapRef.current.panTo({lat, lng});
    },[])


    return (
        // <Tracking panTo={panTo}></Tracking>
        <LoadScript googleMapsApiKey="AIzaSyDLB3etEpCoDoo4CLRW9JFCbL0dzY5CaOM">
            {/*<Locate panTo={panTo}></Locate>*/}
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