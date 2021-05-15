import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';


class LocationSearch extends Component {
    state = {
        address: ''
    }

    handleChange = address => {
        this.setState({ address });
    };

    handleSelect = address => {
        let add = ""
        geocodeByAddress(address)
            .then(results => {
                // console.log(results);
                add = results[0].formatted_address
                return getLatLng(results[0])
            })
            .then((latLng) => {

                // console.log('Success', latLng)
                this.props.onSearch({ address: add, latLng });
                // localStorage.setItem("lat", latLng.lat);
                // localStorage.setItem("lng", latLng.lng);
                // console.log(latLng.formatted_address)
            })
            .catch(error => console.error('Error in passing address', error));
    };
    render() {
        return (
            <PlacesAutocomplete
                value={this.state.address}
                onChange={this.handleChange}
                onSelect={this.handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map((suggestion) => {

                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                // inline style for demonstration purpose
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        );
    }
}

export default LocationSearch;