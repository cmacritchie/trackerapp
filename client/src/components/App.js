import React, { Component, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'; //there is React Router, but RRD is bes for web apps
import { connect } from 'react-redux';
import { ToastContainer, Flip } from 'react-toastify';
import { createBrowserHistory } from 'history';
import { fetchUser } from '../actions/authActions';
import Header from './Header';
import Register from '../pages/Register'
import Login from '../pages/Login'
import Exercise from '../pages/Exercise'
import Programming from '../pages/Programming'
import ProgrammingWrapper from '../pages/ProgrammingWrapper'
import Sleep from '../pages/Sleep'
import Weight from '../pages/Weight'
import { store } from '../index';

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
              <Route path="/exercise" component={Exercise} />
            </Switch>
            <Switch>
              <Route exact path="/programming" component={Programming} />
              <Route path="/programming/entry" component={ProgrammingWrapper} />
              <Route path="/programming/edit/:entryId" component={ProgrammingWrapper} />
            </Switch>
            <Switch>
              <Route path="/sleep" component={Sleep} />

            </Switch>
            <Switch>
              <Route path="/weight" component={Weight} />
              
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }


export default App;
