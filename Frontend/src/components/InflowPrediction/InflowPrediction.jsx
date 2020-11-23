import React, { Component } from 'react';
import Axios from 'axios';
import routes from '../../config/routeConstants'
import './InflowPrediction.styles.css'
import { Line } from 'react-chartjs-2'

class InflowPrediction extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        localStorage.setItem('hospitalName', 'Select Specialty Hospital - Camp Hill')
        // let hospID = localStorage.getItem("hospitalID")
        let hospID = 1;
        Axios.get(`${routes.BACKEND_URL}/inflow/${routes.GET_INFLOW_HOSPITAL}`, {
            params: {
                hospitalID: localStorage.getItem('hospitalName')
            }
        }).then((res) => {
            console.log(res.data)
            this.setState({ res: [...res.data] })
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let renderVar, data, dropdown;
        if (this.state.res.length > 0) {
            console.log("---")
            let labels = [];
            let values = [];
            renderVar = this.state.res.map((row, key) => {
                console.log(row)
                labels.push(row.DATE)
                values.push(row.PREDICTION);
                return <tr>
                    <th scope="row">{key + 1}</th>
                    <td>{row.DATE}</td>
                    <td>{row.PREDICTION}</td>
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
            <div className="inflowPage">
                <h3>Hospital Inflow Prediction</h3>
                <div>
                    {dropdown}
                </div>
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
                <div className="predictionTable">
                    <Line className="predictionTable" data={data} options={options} />
                </div>
            </div>
        );
    }
}

export default InflowPrediction;