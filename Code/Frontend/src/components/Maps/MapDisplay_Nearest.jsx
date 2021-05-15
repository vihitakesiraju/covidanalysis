//https://dev.to/jessicabetts/how-to-use-google-maps-api-and-react-js-26c2
// https://www.npmjs.com/package/google-maps-react

// API KEY : AIzaSyDEn8HT69AFasbJ2m_uf3G5pfEtdhdkVfg
import React, { Component } from "react";
import { Map, Marker, GoogleApiWrapper, InfoWindow, Circle } from "google-maps-react";

// import Locations from "../../../DummyData/Locations";

import "./MapDisplay.styles.css";
// import axios from "axios";
// import CustomButton from "../CustomButton/CustomButton";
// import routeConstants from '../../../Config/routeConstants'
class MapDisplayNearest extends Component {
    state = {
        currentPosition: {
            latitude: "37.335369402664305",
            longitude: "-121.88319263457828",
        },
        showingInfoWindow: true,
        activeMarker: {},
        selectedPlace: {
            name: "someplacename",
        },
        locations: [
            {
                latitude: "37.315269402664305",
                longitude: "-121.81419263457866",
            },
            {
                latitude: "37.395169402664303",
                longitude: "-121.82319263457844",
            },
            {
                latitude: "37.335369402664302",
                longitude: "-121.83619263457825",
            },
            {
                latitude: "37.375364402664302",
                longitude: "-121.841192634578232",
            }
        ],
    };

    async componentDidMount() {
        // const getPosition = MapGetLocation();
        // this.setState({ currentPosition: { latitude: getPosition.latitude } });
        // console.log(getPosition);
        // console.log(this.state.currentPosition);
        // let d = new Date();
        // console.log(" before axios call " + d.getMilliseconds());
        // let locationdata;
        // console.log("getting locations");

        // await this.setState({ locations: locationdata }, () => {
        //  console.log(this.state.locations);
        // this.state.locations.map((location) => {
        //   console.log(location.ADDRESS.STREET);
        // })
        // console.log("after set state" + d.getMilliseconds());
        // });


        // this.setState({
        //     currentPosition: {
        //         latitude: localStorage.getItem('latitude'),
        //         longitude: localStorage.getItem('longitude'),
        //     }
        // })
    }
    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true,
        });
        localStorage.setItem("locationId", props.locationID);
        localStorage.setItem("locationName", props.name);
    };
    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null,
            });
        }
    };

    onButtonClicked = (e) => {
        console.log("button clicked handler");
    };
    render() {
        // console.log(this.props);

        // const style = {
        //     width: "100%",
        //     height: "100%",
        // };
        // const getPosition = {
        //     latitude: 37.330516,
        //     longitude: -121.885233,
        // };
        //  = MapGetLocation();
        // console.log(getPosition);
        // let d = new Date();
        // console.log("In render" + d.getMilliseconds());
        const coords = {
            lat: 37.335369402664305,
            lng: -121.88319263457828,
        };
        return (

            <div className="mapDisplay">
                <h4>Location</h4>
                <Map
                    google={this.props.google}
                    zoom={11.5}
                    onClick={this.onMapClicked}
                    initialCenter={{
                        lat: 37.330516,
                        lng: -121.885233,
                    }}
                >
                    {this.state.locations.map((location) => (
                        <Marker
                            // label={"string"}
                            // key={location._id}
                            // title={location.ADDRESS.STREET}
                            // locationID={location._id}
                            // name={location.NAME}
                            onClick={this.onMarkerClick}
                            position={{
                                lat: location.latitude,
                                lng: location.longitude,
                            }}
                        />

                    ))}

                    <InfoWindow
                        marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}
                    >
                        <h5>Cluster Name</h5>
                        <p>Cluster Severity</p>
                        {/*                        
                        <a href="./vehicleCatalog" style={{ textDecoration: "none" }}>
                            <button className='btn btn-danger'
                            // style={{ height: "40px", textAlign: "center", textTop: "0px" }}
                            >
                                Go to the Location
              </button>
                        </a> */}
                    </InfoWindow>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyDEn8HT69AFasbJ2m_uf3G5pfEtdhdkVfg",
})(MapDisplayNearest);
