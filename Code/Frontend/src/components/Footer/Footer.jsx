import React, { Component } from 'react';
import './Footer.styles.css'
class Footer extends Component {
    state = {}
    render() {
        return (
            <div className="footerAdjust">
                <div className="footerBand"></div>

                <div className="footer" style={{ margin: "0px" }}>

                    <div style={{ width: "80%" }} className="footerText">
                        <div className="col1">
                            <h3>CMPE 295 Project</h3>
                            <h4>Prof. Dan Harkey</h4>
                        </div>
                        <div className="col2">
                            <p>Team Members</p>
                            <ul>
                                <li>Harshada Baswaraj Jivane</li>
                                <li>Lakshmi Vihita Kesiraju</li>
                                <li>Summohan Reddy Mallannagari</li>
                                <li>Vamsi Krishna Chakravartula</li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default Footer;