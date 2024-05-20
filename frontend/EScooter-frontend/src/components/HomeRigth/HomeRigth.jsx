import React, { useState } from 'react'
import { Switch, FormControlLabel, FormGroup } from '@mui/material';
import { Avatar, Button, Card, Divider, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import api from '../../config/api';

const HomeRigth = ({ obstacleCoordinates, setObstacleCoordinates }) => {
  const [state, setState] = useState({
    obstacole: false,
    vehicule: false,
    parcari: false
  });

  const handleChange = async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.name === 'obstacole') {
      if(event.target.checked) {
        try {
          const {data} = await api.get(`/obstacle`);
          
          const newObstacleCoordinates = data.map((obstacle) => ({
            lat: obstacle.lat,
            lng: obstacle.lng,
            severity: obstacle.severity,
            description: obstacle.description
          }));
          setObstacleCoordinates(newObstacleCoordinates);
          console.log(`${event.target.name} activat`);
        } catch (error) {
          console.error('Eroare la obținerea coordonatelor obstacolelor:', error);
        } 
      } else {
        setObstacleCoordinates([]);
        console.log(`${event.target.name} dezactivat`);
      }
    }
  };

  return (
    <Card className='card h-screen flex-col justify-between py-5'>
        <div className='flex flex-col space-y-4 ml-4 mr-10'>
          <FormControlLabel
            control={<Switch checked={state.obstacole} onChange={handleChange} name="obstacole" />}
            label="Obstacole"
          />
          <FormControlLabel
            control={<Switch checked={state.vehicule} onChange={handleChange} name="vehicule" />}
            label="Vehicule"
          />
          <FormControlLabel
            control={<Switch checked={state.parcari} onChange={handleChange} name="parcari" />}
            label="Parcari"
          />
        </div>
        
    </Card>
  )
}

export default HomeRigth
