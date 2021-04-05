import React, { Component } from 'react';
// import { Card, Button } from 'react-bootstrap';
import './Card.styles.css'
import tweetIcon1 from '../../public/assets/Tweet1.png'
import tweetIcon2 from '../../public/assets/Tweet2.png'

class TweetCard extends Component {
    state = {}
    render() {
        return (
            <div>
                <div className="text-center cardContainer">
                    <div className="cardIcon">
                        {
                            this.props.index % 2 === 0 ? <img alt="tweetIcon1" src={tweetIcon1} /> : <img alt="tweetIcon2" src={tweetIcon2} />
                        }
                    </div>
                    <div className="cardText">
                        {this.props.tweet}
                    </div>
                </div>
            </div>
        );
    }
}

export default TweetCard;