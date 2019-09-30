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
            isEditItem:false,
            previouslySelected:[]
        }
    }

    async componentDidMount() {
        const { authorized, match } = this.props
        const { params } = match
        let apiCalls =[]
        axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`

        if(authorized.isAuthenticated) {
            if(Object.keys(params).length > 0) {
                const [editItem, distinct] = await Promise.all([
                    axios.get(`/api/programming/${params.entryId}`),
                    axios.get('/api/programmingdistinct')
                ])
                this.setState({
                                isLoaded: true,
                                programmingItem:editItem.data,
                                isEditItem:true,
                                previouslySelected:distinct.data
                            })
            } else {
                const distinct = await axios.get('/api/programmingdistinct')
                this.setState({
                    isLoaded: true,
                    isEditItem:false,
                    previouslySelected:distinct.data
                })
            }
        } 
    }

    render(){
        const { isLoaded, isEditItem, programmingItem, error, previouslySelected } = this.state;
        const { createProgrammingEntry, updateProgrammingEntry, authorized } = this.props
        
        if(!authorized.isAuthenticated){
        return <Redirect to="/programming" />
        } else if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if (!isEditItem) {
        return (
            <ProgrammingEntry onsubmit={(item) => createProgrammingEntry(item) }
                                previouslySelected={previouslySelected} />
        );
        } else {
            return (
                <ProgrammingEntry onsubmit={(item) => updateProgrammingEntry(item) }
                                  editItem={programmingItem}
                                  previouslySelected={previouslySelected} />
            )
        }
         
    }
    
}

ProgrammingWrapper.propTypes = {
    createProgrammingEntry: PropTypes.func.isRequired,
    updateProgrammingEntry: PropTypes.func.isRequired
};

const ProgrammingEntryView = ({authorized, match}) => {
    if(authorized.loading) {
        return <p>loading</p>
    } else {
        return <ProgrammingWrapperConnect match={match} />
    }
}

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

const ProgrammingWrapperConnect = connect(mapStatetoProps, 
                    { createProgrammingEntry, updateProgrammingEntry })(ProgrammingWrapper)

export default connect(mapStatetoProps)(ProgrammingEntryView)