import React, { Component } from 'react';
// import MapDisplay from '../Maps/MapDisplay'
import ReactMapGL, { Layer, Source, Popup } from 'react-map-gl';
import covidData from '../../config/clusters.json'
import './GeoSpatialHotspots.styles.css'
class GeoSpatialHotspots extends Component {
    state = {
        viewport: {
            width: "1300px",
            height: "600px",
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
            // source: 'earthquakes',
            filter: ['has', 'point_count'],
            paint: {
                // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
                // with three steps to implement three types of circles:
                //   * Blue, 20px circles when point count is less than 100
                //   * Yellow, 30px circles when point count is between 100 and 750
                //   * Pink, 40px circles when point count is greater than or equal to 750
                'circle-color': [
                    'step',
                    ['get', 'point_count'], '#F87060',
                    100, '#F87060',
                    750, '#F87060'
                ],
                'circle-radius': ['step',
                    ['get', 'point_count'],
                    20, 100, 30, 750, 40]
            }
        },
        clusterCount: {
            id: 'cluster-count',
            type: 'symbol',
            // source: 'earthquakes',
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
            // source: 'earthquakes',
            filter: ['!', ['has', 'point_count']],
            paint: {
                'circle-color': '#F87060',
                'circle-radius': 8,
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff'
            }
        },
        parkColor: "#8fa",
        clusterSource: {
            type: 'geojson',
            data: covidData,
            cluster: true,
            clusterMaxZoom: 14, // Max zoom to cluster points on
            clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        },
        showPopup: true,
        popupLocation: {

        }

    }

    filterLocation(location) {
        console.log(location)
        let res = covidData.features.filter((loc) => {
            let temp = loc.geometry.coordinates
            // console.log(temp);
            if (temp[0].toFixed(1) === location[0].toFixed(1) && temp[1].toFixed(1) === location[1].toFixed(1)) {
                return loc
            }
            return null;
        })
        console.log(res);
        if (res.length > 0) {
            this.setState({ popupLocation: res[0], showPopup: true })
        }
    }

    togglePopup() {
        let currState = this.state.showPopup;
        this.setState({ showPopup: !currState }, () => console.log(this.state.popupLocation));
    }

    onUnclusteredClick = (e) => {
        // console.log(e);
        this.filterLocation(e.lngLat)
    }

    render() {
        // console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN)
        return (
            <div className="hotspots">
                <h2 className="text-white">GeoSpatial Hotspots</h2>
                <div className="mapContainer">
                    <ReactMapGL
                        {...this.state.viewport}
                        onViewportChange={(viewport) => this.setState({ viewport })}
                        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                        onClick={(event) => this.onUnclusteredClick(event)}

                    >
                        {/* <Marker latitude={37.75} longitude={-122.43} offsetLeft={-20} offsetTop={-10}>
                            <div>You are here</div>
                        </Marker> */}

                        <Layer {...this.state.parkLayer} paint={{ 'fill-color': this.state.parkColor }} />


                        <Source {...this.state.clusterSource}
                        >
                            <Layer  {...this.state.clusterLayer} />
                            <Layer {...this.state.clusterCount} />
                            <Layer id="unclustered" {...this.state.unclusteredPoints} />

                        </Source>

                        {this.state.showPopup && this.state.popupLocation.geometry && <Popup
                            latitude={this.state.popupLocation.geometry.coordinates[1]}
                            longitude={this.state.popupLocation.geometry.coordinates[0]}
                            closeButton={true}
                            closeOnClick={false}
                            onClose={() => this.togglePopup()}
                            anchor="top" >
                            <p><b>Days to 10X:</b>{this.state.popupLocation.properties.DaysTo10X}</p>
                            {/* <p><b>Confirmed Cases:</b>{this.state.popupLocation.properties.CumConfirmed}</p> */}
                            {/* <p><b>Deaths:</b>{this.state.popupLocation.properties.CumDeaths}</p> */}
                            <p><b>Current Acceleration:</b>{this.state.popupLocation.properties.CurrentAccel}</p>
                            <p><b>Cluster Center:</b>{this.state.popupLocation.geometry.coordinates[0] + " , " + this.state.popupLocation.geometry.coordinates[1]}</p>
                        </Popup>}

                    </ReactMapGL>
                </div>
            </div>
        );
    }
}

export default GeoSpatialHotspots;