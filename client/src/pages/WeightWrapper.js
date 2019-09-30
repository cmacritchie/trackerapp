import React, { Component, Fragment} from 'react'
import WeightEntry from './WeightEntry';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createWeightEntry, updateWeightEntry } from '../actions/weightActions'

class WeightWrapper extends Component {
    
    constructor(props) {
        super(props) 
        this.state = {
            isLoaded:false,
            error: null,
            weightItem:{},
            isEditItem:false
        }
    }

    componentDidMount() {
        const { authorized, match } = this.props
        const { params } = match
        if(authorized.isAuthenticated) {
            if(Object.keys(params).length > 0) {
                axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`
                axios.get(`/api/weight/${params.entryId}`)
                .then(res => {
                    this.setState({
                        isLoaded:true,
                        weightItem: res.data,
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
        const { isLoaded, isEditItem, weightItem, error } = this.state;
        const { createWeightEntry, updateWeightEntry, authorized } = this.props
        if(!authorized.isAuthenticated){
        return <Redirect to="/weight" />
        } else if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if (!isEditItem) {
        return (
            <WeightEntry onSubmit={(item) => createWeightEntry(item) } />
        );
        } else {
            return (
                <WeightEntry onSubmit={(item) => updateWeightEntry(item) }
                                  editItem={weightItem} />
            )
        }
         
    }
    
}

WeightWrapper.propTypes = {
    createWeightEntry: PropTypes.func.isRequired,
    updateWeightEntry: PropTypes.func.isRequired
};

const WeightEntryView = ({authorized, match}) => {
    if(authorized.loading) {
        return <p>loading</p>
    } else {
        return <WeightWrapperConnect match={match} />
    }
}

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

const WeightWrapperConnect = connect(mapStatetoProps, 
    { createWeightEntry, updateWeightEntry })(WeightWrapper)

export default connect(mapStatetoProps)(WeightEntryView)
