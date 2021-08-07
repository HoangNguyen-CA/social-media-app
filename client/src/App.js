import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Signup from './auth/Signup';
import Login from './auth/Login';
import AuthScreen from './auth/AuthScreen';
import Home from './home/Home';
import CreatePost from './posts/CreatePost';
import Layout from './components/Layout';
import Landing from './auth/Landing';

import { useSelector } from 'react-redux';
import { selectIsAuth } from './store/slices/authSlice';

function App() {
  const isAuth = useSelector(selectIsAuth);

  return (
    <>
      {isAuth === null ? (
        <Landing />
      ) : (
        <Switch>
          <Route exact path='/login'>
            <Login></Login>
          </Route>
          <Route exact path='/signup'>
            <Signup></Signup>
          </Route>
          <Route exact path='/home'>
            <Layout header='Home'>
              <Home />
            </Layout>
          </Route>
          <Route exact path='/submit'>
            <Layout header='Create Post'>
              <CreatePost />
            </Layout>
          </Route>
          <Route exact path='/profile'>
            <Layout header='Profile'></Layout>
          </Route>
          <Route exact path='/'>
            <AuthScreen />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
