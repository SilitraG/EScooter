import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Grid } from '@mui/material';
import { useLocation, Route, Switch, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import MiddlePart from '../../components/MiddlePart/MiddlePart';
import HomeRigth from '../../components/HomeRigth/HomeRigth';
import RRide from '../../components/HomeRigth/RRide';
import RProfile from '../../components/HomeRigth/RProfile';
import Profile from '../Profile/Profile';
import Ride from '../Ride/Ride';

const HomePage = () => {
  const [obstacleCoordinates, setObstacleCoordinates] = useState([]);
  const location = useLocation();

  return (
    <div className='px-5'>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={2.5}>
          <div className='sticky top-0'>
            <Sidebar />
          </div>
        </Grid>

        <Grid item xs={12} lg={7} className='flex justify-center'>
          <Switch>
            <Route exact path="/ride"> <Ride /> </Route>
            <Route exact path="/profile/:id"> <Profile /> </Route>
            <Route exact path="/home"> <MiddlePart obstacleCoordinates={obstacleCoordinates} /> </Route>
            <Redirect from='/' to='/home' />
          </Switch>
        </Grid>

        <Grid item xs={12} lg={2.5} className='relative'>
          <div className='top-0'>
            <Switch>
              <Route exact path="/ride"> <RRide /> </Route>
              <Route exact path="/profile/:id"> <RProfile /> </Route>
              <Route exact path="/home"> <HomeRigth obstacleCoordinates={obstacleCoordinates} setObstacleCoordinates={setObstacleCoordinates} /> </Route>
            </Switch>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default HomePage;
