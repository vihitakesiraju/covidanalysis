import React, { Component } from 'react';

import Axios from 'axios';
import routes from '../../config/routeConstants'

import { Line } from 'react-chartjs-2'
import '../NearestHospital/NearestHospital.styles.css'

class NearestHospital extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        // let hospID = localStorage.getItem("hospitalID")
        let hospID = 1;
        Axios.get(`${routes.BACKEND_URL}/inflow/${routes.GET_INFLOW_HOSPITAL}`, {
            params: {
                hospitalID: hospID
            }
        }).then((res) => {
            console.log(res)
            this.setState({ res: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    handlesubmit=(e)=>{
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

            data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Percentage increase',
                        data: values,
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 99, 132, 0.2)',
                    },
                ],
            }
        }




        const options = {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true,
                        },
                    },
                ],
            },
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
                </div>
                
            </div>
          </div>
        );
    }
}

export default NearestHospital;