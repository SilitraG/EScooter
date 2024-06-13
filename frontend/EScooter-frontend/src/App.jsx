import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';
import Profile from './pages/Profile/Profile';
import Ride from './pages/Ride/Ride';
import { Home } from '@mui/icons-material';

const App = () => {
    const jwt = useSelector(state => state.auth.jwt);
    

    return (
        <Router>
            <Switch>
                <Route path='/login' component={Authentication} />
                <Route path='/register' component={Authentication} />
                <Route path='/profile/:id' component={HomePage} />
                <Route path='/ride' component={HomePage} />
                <Route path='/home'>
                    {!jwt ? <HomePage /> : <Redirect to='/login' />}
                </Route>
                <Redirect from='/' to='/login' />
            </Switch>
        </Router>
    );
};

export default App;
