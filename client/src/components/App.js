import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //there is React Router, but RRD is bes for web apps
// import { connect } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import { createBrowserHistory } from 'history';
import { fetchUser } from '../actions/authActions';
import Header from './Header';
import Register from '../pages/Register'
import Login from '../pages/Login'
import Exercise from '../pages/Exercise'
import ExerciseWrapper from '../pages/ExerciseWrapper'
import Programming from '../pages/Programming'
import ProgrammingWrapper from '../pages/ProgrammingWrapper'
import Sleep from '../pages/Sleep'
import SleepWrapper from '../pages/SleepWrapper';
import Weight from '../pages/Weight'
import WeightWrapper from '../pages/WeightWrapper';
import { store } from '../index';
import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min.js";

export const history = createBrowserHistory()

const Landing =()=><h1>Landing</h1>
const Dashboard =()=><h1>Dash</h1>


const App = () => {
  //componentWillMount is deprecated and the difference in time
  //to render is considered negligible

  useEffect(() => {
    store.dispatch(fetchUser());
  }, []);

 



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
            <Route path="/register" component={Register} />
            <Switch>
              <Route exact path="/exercise" component={Exercise} />
              <Route path="/exercise/entry" component={ExerciseWrapper} />
              <Route path="/exercise/edit/:entryId" component={ExerciseWrapper} />
            </Switch>
            <Switch>
              <Route exact path="/programming" component={Programming} />
              <Route path="/programming/entry" component={ProgrammingWrapper} />
              <Route path="/programming/edit/:entryId" component={ProgrammingWrapper} />
            </Switch>
            <Switch>
              <Route exact path="/sleep" component={Sleep} />
              <Route exact path="/sleep/entry" component={SleepWrapper} />
              <Route path="/sleep/edit/:entryId" component={SleepWrapper} />
            </Switch>
            <Switch>
              <Route exact path="/weight" component={Weight} />
              <Route exact path="/weight/entry" component={WeightWrapper} />
              <Route path="/weight/edit/:entryId" component={WeightWrapper} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }


export default App;
