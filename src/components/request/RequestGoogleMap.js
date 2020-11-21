import React, {Component, useState} from 'react';
import {GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer} from '@react-google-maps/api';
import styled from 'styled-components';
import db, {firestore} from "../../base";
import { useSelector} from "react-redux";
import Axios from "axios";
import PropTypes from 'prop-types'
import "../../App.css"

const center = {
    lat: 43,
    lng: -79,
};

const mapContainerStyle = {
    width: '100%',
    height: '100%'
}
// const libraries = ['places']

//TODO find a fancy map style on snazzymaps
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}


const GOOGLE_API_KEY = "AIzaSyCZBZEfqeZbQkO1c_q7AkeySMN4aAJMO0Y"


const RequestGoogleMap = (props)=>  {

    let intervalId
    const [currentLat, setCurrentLat] = useState(200);
    const [currentLng, setCurrentLng] = useState(200);

    const [targetAddress, setTargetAddress] = useState(null);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [response, setResponse] = useState(null);
    const [travelMode, setTravelMode] = useState('DRIVING');
    if(!targetAddress){
        // const requestRef = firestore.collection("requests")
        // const userRef = requestRef.doc(props.id)
        // userRef.collection('onGoing').doc(originReq.id).onSnapshot(function(doc) {
        //     console.log("Current data: ", doc.data());
        //     doc.data() ? setRequestMange(doc.data()) : setRequestMange(originReq);
        // });

        setTargetAddress('8775 Costa Verde Blvd San Diego CA')
    }

    if(!currentAddress){
        // const requestRef = firestore.collection("requests")
        // const userRef = requestRef.doc(props.id)
        // userRef.collection('onGoing').doc(originReq.id).onSnapshot(function(doc) {
        //     console.log("Current data: ", doc.data());
        //     doc.data() ? setRequestMange(doc.data()) : setRequestMange(originReq);
        // });


        setCurrentAddress( Axios.get("https://maps.googleapis.com/maps/api/geocode/json" +
            "?latlng="+currentLat+","+currentLng+"&key="+GOOGLE_API_KEY))
    }

    // const locateStyle = {
    //     position: 'absolute',
    //     top: '1rem',
    //     right: '1rem',
    //     background: 'none',
    //     border: 'none',
    //     zIndex: '10',
    // }

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

    const checkDriving = ({ target: { checked } }) => {
        checked && setTravelMode('DRIVING')
    }

    const checkBicycling = ({ target: { checked } }) => {
        checked && setTravelMode('BICYCLING')
    }

    const checkTransit = ({ target: { checked } }) => {
        checked && setTravelMode('TRANSIT')
    }

    const checkWalking = ({ target: { checked } }) => {
        checked && setTravelMode('WALKING')
    }

    const directionsCallback = (response) => {
        console.log(response)

        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response)
            } else {
                console.log('response: ', response)
            }
        }
    }

    return (
        <div>
            <div className='d-flex flex-wrap'>
                <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='DRIVING'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={travelMode === 'DRIVING'}
                        onChange={checkDriving}
                    />
                    <label className='custom-control-label' htmlFor='DRIVING'>
                        Driving
                    </label>
                </div>

                <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='BICYCLING'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={travelMode === 'BICYCLING'}
                        onChange={checkBicycling}
                    />
                    <label className='custom-control-label' htmlFor='BICYCLING'>
                        Bicycling
                    </label>
                </div>

                <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='TRANSIT'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={travelMode === 'TRANSIT'}
                        onChange={checkTransit}
                    />
                    <label className='custom-control-label' htmlFor='TRANSIT'>
                        Transit
                    </label>
                </div>

                <div className='form-group custom-control custom-radio mr-4'>
                    <input
                        id='WALKING'
                        className='custom-control-input'
                        name='travelMode'
                        type='radio'
                        checked={travelMode === 'WALKING'}
                        onChange={checkWalking}
                    />
                    <label className='custom-control-label' htmlFor='WALKING'>
                        Walking
                    </label>
                </div>
            </div>
        <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
            <div className="gmnoprint google-map-custom-control-container">
                <div className="gm-style-mtc">
                    <div className="google-map-custom-control" title="Start sending my location">Start sending my location</div>
                </div>
            </div>
            {/*<button style={locateStyle} onClick={TrackingGeoLocation}><div>Start sending my location</div></button>*/}
            <GoogleMap
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={14}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
            >
                {!targetAddress && !currentAddress  && (
                    <DirectionsService
                        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                        options={{
                            destination: targetAddress,
                            origin: currentAddress,
                            travelMode: travelMode,
                        }}
                        callback={directionsCallback}
                    />
                )}

                {this.state.response !== null && (
                    <DirectionsRenderer
                        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
                        options={{
                            directions: response,
                        }}
                    />
                )}

                {/*<Marker position={{lat:currentLat,lng:currentLng}}/>*/}
            </GoogleMap></LoadScript>
        </div>
    )
}

export default React.memo(RequestGoogleMap)