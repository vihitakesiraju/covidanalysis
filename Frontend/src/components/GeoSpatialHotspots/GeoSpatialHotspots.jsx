import React, { Component } from 'react';
// import MapDisplay from '../Maps/MapDisplay'
import ReactMapGL, { Marker, Layer, Source, Popup } from 'react-map-gl';
import covidData from '../../config/Test.json'
class GeoSpatialHotspots extends Component {
    state = {
        viewport: {
            width: 1500,
            height: 600,
            latitude: 37.7577,
            longitude: -122.4376,
            zoom: 7
        },
        parkLayer: {
            id: 'landuse_park',
            type: 'fill',
            source: 'mapbox',
            'source-layer': 'landuse',
            filter: ['==', 'class', 'park']
        },
        clusterLayer: {
            id: 'clusters',
            type: 'circle',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'],
                    '#51bbd6',
                    100,
                    '#f1f075',
                    750,
                    '#f28cb1'
                ],
                'circle-radius': [
                    'step',
                    ['get', 'point_count'],
                    20,
                    100,
                    30,
                    750,
                    40
                ]
            }
        },
        clusterCount: {
            id: 'cluster-count',
            type: 'symbol',
            source: 'earthquakes',
            filter: ['has', 'point_count'],
            layout: {
                'text-field': '{point_count_abbreviated}',
                'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
                'text-size': 12
            }
        },
        unclusteredPoints: {
            id: 'unclustered-point',
            type: 'circle',
            source: 'earthquakes',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#11b4da',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        },
        parkColor: "#8fa",
        clusterSource: {
            type: 'geojson',
            // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
            // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
            data: covidData,
            // 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        },
        showPopup: true,


    }

    togglePopup() {
        let currState = this.state.showPopup;
        this.setState({ showPopup: !currState });
    }

    onUnclusteredClick = (e) => {
        console.log(e);
    }

    render() {
        // console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
        return (
            <div>
                <h2>GeoSpatial Hotspots</h2>
                <ReactMapGL
                    {...this.state.viewport}
                    onViewportChange={(viewport) => this.setState({ viewport })}
                    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                    onClick={this.onUnclusteredClick}

                >
                    <Marker latitude={37.75} longitude={-122.43} offsetLeft={-20} offsetTop={-10}>
                        <div>You are here</div>
                    </Marker>

                    <Layer {...this.state.parkLayer} paint={{ 'fill-color': this.state.parkColor }} />


                    <Source {...this.state.clusterSource}>
                        <Layer  {...this.state.clusterLayer} onClick={() => console.log("Clicked clustered Point")} />
                        <Layer {...this.state.clusterCount} onClick={() => console.log("Clicked count Point")} />
                        <Layer id="unclustered" {...this.state.unclusteredPoints} onClick={() => console.log("Clicked Unclustered Point")} />

                    </Source>

                    {this.state.showPopup && <Popup
                        latitude={37.75}
                        longitude={-122.43}
                        closeButton={true}
                        closeOnClick={false}
                        onClose={() => this.togglePopup()}
                        anchor="top" >
                        <div>You are here</div>
                    </Popup>}

                </ReactMapGL>
            </div>
        );
    }
}

export default GeoSpatialHotspots;