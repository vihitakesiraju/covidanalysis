import React, { Component } from 'react';
import ReactMapGL, { FlyToInterpolator } from 'react-map-gl';
import Pins from './Pins'
// import CITIES from '../../config/Hospitals.json'

import '../NearestHospital/NearestHospital.styles.css'
import './LocationSearch'
import LocationSearch from './LocationSearch';
// import MapDisplay from './MapDisplay';
import axios from 'axios'
import routes from '../../config/routeConstants'

class NearestHospital extends Component {
    state = {
        res: [],
        address: "",
        clat: null,
        clng: null,
        viewport: {
            width: "1300px",
            height: "600px",
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 13,

        },
        hospitalData: null

    }
    setMapCenterOnSearch = (city) => {
        // city.preventDefault();
        console.log(city)
        if (city !== null) {
            this.setState({
                address: city.address,
                clat: city.latLng.lat,
                clng: city.latLng.lng,
            }, () => console.log(this.state))
        }

    }

    handlesubmit = (e) => {
        e.preventDefault();

        axios.get(`${routes.BACKEND_URL}/nearestHospitals${routes.GET_NEAREST_HOSPITALS}`, {
            params: {
                latitude: this.state.clat,
                longitude: this.state.clng,
            }
        })
            .then((res) => {
                console.log(res)
                this.setState({
                    viewport: {
                        latitude: this.state.clat,
                        longitude: this.state.clng,
                        width: 1000,
                        height: 600,
                        zoom: 13,
                        transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
                        transitionDuration: '3000'
                    }
                }, () => console.log("inside handle submit " + this.state))
                this.setState({ hospitalData: res.data })
            }).catch((err) => {
                console.log("Error fetching nearest hospitals");
            })




    }
    render() {
        return (
            // <div>
            //     <input></input>
            // </div>
            <div className="nearestHospital">
                <div className="form-row locationSearch ">
                    <div className="form-group col-md-6 searchBar">
                        <p className="text-white">Enter the Location for hospital suggestion</p>
                        {/* <input type="text" class="form-control" placeholder="Location"></input> */}
                        <LocationSearch onSearch={this.setMapCenterOnSearch} />
                        <p className="text-white">{this.state.address === "" ? "" : "Selected:" + this.state.address}</p>
                    </div>
                    <div className="button searchButton">
                        <button className="btn" style={{ background: "#F87060" }} onClick={this.handlesubmit}>Submit</button>
                    </div>
                </div>
                <div>


                    <div>
                        {/* <h1>Hospitals displayed on a map</h1> */}
                        {/* <MapDisplay clat={this.state.clat} clng={this.state.clng} /> */}

                        <ReactMapGL
                            {...this.state.viewport}
                            onViewportChange={(viewport) => this.setState({ viewport })}
                            // onViewportChange={this.setMapCenterOnSearch}

                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                        >
                            {this.state.hospitalData !== null ? <Pins data={this.state.hospitalData} /> : ""}


                        </ReactMapGL>
                    </div>

                </div>
            </div>
        );
    }
}

export default NearestHospital;