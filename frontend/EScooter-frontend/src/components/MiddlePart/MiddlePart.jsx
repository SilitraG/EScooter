
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const MiddlePart = ({ obstacleCoordinates }) => {
  const position = { lat: 47.15, lng: 27.58 };
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <APIProvider apiKey='AIzaSyA3FI5Drj0upmW8XuoDARw8XY04I4_reBg'>
      <div style={{ height: isMobile ? '50vh' : '100vh', width: '100%', paddingTop: isMobile ? '10px' : '5%' }}>
        <Map defaultZoom={13} defaultCenter={position} mapId={'265415f1e59bc082'} disableDefaultUI>
          {obstacleCoordinates.map((obstacle, index) => (
            <AdvancedMarker
              key={index}
              position={{ lat: obstacle.lat, lng: obstacle.lng }}
              onClick={() => setOpen(true)}>
              <Pin
                background={'black'}
                borderColor={'black'}
                glyphColor={'yellow'}
              />
              {open && (
                <InfoWindow position={{ lat: obstacle.lat, lng: obstacle.lng }} onCloseClick={() => setOpen(false)}>
                  <p>{obstacleCoordinates[index].appearances}</p>
                </InfoWindow>
              )}
            </AdvancedMarker>
          ))}
        </Map>
      </div>
    </APIProvider>
  );
}

export default MiddlePart;
