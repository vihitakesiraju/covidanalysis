import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import cookie from 'react-cookies';
// import { Redirect } from 'react-router';
// import { login, logout } from '../../../reduxConfig/LoginActions'
// import { connect } from 'react-redux';
// import yelpLogo from '../../../Assets/YelpLogo.svg.png'

//create the Navbar Component
class CommonNavbar extends Component {
    // constructor(props) {
    //     super(props);
    //     this.handleLogout = this.handleLogout.bind(this);
    // }

    render() {



        return (
            <div style={{ fontSize: "17px", color: "black" }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-info">
                    <a className="navbar-brand" href="/"><img src={""} height='40px' /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            {/* <li className="nav-item active">
                                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                            </li> */}
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Customer Sign Up</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Restaurant Sign Up</a>
                            </li> */}
                            <li className="nav-item">
                                <a className="nav-link" href="/">Hotspots</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/nearestHospital">Nearest Hospital</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/patientinflow">Patient In Flow</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/">Twitter Facts</a>
                            </li>


                        </ul>

                        {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form> */}


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