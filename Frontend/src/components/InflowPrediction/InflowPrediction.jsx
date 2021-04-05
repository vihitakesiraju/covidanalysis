import React, { Component } from 'react';
import Axios from 'axios';
import routes from '../../config/routeConstants'
import './InflowPrediction.styles.css'
import { Line } from 'react-chartjs-2'
import inflowOptions from '../../../src/config/countiesNames.json'
class InflowPrediction extends Component {
    state = {
        res: []
    }
    componentDidMount() {
        //Dynamically retrieve the list of counties

        // localStorage.setItem('hospitalName', 'Select Specialty Hospital - Camp Hill')
        // // let hospID = localStorage.getItem("hospitalID")
        // Axios.get(`${routes.BACKEND_URL}/inflow/${routes.GET_INFLOW_HOSPITAL}`, {
        //     params: {
        //         hospitalID: localStorage.getItem('hospitalName')
        //     }
        // }).then((res) => {
        //     console.log(res.data)
        //     this.setState({ res: [...res.data] })
        // }).catch((err) => {
        //     console.log(err)
        // })
    }


    selectCounty = (e) => {
        // console.log(e.target.value);
        localStorage.setItem('hospitalName', e.target.value)
        // localStorage.setItem('hospitalName', 'Grant,North Dakota,58533')

        // let hospID = localStorage.getItem("hospitalID")
        Axios.get(`${routes.BACKEND_URL}/inflow/${routes.GET_INFLOW_HOSPITAL}`, {
            params: {
                hospitalID: localStorage.getItem('hospitalName')
            }
        }).then((res) => {
            // console.log(res.data)
            this.setState({ res: res.data }, () => console.log(this.state))
        }).catch((err) => {
            console.log(err)
        })
    }
    render() {
        let renderVar, data, data2, dropdown, labels, values;
        // let key = 0;
        if (this.state.res.dates && this.state.res.dates.length > 0) {
            // console.log("---")
            labels = this.state.res.dates;
            values = this.state.res.cases;

            renderVar = this.state.res.dates.map((date, index) => {
                return <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{date}</td>
                    <td>{values[index]}</td>
                    <td>{this.state.res.deaths[index]}</td>
                </tr>
            })

            //     return <tr>
            //     <th scope="row">{key + 1}</th>
            //     <td>{row.dates}</td>
            //     <td>{row.cases}</td>
            // </tr>

            data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Cases count',
                        data: values,
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 255, 255)',
                        bounds: "data"
                        // pointBackgroundColor: 'rgba(255, 255, 255)',
                        // pointBackgroundColor: 'rgba(255, 255, 255)',
                    },
                ],


            }
            data2 = {
                labels: labels,
                datasets: [
                    {
                        label: 'Deaths count',
                        data: this.state.res.deaths,
                        fill: false,
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgba(255, 255, 255)',
                        bounds: "data"
                        // pointBackgroundColor: 'rgba(255, 255, 255)',
                        // pointBackgroundColor: 'rgba(255, 255, 255)',
                    },
                ],


            }
        }

        dropdown = inflowOptions.map((val) => {
            return <option value={val}>{val}</option>
        })



        const options = {
            // responsive: true,
            // maintainAspectRatio: false,
            scales: {
                pointLabels: {
                    fontColor: "#fff"
                },
                xAxes: [{ gridLines: { color: "rgb(255,255,255,0.7)" } }],
                // yAxes: [{ gridLines: { color: "#fff" } }],
                yAxes: [
                    {
                        gridLines: { color: "rgb(255,255,255,0.7)" },

                    }, {
                        ticks: {
                            beginAtZero: false,
                            min: Math.min(values),
                            max: Math.max(values)
                        }
                    },
                    // {
                    //     fontColor: "#fff",
                    // }
                ],
            },
        }


        return (
            <div className="inflowPage">
                <h3 className="text-light">Hospital Inflow Prediction</h3>
                <div>
                    <select onChange={this.selectCounty} className="form-control-lg">
                        <option value=" ">Select a County</option>
                        {dropdown}
                    </select>
                </div>

                <div className="lineGraph">
                    <Line className="graph" data={data} options={options} />
                    <Line className="graph" data={data2} options={options} />

                </div>
                <div className="predictionTable">
                    <table className="table text-white">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Date</th>
                                <th scope="col">Cases Count</th>
                                <th scope="col">Deaths Count</th>

                            </tr>
                        </thead>
                        <tbody>
                            {renderVar}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default InflowPrediction;