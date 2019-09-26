import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAllUserExercise,
        getGuestExercise,
        deleteUserExercise } from '../actions/exerciseActions'
import moment from 'moment'

class Exercise extends React.Component {

    componentDidMount() {
        const { getAllUserExercise, getGuestExercise, exercise, authorized } = this.props

        if(!authorized.isAuthenticated) {
            getGuestExercise()
        } else if(exercise.exerciseList.length == 0 && !exercise.exerciseLoaded)  {
            getAllUserExercise()
        }
    }

    renderTable() {
        const { exercise, deleteUserExercise, authorized } = this.props;
        const { exerciseList } = exercise
        return exerciseList.map(item => {
            
            return (
                <tr key={item._id} >
                    <td>{item.description}</td>
                    <td>{item.detail}</td>
                    <td>{item.duration}</td>
                    <td>{moment(item.date).format('MM/DD/YYYY')}</td>
                    { authorized.isAuthenticated && 
                    <Fragment>
                        <td>
                            <NavLink to={`/exercise/edit/${item._id}`}
                            className="waves-effect waves-light btn-small">
                                <i className="material-icons">edit</i>
                            </NavLink>
                        </td>
                        <td>
                            <a onClick={()=> deleteUserExercise(item._id)}
                                className="waves-effect waves-light red lighten-2 btn-small">
                                <i className="material-icons">delete_forever</i>
                            </a>
                        </td>
                    </Fragment>}
                </tr>
            )
        })
    }

    render() {
        const { authorized } = this.props;
        return (
            <div>
                { authorized.isAuthenticated && 
                <NavLink to="/exercise/entry">
                    <button className="btn waves-effect waves-light" type="button">
                        New Entry
                    </button>
                </NavLink>}
                <table>
                    <thead>
                        <tr>
                            <th>Excercise Type</th>
                            <th>Excercise detail</th>
                            <th>Duration</th>
                            <th>Date</th>
                            { authorized.isAuthenticated &&
                            <Fragment>
                                <th>Edit</th>
                                <th>Delete</th>
                            </Fragment>}
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderTable()}
                    </tbody>
                </table>
            </div>
        )
    }
}

Exercise.propTypes = {
    getAllUserExercise: PropTypes.func.isRequired,
    deleteUserExercise: PropTypes.func.isRequired,
    getGuestExercise: PropTypes.func.isRequired
}

const mapStateToProps = ({ exercise, authorized }) => {
    return { exercise, authorized }
}

export default connect(mapStateToProps, { getAllUserExercise,
    getGuestExercise,
    deleteUserExercise })(Exercise)