import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import ExerciseGraph from '../components/ExerciseGraph';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { getAllUserExercise,
        getGuestExercise,
        deleteUserExercise } from '../actions/exerciseActions'
import moment from 'moment'

const ExerciseView = ({authorized}) => {

    if(authorized.loading) {
        return <p>loading</p>
    } else if(authorized.isAuthenticated){
        return <ExerciseConnect guest={false} />
    } else {
        return <ExerciseConnect guest={true} />
    }

}


class Exercise extends React.Component {

    componentDidMount() {
        const { getAllUserExercise, getGuestExercise, exercise, authorized, guest } = this.props

        if(guest && !exercise.exerciseLoaded) {
            getGuestExercise()
        // } else if(exercise.exerciseList.length == 0 && !exercise.exerciseLoaded)  {
        } else if (!exercise.exerciseLoaded) {
            getAllUserExercise()
        }
    }

    renderTable() {
        const { exercise, deleteUserExercise, authorized } = this.props;
        const { exerciseList } = exercise

        return exerciseList.map(item => {
            return (
                <tr key={item._id} >
                    <td>{item.type}</td>
                    <td>{item.detail}</td>
                    <td>{moment.utc().startOf('day').add({ minutes: item.duration }).format('H:mm')}</td>
                    <td>{moment(item.date).format('MMM DD, YYYY')}</td>
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
        const { authorized, exercise } = this.props;
        const { exerciseList } = exercise
       
        if(!exercise.exerciseLoaded){
            return <p>loading</p>
        }

        return (
            <div>
                <br />
                { authorized.isAuthenticated && 
                <NavLink to="/exercise/entry">
                    <button className="btn waves-effect waves-light" type="button">
                        New Entry
                    </button>
                </NavLink>}
                
                { exerciseList.length === 0 ?
                
                <p>No Exercise Entries</p>
                :
                <Fragment>
                    <ExerciseGraph data={exerciseList} />
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
                </Fragment>
                }
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

const ExerciseConnect = connect(mapStateToProps, { getAllUserExercise,
    getGuestExercise,
    deleteUserExercise })(Exercise)

export default connect(mapStateToProps)(ExerciseView)
