import { Card, Grid, Typography } from '@mui/material'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import React from 'react'
import Login from './Login'
import Register from './Register'
import HomePage from '../HomePage/HomePage'

const Authentication = () => {
  return (
    <div 
      style={{ 
        minHeight: '100vh', 
        backgroundImage: 'url(https://cdn.pixabay.com/photo/2024/04/09/04/56/ai-generated-8685053_960_720.png)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}
    >
      <Router>
        <Grid container justifyContent="center" alignItems="center">
          <Grid item xs={11} sm={8} md={5} lg={4}>
            <Card 
              className='p-6 md:p-10' 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                backdropFilter: 'blur(10px)' 
              }}
            >
              <div className='flex flex-col items-center space-y-1'>
                <Typography variant="h4" className='logo text-center'>EScooter</Typography>
                <Typography variant="body2" className='text-center'>Connecting Lives, Sharing Information</Typography>
              </div>
              <Switch>
                <Route exact path='/register'> <Register /> </Route>
                <Route exact path='/login'> <Login /> </Route>
                <Route exact path='/'> <Login /> </Route>
              </Switch>
            </Card>
          </Grid>
        </Grid>
      </Router>
    </div>
  )
}

export default Authentication
