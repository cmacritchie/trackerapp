import React, { Component, Fragment} from 'react'
import ProgrammingEntry from './ProgrammingEntry';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProgrammingEntry, updateProgrammingEntry } from '../actions/programmingActions'

class ProgrammingWrapper extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoaded:false,
            error: null,
            programmingItem:{},
            isEditItem:false
        }
    }

    componentDidMount() {
        const { authorized, match } = this.props
        const { params } = match
        
        if(Object.keys(params).length > 0) {
            axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`
            axios.get(`/api/programming/${params.entryId}`)
            .then(res => {
                this.setState({
                    isLoaded:true,
                    programmingItem: res.data,
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

    render(){
        const { isLoaded, isEditItem, programmingItem, error } = this.state;
        const { createProgrammingEntry, updateProgrammingEntry, authorized } = this.props
        if(!authorized.isAuthenticated){
        return <Redirect to="/programming" />
        } else if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if (!isEditItem) {
        return (
            <ProgrammingEntry onsubmit={(item) => createProgrammingEntry(item) } />
        );
        } else {
            return (
                <ProgrammingEntry onsubmit={(item) => updateProgrammingEntry(item) }
                                  editItem={programmingItem} />
            )
        }
        
        
    }

    
}

ProgrammingWrapper.propTypes = {
    createProgrammingEntry: PropTypes.func.isRequired,
    updateProgrammingEntry: PropTypes.func.isRequired
  };

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

export default connect(mapStatetoProps, 
                    { createProgrammingEntry, updateProgrammingEntry })(ProgrammingWrapper)