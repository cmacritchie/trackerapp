import React, { Component, Fragment} from 'react'
import ProgrammingEntry from './ProgrammingEntry';
import axios from 'axios';
import { connect } from 'react-redux';

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
            debugger;
            axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`
            axios.get(`/api/programming/${params.entryId}`)
            .then(res => {
                debugger;
                this.setState({
                    isLoaded:true,
                    programmingItem: res.data,
                    isEditItem: true
                })
            })
            .catch(error => {
                debugger;
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
        
        debugger;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if (!isEditItem) {
        return (
            <ProgrammingEntry />
        );
        } else {
            return (
                <ProgrammingEntry editItem={programmingItem} />
            )
        }
        
        
    }

    
}

const mapStatetoProps =({ authorized }) => {
    return { authorized }
}

export default connect(mapStatetoProps)(ProgrammingWrapper)