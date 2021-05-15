import React, { Component } from 'react';
// import bgImage from '../../../Assets/BackgroundImages/LandingPage.jpg'
import sjsuLogo from '../../../src/public/assets/SJSU.png'
import './LandingPage.styles.css'
class LandingPage extends Component {
    state = {}
    render() {
        return (
            <div className="landingPage">
                {/* <img src={bgImage} class="img-fluid" alt="Responsive image" /> */}
                <div className=" jumboImage jumbotron-fluid">
                    <div className="container2">

                        <img src={sjsuLogo} className="sjsuLogo" alt="sjsuLogo" />

                        <div className="display-2 text-light">COVID-19 Analysis</div>
                    </div>

                </div>
                <div className="buttonGroup">
                    <a href="/geospatialHotspots"><button className="homeButton"> Geospatial Hotspots</button></a>
                    <a href='/nearestHospital'>    <button className="homeButton">Nearest Hospital</button></a>
                    <a href='/patientinflow'>   <button className="homeButton">Case Predictions</button></a>
                    <a href='/twitteranalysis'>   <button className="homeButton">Tweets Analysis</button></a>
                </div>
            </div>
        );
    }
}

export default LandingPage;