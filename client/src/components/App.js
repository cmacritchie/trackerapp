import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'; //there is React Router, but RRD is bes for web apps
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Login from '../pages/Login'
const Dashboard = () => <h2>Dashboard</h2>
const Landing = () => <h2>Landing</h2>
const SurveyNew = () => <h2>SurveyNew</h2>




class App extends Component {
  //componentWillMount is deprecated and the difference in time
  //to render is considered negligible
  componentDidMount() {
    this.props.fetchUser()
}


  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/surveys" component={Dashboard} />
            <Route path="/login" component={Login} />
          </div>
        </BrowserRouter>
        Hi There
      </div>
    );
  }
}

export default connect(null, actions)(App);
