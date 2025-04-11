import { useEffect, useState } from 'react';
import { 
  Avatar, 
  Button, 
  Card, 
  Divider, 
  Menu, 
  MenuItem, 
  useMediaQuery, 
  useTheme, 
  Box, 
  Typography, 
  CircularProgress, 
  Paper 
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import api from '../../config/api';

const Sidebar = () => {
  // Stările și handler-ele pentru meniul de Logout
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Variabile pentru utilizator și navigare
  const userName = localStorage.getItem("userName") || 'user';
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    history.push('/login');
    window.location.reload(); // Reload page to update state
    handleClose();
  };

  // Stări locale pentru profil
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Funcția pentru fetch-ul profilului
  const fetchUserProfile = async (username) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      console.log(`Sending request to /user/${username} with token`, token);
      const response = await api.get(`/user/${username}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log("API response:", response.data);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      console.error("API error:", err);
      if (err.response && err.response.data) {
        setError(err.response.data);
      } else {
        setError(err.message);
      }
      setLoading(false);
    }
  };

  // Apelăm fetch-ul la montarea componentei
  useEffect(() => {
    fetchUserProfile(userName);
  }, [userName]);

  useEffect(() => {
    console.log("User state:", user);
  }, [user]);

  // Funcția care afișează detaliile profilului, cu mesajul de întâmpinare separat
  const renderProfileDetails = () => {
    if (loading) {
      return <CircularProgress />;
    }
    if (error) {
      console.error("Error state:", error);
      return <Typography color="error">{error}</Typography>;
    }
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          mt: 2,
        }}
      >
        {/* Chenarul cu mesajul de întâmpinare */}
        <Paper
          sx={{
            padding: 2,
            width: '100%',
            mb: 2,
            border: '1px solid #ccc',
            borderRadius: 2,
          }}
        >
          <Typography 
            variant="body1" 
            sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '18px' }}
          >
            Bine ai venit pe EScooter! La apasarea butonului Start, algoritmul aduna date legate de orientarea, accelerarea si locatia telefonului tau.
          </Typography>
        </Paper>

        {/* Chenarul pentru email și age */}
        <Paper sx={{ padding: 2, marginBottom: 1, width: '100%', border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="subtitle1">Email: {user?.email}</Typography>
        </Paper>
        <Paper sx={{ padding: 2, width: '100%', border: '1px solid #ccc', borderRadius: 2 }}>
          <Typography variant="subtitle1">Age: {user?.age}</Typography>
        </Paper>
      </Box>
    );
  };

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
          paddingLeft: '16px',
          paddingRight: isMobile ? '16px' : '0',
          marginBottom: '16px',
          textAlign: 'center'
        }}
      >
        <div style={{ marginBottom: '16px' }}>
          <span 
            className='logo' 
            style={{
              fontWeight: 'bold',
              fontSize: '32px',
              display: 'block'
            }}
          >
            EScooter
          </span>
        </div>
      </div>

      <div>
        {renderProfileDetails()}
        <Divider />
        {/* Header-ul de profil*/}
        <div style={{ 
          paddingLeft: '16px', 
          paddingTop: '16px', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" />
            <div>
              <p style={{ fontWeight: 'bold' }}>{user?.name}</p>
              <p style={{ opacity: '0.7' }}>@{userName}</p>
            </div>
          </div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </Card>
  );
};

export default Sidebar;
