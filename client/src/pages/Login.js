import React, { Fragment, Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/authActions'

class Login extends Component {

    constructor(props) {
        super(props) 
        this.handleCredentialChange = this.handleCredentialChange.bind(this) 
        this.submitEntry = this.submitEntry.bind(this);

        this.state = {
            userCredentials: {
                email:'',
                password:''
            }  
        }
    }

    handleCredentialChange = (propertyName) => (event) => {
        const { userCredentials } = this.state;
        let updateUserCredentials = {
            ...userCredentials,
            [propertyName]: event.target.value
        };
        this.setState({ userCredentials: updateUserCredentials });
    }

    submitEntry = (e) => {
        e.preventDefault();
        const { userCredentials } = this.state;
        this.props.login(userCredentials);
    };

    render() {
        const { authorized } = this.props;

        if(authorized.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <Fragment>
                <h1>Sign in</h1>
                <form className='form' onSubmit={this.submitEntry}>
                <input  
                    type='email'
                    placeholder ='Email address'
                    name='email'
                    value={this.state.userCredentials.email}
                    onChange={this.handleCredentialChange('email')}
                    required
                    />
                <input  
                    type='password'
                    placeholder ='Password'
                    name='password'
                    value={this.state.userCredentials.password}
                    onChange={this.handleCredentialChange('password')}
                    required
                    />
                    <input type='submit' className='btn btn-primary' value='Login' />
                </form>
            </Fragment>
        )
    }
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
  };

  const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

export default connect(mapStatetoProps, { login })(Login);