import React, { Fragment } from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUserSleep,
        getGuestSleep,
        deleteUserSleep } from '../actions/sleepActions'
import moment from 'moment'

class Sleep extends React.Component {

    componentDidMount() {
        const { getAllUserSleep, getGuestSleep, sleep, authorized } = this.props;
    
        if(!authorized.isAuthenticated) {
            debugger;
            getGuestSleep()
        } else if(sleep.sleepList.length == 0 && ! sleep.sleepLoaded) {
            getAllUserSleep()
        }
    }

    renderTable() {
        const { sleep, deleteUserSleep, authorized } = this.props;
        const { sleepList } = sleep;
        return sleepList.map(item => {
            return(
                <tr key={item._id}>
                    <td>{item.down}</td>
                    <td>{item.up}</td>
                    <td>total Hours</td>
                    <td>{moment(item.date).format('MM/DD/YYYY')}</td>
                    { authorized.isAuthenticated && 
                    <Fragment>
                        <td>
                            <NavLink to={`/sleep/edit/${item._id}`}
                            className="waves-effect waves-light btn-small">
                                <i className="material-icons">edit</i>
                            </NavLink>
                        </td>
                        <td>
                            <a onClick={()=> deleteUserSleep(item._id)}
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
                <NavLink to="/sleep/entry">
                    <button className="btn waves-effect waves-light" type="button">
                        New Entry
                    </button>
                </NavLink>}
                <table>
                    <thead>
                        <tr>
                            <th>Rise</th>
                            <th>Fall</th>
                            <th>Total Hours</th>
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

Sleep.propTypes = {
    getAllUserSleep: PropTypes.func.isRequired,
    getGuestSleep: PropTypes.func.isRequired,
    deleteUserSleep: PropTypes.func.isRequired
  };

  const mapStateToProps = ({sleep, authorized}) => {
      return { sleep, authorized }
  }

export default connect(mapStateToProps, { getAllUserSleep,
    getGuestSleep,
    deleteUserSleep })(Sleep)