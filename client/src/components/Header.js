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
    <Navbar className="blue" brand={<NavLink to="/">Tracker</NavLink>}  alignLinks="right">
        {
            authorized.isAuthenticated ? 
            <NavItem>{authorized.user.name}</NavItem>
            :
            <NavItem>Guest</NavItem>
        }
        <NavLink className="sidenav-close" to="/">Home</NavLink>
        <NavLink className="sidenav-close" to="/programming">Programming</NavLink>
        <NavLink className="sidenav-close" to="/sleep">Sleep</NavLink>
        <NavLink className="sidenav-close" to="/weight">Weight</NavLink>
        <NavLink className="sidenav-close" to="/exercise">Exercise</NavLink>
        {this.renderContent()}
    </Navbar>
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