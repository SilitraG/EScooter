import { useState, useEffect, useRef } from 'react';
import { 
  Switch, 
  FormControlLabel, 
  Card, 
  useMediaQuery, 
  useTheme, 
  Typography,
  ToggleButton,
  Box
} from '@mui/material';
import api from '../../config/api';
import traseuFinal from '../../assets/traseu_final.png';

const HomeRight = ({ obstacleCoordinates, setObstacleCoordinates }) => {
  const [state, setState] = useState({
    obstacole: false,
  });

  const handleChange = async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    if (event.target.name === 'obstacole') {
      if (event.target.checked) {
        try {
          const token = localStorage.getItem('token') || '';
          const { data } = await api.get(`/obstacle/merge`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const newObstacleCoordinates = data.map((obstacle) => ({
            lat: obstacle.lat,
            lng: obstacle.lng,
            appearances: obstacle.appearances,
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

  // Stări pentru senzorii dispozitivului
  const [alpha, setAlpha] = useState(null);
  const [beta, setBeta] = useState(null);
  const [gamma, setGamma] = useState(null);
  const [X, setX] = useState(null);
  const [Y, setY] = useState(null);
  const [Z, setZ] = useState(null);

  const [algorithmActive, setAlgorithmActive] = useState(false);
  const [fallDetected, setFallDetected] = useState(false);

  // Informații despre ultima cădere detectată
  const [fallLat, setFallLat] = useState(null);
  const [fallLng, setFallLng] = useState(null);
  const [fallAccuracy, setFallAccuracy] = useState(null);

  // Stări pentru contor, terminarea cursei și erori la geolocație
  const [countdown, setCountdown] = useState(null);
  const [raceFinished, setRaceFinished] = useState(false);
  const [geoError, setGeoError] = useState(null);

  // Delay-uri (în milisecunde)
  const activationDelay = 5000;
  const detectionResetDelay = 5000;

  // Refs pentru evenimente și starea internă a algoritmului
  const orientationListenerRef = useRef(null);
  const motionListenerRef = useRef(null);
  const fallStateRef = useRef({
    state: 'none',
    freeFallStart: null,
  });

  // Funcții pentru actualizarea datelor de la senzori
  function handleOrientation(event) {
    setAlpha(event.alpha);
    setBeta(event.beta);
    setGamma(event.gamma);
  }
  function orientationListener(event) {
    handleOrientation(event);
  }
  function handleMotion(event) {
    setX(event.accelerationIncludingGravity.x * 5);
    setY(event.accelerationIncludingGravity.y * 5);
    setZ(event.accelerationIncludingGravity.z * 5);
  }

  async function startSensors() {
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof DeviceOrientationEvent.requestPermission === 'function'
    ) {
      try {
        const permissionState = await DeviceOrientationEvent.requestPermission();
        if (permissionState === 'granted') {
          orientationListenerRef.current = (event) => orientationListener(event);
          window.addEventListener('deviceorientation', orientationListenerRef.current);
        } else {
          alert('Permisiunea pentru giroscop a fost refuzată.');
        }
      } catch (error) {
        alert(error);
      }
    } else {
      orientationListenerRef.current = (event) => orientationListener(event);
      window.addEventListener('deviceorientation', orientationListenerRef.current);
    }
    motionListenerRef.current = (event) => handleMotion(event);
    window.addEventListener('devicemotion', motionListenerRef.current);
  }

  function stopSensors() {
    if (orientationListenerRef.current) {
      window.removeEventListener('deviceorientation', orientationListenerRef.current);
      orientationListenerRef.current = null;
    }
    if (motionListenerRef.current) {
      window.removeEventListener('devicemotion', motionListenerRef.current);
      motionListenerRef.current = null;
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('GPS call on page load:', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          });
        },
        (error) => {
          console.error('Error on initial GPS call:', error);
          setGeoError(error.message);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
      console.error('Geolocation not supported by this browser.');
      setGeoError('Geolocation not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (!algorithmActive) return;
    if (fallDetected) return;

    if (X !== null && Y !== null && Z !== null) {
      const accMag = Math.sqrt(X * X + Y * Y + Z * Z);
      const now = Date.now();

      const freeFallThreshold = 80;
      const minAngle = 60;
      const maxAngle = 120;
      const maxFallDuration = 1500;

      if (fallStateRef.current.state === 'none') {
        if (accMag > freeFallThreshold) {
          fallStateRef.current.state = 'freeFall';
          fallStateRef.current.freeFallStart = now;
          console.log('Free fall detectat');
        }
      } else if (fallStateRef.current.state === 'freeFall') {
        if (
          (beta !== null && Math.abs(beta) > maxAngle) ||
          (beta !== null && Math.abs(beta) < minAngle)
        ) {
          setFallDetected(true);
          console.log('Cădere confirmată!');
        } else if (now - fallStateRef.current.freeFallStart > maxFallDuration) {
          fallStateRef.current.state = 'none';
          console.log('Impact timeout – reset');
        }
      }
    }
  }, [X, Y, Z, beta, algorithmActive, fallDetected]);

  useEffect(() => {
    if (fallDetected) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            setFallLat(lat);
            setFallLng(lng);
            const token = localStorage.getItem("token");

            api.post(
              '/obstacle/add',
              {
                lat: lat.toString(),
                lng: lng.toString(),
                appearances: "1"
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              }
            )
              .then(() => {
                console.log("Date trimise cu succes la /obstacle/add");
              })
              .catch((error) => {
                console.error("Eroare la trimiterea coordonatelor:", error);
              });
          },
          (error) => {
            console.error('Error getting fall coordinates:', error);
            setGeoError(error.message);
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        setGeoError('Geolocation not supported by this browser.');
      }

      const timer = setTimeout(() => {
        setFallDetected(false);
        fallStateRef.current = { state: 'none', freeFallStart: null };
        console.log('Resetare stare detectare pentru următoarea cădere.');
      }, detectionResetDelay);

      return () => clearTimeout(timer);
    }
  }, [fallDetected]);

  const startHandler = async () => {
    setGeoError(null);
    setAlgorithmActive(false);
    setFallDetected(false);
    setFallLat(null);
    setFallLng(null);
    setFallAccuracy(null);
    fallStateRef.current = { state: 'none', freeFallStart: null };
    setRaceFinished(false);

    await startSensors();

    let secondsRemaining = activationDelay / 1000;
    setCountdown(secondsRemaining);
    const countdownInterval = setInterval(() => {
      secondsRemaining -= 1;
      setCountdown(secondsRemaining);
      if (secondsRemaining <= 0) {
        clearInterval(countdownInterval);
      }
    }, 1000);

    setTimeout(() => {
      setAlgorithmActive(true);
      console.log('Algoritmul de detectare a căderii a fost activat.');
    }, activationDelay);
  };

  const stopHandler = () => {
    setAlgorithmActive(false);
    stopSensors();
    setRaceFinished(true);
  };

  const muiTheme = useTheme();
  const isMobileView = useMediaQuery(muiTheme.breakpoints.down('sm'));

  return (
    <Card
      style={{
        height: isMobileView ? 'auto' : '100vh',
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
          gap: isMobileView ? '8px' : '16px',
          marginLeft: '16px',
          marginRight: '16px'
        }}
      >
        <FormControlLabel
          control={
            <Switch
              checked={state.obstacole}
              onChange={handleChange}
              name="obstacole"
            />
          }
          label="Obstacole"
        />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
          <ToggleButton
            onClick={startHandler}
            value="start"
            aria-label="start"
            sx={{
              width: '60px',
              height: '60px',
              textTransform: 'none',
              fontSize: '16px',
              border: '2px solid black',
              borderRadius: '50%', // perfect rotund
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Start
          </ToggleButton>

          <img
            src={traseuFinal}
            alt="Traseu final"
            style={{
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '50%',
              transform: 'scaleY(-1)', // Răsturnare verticală
            }}
          />

          <ToggleButton
            onClick={stopHandler}
            value="stop"
            aria-label="stop"
            sx={{
              width: '60px',
              height: '60px',
              textTransform: 'none',
              fontSize: '16px',
              border: '2px solid black',
              borderRadius: '50%', // perfect rotund
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Stop
          </ToggleButton>
        </Box>

        {countdown !== null && countdown > 0 && (
          <Typography>Activare în: {countdown} secunde</Typography>
        )}
        {raceFinished && <Typography>Cursa s-a terminat</Typography>}
        {geoError && <Typography color="error">Eroare geolocație: {geoError}</Typography>}
      </div>
    </Card>
  );
};

export default HomeRight;
