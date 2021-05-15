import React, { Component } from 'react';
// import twitterData from './TwitterData.json'
import TweetCard from './TweetCard'
import FactCard from './FactCard'
import './TwitterAnalysis.styles.css'
import Axios from 'axios';
import routeConstants from '../../config/routeConstants';
// import 'bootstrap/dist/css/bootstrap.min.css';


class TwitterAnalysis extends Component {
    state = {
        rows: [],
        loading: false,
        page: 3,
        prevY: 0,
        limit: 3,
        currPage: 3,
        total: 0,
        total_pages: 0,
        pre_page: 0,

    }
    componentDidMount() {
        this.getTweets(this.state.page)

        var options = {
            root: null,
            rootMargin: "0px",
            threshold: 1.0
        };

        this.observer = new IntersectionObserver(
            this.handleObserver.bind(this),
            options
        );
        this.observer.observe(this.loadingRef);
    }

    handleObserver(entities, observer) {
        const y = entities[0].boundingClientRect.y;
        // console.log(entities[0]);
        if (this.state.prevY > y) {
            // const lastPhoto = this.state.rows[this.state.rows.length - 1];
            // const curPage = lastPhoto.albumId;
            let currPage = this.state.page;

            this.setState({ page: currPage + 1 }, () => this.getTweets(currPage));

        }
        this.setState({ prevY: y });
    }

    getTweets(page) {
        this.setState({ loading: true });
        Axios.get(`${routeConstants.BACKEND_URL}/twitter/${routeConstants.GET_TWEETS_PAGINATED}`, {
            params: {
                page: this.state.page,
                limit: this.state.limit
            }
        })
            .then(res => {
                console.log(res.data)
                this.setState({ rows: [...this.state.rows, ...res.data.data], loading: false })
                // this.setState({  });
            });
    }

    render() {

        let rowList = this.state.rows.map((row, i) => {
            console.log(row)

            return (
                < tr style={{ border: "none", color: "black" }
                }>

                    <td className="tdTable"><FactCard fact={row.Facts} index={i} /></td>
                    <td className="tdTable"><TweetCard tweet={row.Tweets} index={i} /></td>
                </tr >
            )
        })
        // let columns = ["#", "Fact", "False Tweet", "Tweet Date"]


        const loadingCSS = {
            height: "100px",
            margin: "30px"
        };
        const loadingTextCSS = { display: this.state.loading ? "block" : "none", color: "white", alignContent: "center" };


        // let endPages = <h5 style={{ color: "white" }} >End of Results</h5>
        return (
            <div className="twitterAnalysis" >
                <div className="tableContainer" style={{ fontSize: "20px" }}>
                    <table class="table " style={{ border: "none" }}>
                        <thead>
                            <tr>
                                {/* <th scope="col" style={{ width: "5%" }}>#</th> */}
                                <th scope="col" style={{ width: "40%" }}>Fact</th>
                                <th scope="col" style={{ width: "40%" }}>Tweet</th>
                                {/* <th scope="col" style={{ width: "15%" }}>Tweet Date</th> */}
                            </tr>
                        </thead>
                        <tbody className="twitterTableBody">
                            {rowList}
                        </tbody>
                    </table>
                    <div
                        ref={loadingRef => (this.loadingRef = loadingRef)}
                        style={loadingCSS}
                    >
                        <span style={loadingTextCSS}>Loading...</span>
                    </div>
                    {/* {this.state.total_pages < this.state.page ? endPages : ""} */}

                </div>

            </div>
        );
    }
}

export default TwitterAnalysis;