import React, { Component } from 'react';
import { Marker, Popup } from 'react-map-gl';


class Pins extends Component {
    state = {
        popupInfo: false,
        city: {

        }
    }

    titleCase(str) {
        return str.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
    }
    setPopupInfo = () => {
        let curr = this.state.popupInfo
        this.setState({ popupInfo: !curr });
        console.log(this.state.popupInfo)
    }
    onClickMarker = (city) => {
        // console.log(city);
        this.setState({
            city: city,
            popupInfo: true
        }, () => console.log(this.state))
    }
    render() {
        const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

        const SIZE = 20;
        const { data } = this.props;

        // console.log(this.props)
        let markers = data.map((city, index) =>
            <Marker key={`marker-${index}`} longitude={city.LONGITUDE} latitude={city.LATITUDE}>
                <svg
                    height={SIZE}
                    viewBox="0 0 24 24"
                    style={{
                        cursor: 'pointer',
                        fill: '#d00',
                        stroke: 'none',
                        transform: `translate(${-SIZE / 2}px,${-SIZE}px)`
                    }}
                    onClick={() => this.onClickMarker(city)}
                >
                    <path d={ICON} />
                </svg>
            </Marker >)
        return (

            <div>
                {markers}
                {
                    this.state.popupInfo && this.state.city && (
                        <Popup
                            tipSize={5}
                            anchor="top"
                            longitude={this.state.city.LONGITUDE}
                            latitude={this.state.city.LATITUDE}
                            closeOnClick={false}
                            onClose={this.setPopupInfo}
                        >
                            <p><b>Name: </b>{this.titleCase(this.state.city.NAME)}</p>
                            <p><b>Address: </b>{this.titleCase(this.state.city.ADDRESS)} </p>
                            <p><b>Telephone: </b>{this.titleCase(this.state.city.TELEPHONE)}</p>
                            <p><b>Type: </b>{this.titleCase(this.state.city.TYPE)}</p>
                            <p><b>County: </b>{this.titleCase(this.state.city.COUNTY)}</p>

                        </Popup>
                    )
                }
            </div>
        );
    }
}

export default Pins;