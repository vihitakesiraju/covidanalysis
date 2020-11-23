import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import Login from './Login/Login';
import CommonNavbar from './Navbar/CommonNavbar';
import InflowPrediction from './InflowPrediction/InflowPrediction'
import NearestHospital from './NearestHospital/NearestHospital';
import TwitterAnalysis from './TwitterAnalysis/TwitterAnalysis'
//Create a Main Component
class Main extends Component {
    render() {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" component={CommonNavbar} />
                <Route path="/twitteranalysis" component={TwitterAnalysis}/> 
                <Route path="/patientinflow" component={InflowPrediction} />
                <Route path="/nearestHospital" component={NearestHospital} />

                {/* <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/delete" component={Delete} />
                <Route path="/create" component={Create} /> */}
            </div>
        )
    }
}
//Export The Main Component
export default Main;