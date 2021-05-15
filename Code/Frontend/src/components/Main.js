import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import Login from './Login/Login';
import CommonNavbar from './Navbar/CommonNavbar';
import InflowPrediction from './InflowPrediction/InflowPrediction'
import NearestHospital from './NearestHospital/NearestHospital';
import TwitterAnalysis from './TwitterAnalysis/TwitterAnalysis'
import GeoSpatialHotspots from './GeoSpatialHotspots/GeoSpatialHotspots';
// import GeoSpatialHotspotsJS from './GeoSpatialHotspots/GeoSpatialHotspotsJS';
import Footer from './Footer/Footer';
import LandingPage from './LandingPage/LandingPage';

//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "#102542" }}>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={CommonNavbar} />
                <Route exact path="/" component={LandingPage} />

                <Route exact path="/twitteranalysis" component={TwitterAnalysis} />
                <Route exact path="/patientinflow" component={InflowPrediction} />
                <Route exact path="/nearestHospital" component={NearestHospital} />
                {/* <Route path="/geospatialHotspots" component={GeoSpatialHotspotsJS} /> */}
                <Route exact path="/geospatialHotspots" component={GeoSpatialHotspots} />

                {/* <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/delete" component={Delete} />
                <Route path="/create" component={Create} /> */}
                <Route path="/" component={Footer} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;