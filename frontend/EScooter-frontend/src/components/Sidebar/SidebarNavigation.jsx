import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export const navigationMenu=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/home"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile/:id"
    },
    {
        title:"Ride",
        icon:<PlayArrowIcon/>,
        path:"/ride"
    }

]