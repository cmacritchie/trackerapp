import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUserProgramming, 
        deleteUserProgramming,
        getGuestProgramming } from '../actions/programmingActions'
import moment from 'moment'

class Programming extends React.Component {

    componentDidMount(){
        const { getAllUserProgramming, getGuestProgramming, programming, authorized } = this.props

        if(!authorized.isAuthenticated) {
            getGuestProgramming()
        } else if(programming.programmingList.length == 0 && !programming.programmingLoaded ){
            getAllUserProgramming()
        } 
    }

    renderTable() {
        const { programming, deleteUserProgramming, authorized }  = this.props;
        const { programmingList } = programming
        return programmingList.map(item => {

            return (
                <tr key={item._id} >
                    <td>{item.language}</td>
                    <td>{item.duration}</td>
                    <td>{item.description}</td>
                    <td>{moment(item.date).format('MM/DD/YYYY')}</td>
                    { authorized.isAuthenticated &&  
                    <Fragment>
                        <td>
                            <NavLink to={`/programming/edit/${item._id}`}
                            className="waves-effect waves-light btn-small">
                                <i className="material-icons">edit</i>
                            </NavLink>
                        </td>
                        <td>
                            <a onClick={()=> deleteUserProgramming(item._id)}
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
                {authorized.isAuthenticated &&
                <NavLink to="/programming/entry">
                    <button className="btn waves-effect waves-light" type="button">
                        New Entry
                    </button>
                </NavLink>}
                <table>
                    <thead>
                        <tr>
                            <th>Language / Framework</th>
                            <th>Duration</th>
                            <th>Description</th>
                            <th>Date</th>

                            { authorized.isAuthenticated &&  
                            <Fragment>
                                <th>Edit</th>
                                <th>Delete</th>
                            </Fragment> }                           
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

Programming.propTypes = {
    getAllUserProgramming: PropTypes.func.isRequired,
    deleteUserProgramming: PropTypes.func.isRequired,
    getGuestProgramming: PropTypes.func.isRequired
  };

const mapStateToProps = ({ programming, authorized }) => {
    return { programming, authorized }
} 

export default connect(mapStateToProps, { getAllUserProgramming, deleteUserProgramming, getGuestProgramming })(Programming)