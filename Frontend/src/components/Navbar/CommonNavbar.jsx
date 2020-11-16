import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
// import { login, logout } from '../../../reduxConfig/LoginActions'
// import { connect } from 'react-redux';
import yelpLogo from '../../../Assets/YelpLogo.svg.png'

//create the Navbar Component
class CommonNavbar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleLogout = this.handleLogout.bind(this);
    // }

    render() {



        return (
            <div>

                <nav className="navbar navbar-expand-lg navbar-light bg-danger">
                    <a className="navbar-brand" href="/"><img src={yelpLogo} alt="yelpLogo" height='40px' /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Customer Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Restaurant Sign Up</a>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="/restaurant/events/all">Events</a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Join Us!
                                  </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="/customer/signup">Customer</a>
                                    <a className="dropdown-item" href="/restaurant/signup">Restaurant</a>

                                </div>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
                            </li> */}
                        </ul>

                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}
                        <a className="nav-link" style={{ color: "black" }} href="/login">Login <span className="sr-only">(current)</span></a>

                    </div>
                </nav>


            </div>
        )
    }
}


// const mapStateToProps = (state) => {
//     return {
//         loggedIn: state.loginReducer.loggedIn,

//     };
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // counterIncrement: (counter) => dispatch(counterIncrement(counter))
//         login: (loggedIn) => dispatch(login(loggedIn)),
//         logout: (loggedIn) => dispatch(logout(loggedIn)),

//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(CommonNavbar);

export default CommonNavbar;