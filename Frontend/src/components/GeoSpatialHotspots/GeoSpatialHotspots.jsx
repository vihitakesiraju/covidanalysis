import React, { Component } from 'react';
import MapDisplay from '../Maps/MapDisplay'
class GeoSpatialHotspots extends Component {
    state = {}
    render() {
        return (
            <div>
                <h2>GeoSpatial Hotspots</h2>
                <MapDisplay />
            </div>
        );
    }
}

export default GeoSpatialHotspots;