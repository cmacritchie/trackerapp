import React, { Component, Fragment} from 'react'
import SleepEntry from './SleepEntry';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSleepEntry, updateSleepEntry } from '../actions/sleepActions'

class SleepWrapper extends Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            isLoaded:false,
            error: null,
            sleepItem:{},
            isEditItem:false
        }
    }

    componentDidMount() {
        const { authorized, match } = this.props
        const { params } = match
        
        if(authorized.isAuthenticated) {
            if(Object.keys(params).length > 0) {
                axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`
                axios.get(`/api/sleep/${params.entryId}`)
                .then(res => {
                    this.setState({
                        isLoaded:true,
                        sleepItem: res.data,
                        isEditItem: true
                    })
                })
                .catch(error => {
                    this.setState({
                        isLoaded: true,
                        error,
                        isEditItem:false
                    })
                    }
                )
            } else {
                this.setState({
                    isLoaded:true,
                    isEditItem: false
                })
            }
        }
    
    }

    render() {
        const { isLoaded, isEditItem, sleepItem, error } = this.state;
        const { createSleepEntry, updateSleepEntry, authorized } = this.props
        if(!authorized.isAuthenticated){
        return <Redirect to="/sleep" />
        } else if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if (!isEditItem) {
        return (
            <SleepEntry onSubmit={(item) => createSleepEntry(item) } />
        );
        } else {
            return (
                <SleepEntry onSubmit={(item) => updateSleepEntry(item) }
                                  editItem={sleepItem} />
            )
        }
         
    }
    
}

SleepWrapper.propTypes = {
    createSleepEntry: PropTypes.func.isRequired,
    updateSleepEntry: PropTypes.func.isRequired
};

const SleepEntryView = ({authorized, match}) => {
    if(authorized.loading) {
        return <p>loading</p>
    } else {
        return <SleepWrapperConnect match={match} />
    }
}

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

const SleepWrapperConnect = connect(mapStatetoProps, 
    { createSleepEntry, updateSleepEntry })(SleepWrapper)

export default connect(mapStatetoProps)(SleepEntryView)
