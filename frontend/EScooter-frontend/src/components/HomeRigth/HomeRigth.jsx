import { useState } from 'react';
import { Switch, FormControlLabel, Card, useMediaQuery, useTheme } from '@mui/material';
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
          const { data } = await api.get(`/obstacle`);
          
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      style={{
        height: isMobile ? 'auto' : '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '16px'
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '8px' : '16px',
          marginLeft: '16px',
          marginRight: '16px'
        }}
      >
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

export default HomeRigth;
