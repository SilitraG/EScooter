import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const navigationMenu = (username) => [
    {
        title: "Home",
        icon: <HomeIcon />,
        path: {
            pathname: "/home",
            state: { userName: username }
        }
    },
    {
        title: "Profile",
        icon: <AccountCircleIcon />,
        path: {
            pathname: "/profile",
            state: { userName: username }
        }
    },
    {
        title: "Ride",
        icon: <PlayArrowIcon />,
        path: {
            pathname: "/ride",
            state: { userName: username }
        }
    }
];
