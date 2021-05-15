import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import Pins from './Pins'
import CITIES from './cityData.json'
class MapDisplay extends Component {
    state = {
        viewport: {
            width: 600,
            height: 600,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 13
        },

    }

    shouldComponentUpdate() {
        if (this.props.clat !== null && this.props.clng !== null) {
            this.setState({ viewport: { latitude: this.props.clat, longitude: this.props.clng } })
            return true;
        }
        return false;
    }
    render() {
        // console.log(this.props)
        return (
            <div>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                >
                    <Pins data={CITIES} />

                </ReactMapGL>
            </div>
        );
    }
}

export default MapDisplay;