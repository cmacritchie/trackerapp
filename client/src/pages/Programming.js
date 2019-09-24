import React from 'react'
import PropTypes from 'prop-types';
import { NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import { getAllUserProgramming } from '../actions/programmingActions'
import moment from 'moment'

class Programming extends React.Component {

    componentDidMount(){
        const { getAllUserProgramming, programming, authorized } = this.props
        if(programming.programmingList.length == 0 && !programming.programmingLoaded ){
            getAllUserProgramming()
        }
    }

    renderTable() {
        const { programmingList }  = this.props.programming;
        return programmingList.map(item => {

            return (
                <tr key={item._id} >
                    <td>{item.language}</td>
                    <td>{item.duration}</td>
                    <td>{item.description}</td>
                    <td>{moment(item.date).format('MM/DD/YYYY')}</td>
                    <td>
                        <a href={`/programming/edit/${item._id}`} 
                        class="waves-effect waves-light btn-small">
                            <i class="material-icons">edit</i>
                        </a>
                    </td>
                    <td>
                    <a href={`/`} 
                        class="waves-effect waves-light red lighten-2 btn-small">
                            <i class="material-icons">delete_forever</i>
                        </a>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <p>programming page</p>
                <NavLink to="/programming/entry">New Entry</NavLink>
                <table>
                    <thead>
                        <tr>
                            <th>Language / Framework</th>
                            <th>Duration</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
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
  };

const mapStateToProps = ({ programming, authorized }) => {
    return { programming, authorized }
} 

export default connect(mapStateToProps, { getAllUserProgramming })(Programming)