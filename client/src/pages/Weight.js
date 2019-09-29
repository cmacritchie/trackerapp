import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { getAllUserWeight,
        getGuestWeight,
        deleteUserWeight } from '../actions/weightActions'
import moment from 'moment'

const WeightView = ({authorized}) => {

    if(authorized.loading) {
        return <p>loading</p>
    } else if(authorized.isAuthenticated){
        return <WeightConnect guest={false} />
    } else {
        return <WeightConnect guest={true} />
    }

}

class Weight extends React.Component {

    componentDidMount(){
        const { getAllUserWeight, getGuestWeight, weight, authorized, guest} = this.props
        if(guest && !weight.weightLoaded) {
            getGuestWeight()
        } else if(!weight.weightLoaded) {
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
        const { authorized, weight } = this.props;

        if(!weight.weightLoaded) {
            return <p>loading</p>
        }

        return (
            <div>
                <br />
                { authorized.isAuthenticated && 
                <NavLink to="/weight/entry">
                    <button className="btn waves-effect waves-light" type="button">
                        New Entry
                    </button>
                </NavLink>}

                { weight.weightList.length === 0 ? 
                
                <p>No Weight Entries </p>
                :
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
                }
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

const WeightConnect = connect(mapStateToProps, 
    {getAllUserWeight,
    getGuestWeight,
    deleteUserWeight})(Weight)

export default connect(mapStateToProps)(WeightView)