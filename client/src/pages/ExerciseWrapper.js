import React, { Component, Fragment } from 'react'
import ExerciseEntry  from './ExerciseEntry'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createExerciseEntry, updateExerciseEntry } from '../actions/exerciseActions'


class ExerciseWrapper extends Component {
    constructor(props) {
    super(props)
        this.state = {
            isLoaded:false,
            error: null,
            exerciseItem:{},
            isEditItem:false
        }
    }

    componentDidMount() {
        const { authorized, match } = this.props
        const { params } = match
        if(authorized.isAuthenticated) {
            if(Object.keys(params).length > 0) {
                axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`
                axios.get(`/api/exercise/${params.entryId}`)
                .then(res => {
                    this.setState({
                        isLoaded:true,
                        exerciseItem: res.data,
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

    render(){
        const { isLoaded, isEditItem, exerciseItem, error } = this.state;
        const { createExerciseEntry, updateExerciseEntry, authorized } = this.props
        if(!authorized.isAuthenticated){
        return <Redirect to="/exercise" />
        } else if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if (!isEditItem) {
        return (
            <ExerciseEntry onSubmit={(item) => createExerciseEntry(item) } />
        );
        } else {
            return (
                <ExerciseEntry onSubmit={(item) => updateExerciseEntry(item) }
                                  editItem={exerciseItem} />
            )
        }
         
    }
}

ExerciseWrapper.propTypes = {
    createExerciseEntry: PropTypes.func.isRequired,
    updateExerciseEntry: PropTypes.func.isRequired
};

const ExerciseEntryView = ({authorized, match}) => {
    if(authorized.loading) {
        return <p>loading</p>
    } else {
        return <ExerciseWrapperConnect match={match} />
    }
}

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

const ExerciseWrapperConnect = connect(mapStatetoProps,
  { createExerciseEntry, updateExerciseEntry })(ExerciseWrapper)

export default connect(mapStatetoProps)(ExerciseEntryView)