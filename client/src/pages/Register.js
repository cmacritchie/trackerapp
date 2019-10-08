import React, { Fragment, Component } from 'react'
import moment from 'moment'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/authActions'



class Register extends Component {

    constructor(props) {
        super(props) 
        this.handleCredentialChange = this.handleCredentialChange.bind(this) 
        this.submitEntry = this.submitEntry.bind(this);
        this.validation = this.validation.bind(this);

        this.state = {
            passwordError:false,
            passwordLength:false,
            userCredentials: {
                name:'',
                birthdate:moment().format('YYYY-MM-DD'),
                email:'',
                password:'',
                confirmPassword:''
            }  
        }
    }

    handleCredentialChange = (propertyName) => (event) => {
        const { userCredentials } = this.state;
        let updateUserCredentials = {
            ...userCredentials,
            [propertyName]: event.target.value
        };
        this.validation(updateUserCredentials)
        this.setState({ userCredentials: updateUserCredentials });
    }

    validation(userCredentials) {
        let submitFlag = true;
        let validationUpdate = {};
        
        if(userCredentials.password !== userCredentials.confirmPassword){
            submitFlag = false;
            validationUpdate.passwordError = true;
        } else {
            validationUpdate.passwordError = false;
        }

        if(userCredentials.password.length < 7){
            submitFlag = false;
            validationUpdate.passwordLength = true;
        } else {
            validationUpdate.passwordLength = false;
        }
        
        this.setState({
            ...this.state,
            ...validationUpdate
        })

        return submitFlag
    }

    submitEntry = (e) => {
        e.preventDefault();
        
        const { userCredentials } = this.state;
        let submitFlag = this.validation(userCredentials)
        
        if(submitFlag) {
        this.props.register(userCredentials);
        }
        
    };

    render() {
        const { authorized } = this.props;

        if(authorized.isAuthenticated){
            return <Redirect to="/" />
        } else {
            return (
                <Fragment>
                    <h1>Sign up</h1>
                    <form className='form' onSubmit={this.submitEntry}>
                        <input  
                            type='text'
                            placeholder ='Name'
                            name='name'
                            value={this.state.userCredentials.name}
                            onChange={this.handleCredentialChange('name')}
                            required
                            />
                        <input
                            type='date'
                            name='date'
                            value = {moment(this.state.userCredentials.birthdate).format('YYYY-MM-DD')}
                            onChange = {this.handleCredentialChange('birthdate')}
                            required
                            />
                        <input  
                            type='email'
                            placeholder ='Email address'
                            name='email'
                            value={this.state.userCredentials.email}
                            onChange={this.handleCredentialChange('email')}
                            required
                            />
                        {this.state.passwordError && 
                        <p className='red-text'>Your your passwords don't match</p>}
                        {this.state.passwordLength && 
                        <p className='red-text'>Your password must be at least 7 characters long</p>}
                        <input  
                            type='password'
                            placeholder ='password'
                            name='password'
                            value={this.state.userCredentials.password}
                            onChange={this.handleCredentialChange('password')}
                            required
                            />
                        <input  
                            type='password'
                            placeholder ='confirm password'
                            name='confirm password'
                            value={this.state.userCredentials.confirmPassword}
                            onChange={this.handleCredentialChange('confirmPassword')}
                            required
                            /> 
                            <p>be sure to remember your email and password combination!</p>
                            <p>This site is for proof of concept purposes and does not have recover password set up yet</p>
                        <input type="submit" className='btn btn-primary' value='Submit' />
                    </form>
                </Fragment>
            )
        }
    }
}

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

export default connect(mapStatetoProps, { register })(Register);