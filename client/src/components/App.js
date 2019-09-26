import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //there is React Router, but RRD is bes for web apps
import { connect } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import { createBrowserHistory } from 'history';
import * as actions from '../actions';
import Header from './Header';
import Login from '../pages/Login'
import Exercise from '../pages/Exercise'
import Programming from '../pages/Programming'
import ProgrammingWrapper from '../pages/ProgrammingWrapper'
import Sleep from '../pages/Sleep'
import Weight from '../pages/Weight'

const Dashboard = () => <h2>Dashboard</h2>
const Landing = () => <h2>Landing</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

export const history = createBrowserHistory()



class App extends Component {
  //componentWillMount is deprecated and the difference in time
  //to render is considered negligible
  componentDidMount() {
    this.props.fetchUser()
}


  render() {
    return (
      <div className="container">
        <ToastContainer
          transition={Flip}
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable={false}
          pauseOnHover
          />
        <BrowserRouter history={history}>
          <div>
            <Header />
            <Route exact path="/" component={Landing} />
            <Route path="/surveys" component={Dashboard} />
            <Route path="/login" component={Login} />
            <Switch>
              <Route path="/exercise" component={Exercise} />

            </Switch>
            <Switch>
              <Route exact path="/programming" component={Programming} />
              <Route path="/programming/entry" component={ProgrammingWrapper} />
              <Route path="/programming/edit/:entryId" component={ProgrammingWrapper} />
            </Switch>
            <Route path="/sleep" component={Sleep} />
            <Route path="/weight" component={Weight} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
