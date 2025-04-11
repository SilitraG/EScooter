import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Authentication from './pages/Authentication/Authentication';
import HomePage from './pages/HomePage/HomePage';

const App = () => {
    const jwt = useSelector(state => state.auth.jwt);
    

    return (
        <Router>
            <Switch>
                <Route path="/login">
                    {jwt ? <Redirect to="/home" /> : <Authentication />}
                </Route>
                
                <Route path="/register">
                    {jwt ? <Redirect to="/home" /> : <Authentication />}
                </Route>

                <Route path="/home">
                    {jwt ? <HomePage /> : <Redirect to="/login" />}
                </Route>

                <Route path="/profile">
                    {jwt ? <HomePage /> : <Redirect to="/login" />}
                </Route>

                <Route path="/ride">
                    {jwt ? <HomePage /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/">
                    {jwt ? <Redirect to="/home" /> : <Redirect to="/login" />}
                </Route>

                <Redirect to="/login" />
            </Switch>
        </Router>
    );
};

export default App;
