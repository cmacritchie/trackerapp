import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/authActions';

class Header extends Component {

    

    renderContent() {
        const { authorized } = this.props;
        switch(authorized.isAuthenticated) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <NavLink to="/login">Admin</NavLink>
                    </li>
                );
            default:
                return (<Fragment>
                            <li>
                                welcome {this.props.authorized.user.name}
                            </li>
                            <li>
                                <NavLink to="/excercise">excercise</NavLink>
                            </li>
                            <li>
                                <NavLink to="/programming">programming</NavLink>
                            </li>
                            <li>
                                <NavLink to="/sleep">sleep</NavLink>
                            </li>
                            <li>
                                <NavLink to="/weight">weight</NavLink>
                            </li>
                            <li>
                                <a onClick={() => this.props.logout(authorized.token)} href='#!'>
                                    Logout
                                </a>
                            </li>
                        </Fragment>
                    )

        }
    }

    render() {
        console.log(this.props.authorized)
        return (
            <Fragment>
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="left brand-logo">
                        Tracker
                    </a>
                    <ul className="right">
                            {this.renderContent()}    
                    </ul>
                </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
                <li><a href="sass.html">Sass</a></li>
                <li><a href="badges.html">Components</a></li>
                <li><a href="collapsible.html">Javascript</a></li>
                <li><a href="mobile.html">Mobile</a></li>
            </ul>
            </Fragment>
        )
    }
}

const mapStateToProps = ({authorized}) => {
    return { authorized }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);