import React, { Component } from 'react';

import Axios from 'axios';
import routes from '../../config/routeConstants'

import { Line } from 'react-chartjs-2'
import MapDisplayNearest from '../Maps/MapDisplay_Nearest'

import '../NearestHospital/NearestHospital.styles.css'

class NearestHospital extends Component {
    state = {
        res: []
    }
    componentDidMount() {

    }

    handlesubmit = (e) => {
        console.log("inside handle submit")
    }
    render() {
        let renderVar, data;
        if (this.state.res.length > 0) {
            let labels = [];
            let values = [];
            renderVar = this.state.res.map((row, key) => {
                labels.push(row.Date)
                values.push(row.Percentage);
                return <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{row.Date}</td>
                    <td>{row.Percentage}</td>
                </tr>
            })


        }





        return (
            // <div>
            //     <input></input>
            // </div>
            <div className="inflowPage">
                <form className="predictionTable">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label>Enter the Location for hospital suggestion</label>
                            <input type="text" class="form-control" placeholder="Location"></input>
                        </div>


                        <div className="button">
                            <button type="submit" class="btn btn-primary btn-lg" onClick={this.handlesubmit}>submit</button>
                        </div>
                    </div>
                </form>
                <div>

                    <div className="predictionTable">
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderVar}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <h1>Hospitals displayed on a map</h1>
                        <MapDisplayNearest />
                    </div>

                </div>
            </div>
        );
    }
}

export default NearestHospital;