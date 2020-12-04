import React, {Component, useState} from 'react'
import {
    GoogleMap,
    LoadScript,
    Marker,
    DirectionsService,
    DirectionsRenderer,
} from '@react-google-maps/api'
// import styled from 'styled-components';
import db, {firestore} from '../../base'
// import { useSelector } from "react-redux";
// import Axios from "axios";
// import PropTypes from 'prop-types'
import './../../App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    Container,
    Row,
    Col,
    ButtonGroup,
    Button,
    ToggleButton,
} from 'react-bootstrap'
import firebase from 'firebase'

const center = {
    lat: 32.8755662,
    lng: -117.23232519999999,
}

const mapContainerStyle = {
    width: '100%',
    height: '100%',
}
// const libraries = ['places']

//TODO find a fancy map style on snazzymaps
const options = {
    disableDefaultUI: true,
    zoomControl: true,
}

const GOOGLE_API_KEY = 'AIzaSyCZBZEfqeZbQkO1c_q7AkeySMN4aAJMO0Y'

const RequestGoogleMap = (props) => {
    let intervalId

    const [targetAddress, setTargetAddress] = useState(null)
    const [currentAddress, setCurrentAddress] = useState(null)
    const [response, setResponse] = useState(null)
    const [travelMode, setTravelMode] = useState('DRIVING')

    if (!targetAddress) {
        console.log('props.requestId:', props.requestId)
        firestore.collection('requestPlaza').doc(props.requestId)
            .get()
            .then((doc) => {
                let data = doc.data()
                console.log('addressId: ', data)
                return data
            })
            .then((doc) => {
                console.log()
                return firestore.doc(`/users/${doc.seniorId}/address/${doc.addressID}`).get()
            })
            .then((doc) => {
                let geolocation = doc.data().geolocation
                console.log('geolocation: ', geolocation)
                let geolocationArr = geolocation.split(",")
                const address = {
                    lat: Number(geolocationArr[0]),
                    lng: Number(geolocationArr[1])
                }
                setTargetAddress(address)
            })

    }

    if (!currentAddress) {
        // senior
        if (props.userType === 0) {
            const requestRef = firestore.collection("requestPlaza").doc(props.requestId).onSnapshot((doc) => {
                console.log("Current data: ", doc.data());
                if (doc.exists) {
                    setCurrentAddress(doc.data().volunteerLocation)
                }
            });
        }
    }

// const locateStyle = {
//     position: 'absolute',
//     top: '1rem',
//     right: '1rem',
//     background: 'none',
//     border: 'none',
//     zIndex: '10',
// }

    const mapRef = React.useRef()

    const onLoad = React.useCallback((map) => {
        mapRef.current = map
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        clearInterval(intervalId)
    }, [])

    const panTo = React.useCallback(({lat, lng}) => {
        mapRef.current.panTo({lat, lng})
    }, [])

    function TrackingGeoLocation() {
        console.log('TrackingGeoLocation function')
        intervalId = setInterval(updatePosition, 10000)
    }

    function updatePosition() {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                panTo({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                })
                let geoPoint = new firebase.firestore.GeoPoint(pos.coords.latitude, pos.coords.longitude)
                setCurrentAddress(geoPoint)
                console.log(pos.coords)
                firestore
                    .collection('requestPlaza')
                    .doc(props.requestId)
                    .update({
                            volunteerLocation: geoPoint,
                        })
                    .catch((err) => {
                        console.log(err)
                    })
            },
            (err) => {
                console.log(err)
            },
            {
                enableHighAccuracy: true,
            }
        )
    }

    const checkDriving = ({target: {checked}}) => {
        checked && setTravelMode('DRIVING')
    }

    const checkBicycling = ({target: {checked}}) => {
        checked && setTravelMode('BICYCLING')
    }

    const checkTransit = ({target: {checked}}) => {
        checked && setTravelMode('TRANSIT')
    }

    const checkWalking = ({target: {checked}}) => {
        checked && setTravelMode('WALKING')
    }

    const directionsCallback = (res) => {
        console.log(res)

        if (
            res !== null &&
            (response === null ||
                response.request.travelMode !== res.request.travelMode)
        ) {
            if (res.status === 'OK') {
                setResponse(res)
            } else {
                console.log('response: ', res)
            }
        }
    }

    return (
        <>
            <LoadScript googleMapsApiKey="AIzaSyCZBZEfqeZbQkO1c_q7AkeySMN4aAJMO0Y">
                {/*<button style={locateStyle} onClick={TrackingGeoLocation}><div>Start sending my location</div></button>*/}
                <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={14}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                    options={options}
                >
                    {props.userType === 1 && (
                        <Container>
                            <Row>
                                <Col xs={7}>
                                    <ButtonGroup
                                        className="gmnoprint google-map-custom-control-container"
                                        toggle
                                        aria-label="Basic example"
                                        size="sm"
                                    >
                                        <ToggleButton
                                            className="google-map-custom-control"
                                            type="radio"
                                            name="travelMode"
                                            variant="light"
                                            checked={travelMode === 'DRIVING'}
                                            onChange={checkDriving}
                                        >
                                            Driving
                                        </ToggleButton>
                                        <ToggleButton
                                            className="google-map-custom-control"
                                            type="radio"
                                            name="travelMode"
                                            variant="light"
                                            checked={travelMode === 'BICYCLING'}
                                            onChange={checkBicycling}
                                        >
                                            Bicycling
                                        </ToggleButton>
                                        <ToggleButton
                                            className="google-map-custom-control"
                                            type="radio"
                                            name="travelMode"
                                            variant="light"
                                            checked={travelMode === 'TRANSIT'}
                                            onChange={checkTransit}
                                        >
                                            Transit
                                        </ToggleButton>
                                        <ToggleButton
                                            className="google-map-custom-control"
                                            type="radio"
                                            name="travelMode"
                                            variant="light"
                                            checked={travelMode === 'WALKING'}
                                            onChange={checkWalking}
                                        >
                                            Walking
                                        </ToggleButton>
                                    </ButtonGroup>
                                </Col>
                                <Col xs={3}>
                                    <div className="gmnoprint google-map-custom-control-container">
                                        <div className="gm-style-mtc">
                                            <Button
                                                className="google-map-custom-control"
                                                title="Start sending my location"
                                                variant="light"
                                                size="lg"
                                                onClick={TrackingGeoLocation}
                                            >
                                                Send Location
                                            </Button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    )}

                    {targetAddress && currentAddress && (
                        <DirectionsService
                            options={{
                                destination: targetAddress,
                                origin: currentAddress.latitude + "," + currentAddress.longitude,
                                travelMode: travelMode,
                            }}
                            callback={directionsCallback}
                        />
                    )}

                    {response !== null && (
                        <DirectionsRenderer
                            options={{
                                directions: response,
                            }}
                        />
                    )}

                    {targetAddress && !currentAddress && (<Marker position={{
                        lat: targetAddress.lat, lng: targetAddress.lng
                    }}/>)}
                </GoogleMap>
            </LoadScript>
        </>
    )
}

export default React.memo(RequestGoogleMap)
