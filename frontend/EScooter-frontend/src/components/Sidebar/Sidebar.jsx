import React from 'react';
import { Avatar, Button, Card, Divider, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { navigationMenu } from './SidebarNavigation';

const Sidebar = ({ userName }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    history.push('/login');
    window.location.reload(); // Reload page to update state
    handleClose();
  };

  const menuItems = navigationMenu(userName);

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
      <div style={{ paddingLeft: '16px', paddingRight: isMobile ? '16px' : '0', marginBottom: '16px' }}>
        <div style={{ marginBottom: '16px' }}>
          <span className='logo' style={{ fontWeight: 'bold', fontSize: '24px' }}>EScooter</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {menuItems.map((item, index) => (
            <Link key={index} to={item.path} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              {item.icon}
              <p style={{ fontSize: '16px' }}>{item.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <Divider />
        <div style={{ paddingLeft: '16px', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Avatar src="https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png" />
            <div>
              <p style={{ fontWeight: 'bold' }}>Nume User...</p>
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
}

export default Sidebar;
