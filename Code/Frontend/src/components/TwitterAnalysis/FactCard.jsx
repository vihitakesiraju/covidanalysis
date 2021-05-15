import React, { Component } from 'react';
// import { Card, Button } from 'react-bootstrap';
import coronaIcon1 from '../../public/assets/Corona1.png'
import coronaIcon2 from '../../public/assets/Corona2.png'

class FactCard extends Component {
    state = {}
    render() {
        return (
            <div>
                <div className="text-center cardContainer">
                    <div className="cardIcon">
                        {
                            this.props.index % 2 === 0 ? <img alt="coronaIcon1" src={coronaIcon1} /> : <img alt="coronaIcon2" src={coronaIcon2} />
                        }
                    </div>
                    <div className="cardText">
                        {this.props.fact}
                    </div>
                </div>
            </div>
        );
    }
}

export default FactCard;