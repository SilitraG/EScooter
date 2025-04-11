import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { Grid } from '@mui/material';
import { Route, Switch, Redirect } from 'react-router-dom';
import MiddlePart from '../../components/MiddlePart/MiddlePart';
import HomeRigth from '../../components/HomeRigth/HomeRigth';

const HomePage = () => {
  const [obstacleCoordinates, setObstacleCoordinates] = useState([]);

  return (
    <div className="px-5">
      <Grid container spacing={1}>
        <Grid item xs={12} lg={2.5}>
          <div className="sticky top-0">
            <Sidebar />
          </div>
        </Grid>

        <Grid item xs={12} lg={7} className="flex justify-center">
          <Switch>
            <Route exact path="/home">
              <MiddlePart obstacleCoordinates={obstacleCoordinates} />
            </Route>
            <Redirect from="/" to="/home" />
          </Switch>
        </Grid>

        <Grid item xs={12} lg={2.5} className="relative">
          <div className="top-0">
            <Switch>
              <Route exact path="/home">
                <HomeRigth
                  obstacleCoordinates={obstacleCoordinates}
                  setObstacleCoordinates={setObstacleCoordinates}
                />
              </Route>
            </Switch>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
