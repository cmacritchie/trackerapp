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
                        <NavLink to="/login">About</NavLink>
                    </li>
                );
            default:
                return (<Fragment>
                            <li>
                                welcome {this.props.authorized.user.name}
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
            <nav>
                <div className="nav-wrapper">
                    <a className="left brand-logo">
                        Tracker
                    </a>
                    <ul className="right">
                            {this.renderContent()}    
                    </ul>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = ({authorized}) => {
    return { authorized }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators({ logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Header);