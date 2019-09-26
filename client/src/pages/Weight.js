import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllUserWeight,
        getGuestWeight,
        deleteUserWeight } from '../actions/weightActions'
import moment from 'moment'



class Weight extends React.Component {

    componentDidMount(){
        const { getAllUserWeight, getGuestWeight, weight, authorized} = this.props
        debugger;
        if(!authorized.isAuthenticated) {
            getGuestWeight()
        } else if(weight.weightList.length === 0 && !weight.weightLoaded) {
            getAllUserWeight()
        }
    }

    renderTable() {
        const { weight, deleteUserWeight, authorized } = this.props;
        const { weightList } = weight
        return weightList.map(item => {
            
            return(
                <tr key={item._id} >
                    <td>{item.value}</td>
                    <td>{moment(item.date).format('MM/DD/YYYY')}</td>
                    { authorized.isAuthenticated && 
                    <Fragment>
                        <td>
                            <NavLink to={`/weight/edit/${item._id}`}
                                className="waves-effect waves-light btn-small">
                                    <i className="material-icons">edit</i>
                            </NavLink>
                        </td>
                        <td>
                            <a onClick={()=> deleteUserWeight(item._id)}
                                className="waves-effect waves-light red lighten-2 btn-small">
                                <i className="material-icons">delete_forever</i>
                            </a>
                        </td>
                    </Fragment>
                    }
                </tr>
            )
        })
    }

    render() {
        const { authorized } = this.props;
        return (
            <div>
                {authorized.isAuthenticated && 
                <NavLink to="/weight/entry">
                    <button className="btn waves-effect waves-light" type="button">
                        New Entry
                    </button>
                </NavLink>}
                <table>
                    <thead>
                        <tr>
                            <th>Weight (lbs.)</th>
                            <th>Date</th>
                            { authorized.isAuthenticated && 
                                <Fragment>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </Fragment>}
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

Weight.propTypes = {
    getAllUserWeight: PropTypes.func.isRequired,
    getGuestWeight: PropTypes.func.isRequired,
    deleteUserWeight: PropTypes.func.isRequired,
}

const mapStateToProps = ({ weight, authorized }) => {
    return { weight, authorized }
}

export default connect(mapStateToProps, 
    {getAllUserWeight,
    getGuestWeight,
    deleteUserWeight})(Weight)