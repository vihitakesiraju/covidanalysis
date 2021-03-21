import React, { Component } from 'react';
import twitterData from './TwitterData.json'
import { useTable } from 'react-table'
// import 'bootstrap/dist/css/bootstrap.min.css';

import { Card, Button } from 'react-bootstrap';

class TwitterAnalysis extends Component {
    state = {}
    render() {

        let rowList = twitterData.map((row, i) => {
            return (
                <tr style={{ border: "none" }}>
                    <th scope="row">{i}</th>
                    <td><Card className="text-center">
                        <Card.Body>
                            <Card.Title>{row.fact}</Card.Title>
                            {/* <Card.Text>
                                Some Card body content goes here
                            </Card.Text> */}
                            {/* <Button variant="primary">Primary Button</Button> */}
                        </Card.Body>
                        {/* <Card.Footer className="text-muted">Card footer title Goes Here</Card.Footer> */}
                    </Card></td>
                    <td><Card className="text-center">
                        <Card.Body>
                            <Card.Title>{row.false}</Card.Title>
                            {/* <Card.Text>
                                Some Card body content goes here
                            </Card.Text> */}
                            {/* <Button variant="primary">Primary Button</Button> */}
                        </Card.Body>
                        {/* <Card.Footer className="text-muted">Card footer title Goes Here</Card.Footer> */}
                    </Card></td>
                    <td><Card className="text-center">
                        <Card.Body>
                            <Card.Title>{row.falseDate}</Card.Title>
                            {/* <Card.Text>
                                Some Card body content goes here
                            </Card.Text> */}
                            {/* <Button variant="primary">Primary Button</Button> */}
                        </Card.Body>
                        {/* <Card.Footer className="text-muted">Card footer title Goes Here</Card.Footer> */}
                    </Card></td>
                </tr>
            )
        })
        let columns = ["#", "Fact", "False Tweet", "Tweet Date"]
        // const {
        //     getTableProps,
        //     getTableBodyProps,
        //     headerGroups,
        //     rows,
        //     prepareRow,
        // } = useTable({
        //     columns,
        //     twitterData,
        // })

        return (
            <div className="twitterAnalysis">
                <div className="tableContainer" style={{ fontSize: "20px" }}>
                    <table class="table" style={{ border: "none" }}>
                        <thead>
                            <tr>
                                <th scope="col" style={{ width: "5%" }}>#</th>
                                <th scope="col" style={{ width: "40%" }}>Fact</th>
                                <th scope="col" style={{ width: "40%" }}>False Tweet</th>
                                <th scope="col" style={{ width: "15%" }}>Tweet Date</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                rowList
                            }

                        </tbody>
                    </table>


                    {/* <table {...getTableProps()}>
                        <thead>
                            {headerGroups.map(headerGroup => (
                                <tr {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                    ))}
                                </tr>
                            ))}
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row, i) => {
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell => {
                                            // return <td {...cell.getCellProps()}>{cell['Cell']}</td>
                                        })}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table> */}


                </div>
            </div>
        );
    }
}

export default TwitterAnalysis;