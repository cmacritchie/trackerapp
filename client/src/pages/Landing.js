import React, { Component, Fragment } from 'react'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';

class Stats extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoaded:false,
            entries:{}
        }
    }

    async componentDidMount(){
        const { authorized } = this.props
        const { isAuthenticated } = authorized
        if(isAuthenticated) {
            axios.defaults.headers.common['Authorization'] =`Bearer ${authorized.token}`
            const myRecentStats = await axios.get('/api/users/me/recent')
            this.setState({isLoaded:true, entries:myRecentStats.data})
        } else {
            const guestRecentStats = await axios.get('/api/users/guest/recent')
            this.setState({isLoaded:true, entries:guestRecentStats.data})

        }
    }

    render() {
        const { isLoaded, entries } = this.state
        const activities = Object.keys(entries);

        if(isLoaded){
            return(
                <table>
                    <thead>
                    <tr>
                        <th>Activity</th>
                        <th>Last Entry</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    <tr>
                        <td>Programming</td>
                        <td>{activities.includes('programming') && moment(entries.programming.updatedAt).format('MMM DD, YYYY')}</td>
                        <td><NavLink  className="btn" to='/programming'>Go</NavLink></td>
                    </tr>
                    <tr>
                        <td>Exercise</td>
                        <td>{activities.includes('exercise') && moment(entries.exercise.updatedAt).format('MMM DD, YYYY')}</td>
                        <td><NavLink  className="btn" to='/exercise'>Go</NavLink></td>
                    </tr>
                    <tr>
                        <td>Sleep</td>
                        <td>{activities.includes('sleep') && moment(entries.sleep.updatedAt).format('MMM DD, YYYY')}</td>
                        <td><NavLink  className="btn" to='/sleep'>Go</NavLink></td>
                    </tr>
                    <tr>
                        <td>weight</td>
                        <td>{activities.includes('weight') && moment(entries.weight.updatedAt).format('MMM DD, YYYY')}</td>
                        <td><NavLink  className="btn" to='/weight'>Go</NavLink></td>
                    </tr>
                    </tbody>
                </table>
            )
        } else {
            return <p>processing</p>
        }   
    }
}

const Landing = ({authorized}) => {

    if(!authorized.isAuthenticated) {
        return(
            <Fragment>
                <h4>Welcome to Tracker App!</h4>
                <p>
                    Tracker app was designed to quantify and track a few different activities
                    and stats including: weight, time allocation, sleep and exercise. For Demo purposes, the site 
                    creator's stats are displayed by default. Feel free to create an account and start tracking 
                    your own stats!
                </p>
                <div className="row">
                    <div className="col s6">
                        <NavLink className="btn" to='/login'>Login</NavLink>
                    </div> 
                    <div className="col s6">
                        <NavLink className="btn" to='/register'>Register</NavLink>         
                    </div> 
                </div>
                <p>
                    This site was designed using MERN stack architecture (MongoDB, Express, React-Redux, Node). It   
                    should be noted that this site is used for proof of concept purposes and doesn't have all features
                    built out (e.g. password retrievel via email hasn't been implemented yet). Feel free to view the source
                    code or submit a pull request / issue! 
                    <br />
                    <a className="btn" href="https://github.com/cmacritchie/trackerapp">Tracker App Source Code</a>
                </p>
                <p>Craig's recent entries</p>
                {!authorized.loading && <Stats authorized={authorized} />}
            </Fragment>
        )
    } else {
        return(
        <Fragment>
            <h4>Hi {authorized.user.name}</h4>   
            <p>here are your most recent entries:</p>
            {!authorized.loading && <Stats authorized={authorized} />}
        </Fragment>
        )
    }
}

const mapStatetoProps=({ authorized }) => {
    return { authorized }
}

export default connect(mapStatetoProps)(Landing)