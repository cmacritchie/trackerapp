import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { Navbar, Dropdown, Divider, NavItem } from "react-materialize";

class Header extends Component {

    

    renderContent() {
        const { authorized } = this.props;
        switch(authorized.isAuthenticated) {
            case null:
                return;
            case false:
                return (
                        <Dropdown trigger={<a>Account</a>}>
                            <NavLink className="sidenav-close" to="/login">Login</NavLink>
                            <NavLink className="sidenav-close" to="/register">Register</NavLink>
                        </Dropdown>
                    );
            default:
                return (     
                        <NavItem onClick={() => this.props.logout(authorized.token)} className="sidenav-close">
                            Logout
                        </NavItem>
                    )

        }
    }

    render() {
        const { authorized } = this.props;
        return (
<Fragment>
            <Navbar className="blue" brand={<a>Tracker</a>}  alignLinks="right">
                {authorized.isAuthenticated && <NavItem>Welcome {authorized.user.name}</NavItem>}
                <NavLink className="sidenav-close" to="/programming">programming</NavLink>
                <NavLink className="sidenav-close" to="/sleep">sleep</NavLink>
                <NavLink className="sidenav-close" to="/weight">weight</NavLink>
                <NavLink className="sidenav-close" to="/exercise">exercise</NavLink>
                {this.renderContent()}
            </Navbar>
           {!authorized.isAuthenticated && <p>Craig's Entries</p> } 
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