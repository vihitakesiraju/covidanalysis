import React, { Component } from 'react';
// import MapDisplay from '../Maps/MapDisplay'
// import ReactMapGL, { Marker, Layer, Source, Popup } from 'react-map-gl';
// import covidData from '../../config/Test.json'

import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker';

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

class GeoSpatialHotspotsJS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lng: -70.9,
            lat: 42.35,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }
    componentDidMount() {
        const { lng, lat, zoom } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });
    }
    render() {

        return (
            <div>
                <h2>GeoSpatial Hotspots</h2>
                <div ref={this.mapContainer} className="map-container" />

            </div>
        );
    }
}

export default GeoSpatialHotspotsJS;