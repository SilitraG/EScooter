import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../Redux/User/user.action';
import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Profile = () => {
    const location = useLocation();
    const userName = location.state?.userName || 'user'; // fallback to 'user' if userName is not provided
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector(state => state.user);

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log("Token from localStorage:", token); // Verifică token-ul din localStorage
        if (!token) {
            console.error("No token found in localStorage");
        }
        console.log("Fetching profile for:", userName); // log the username being fetched
        dispatch(fetchUserProfile(userName));
    }, [dispatch, userName]);

    useEffect(() => {
        console.log("User state:", user); // log user state changes
    }, [user]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        console.error("Error state:", error); // log error state
        return <Typography color="error">{error}</Typography>;
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 2,
                border: '1px solid #ccc',
                borderRadius: 2,
                maxWidth: 600,
                margin: '0 auto'
            }}
        >
            <Paper sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
                <Typography variant="h6">Name: {user.name}</Typography>
            </Paper>
            <Paper sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
                <Typography variant="h6">Email: {user.email}</Typography>
            </Paper>
            <Paper sx={{ padding: 2, marginBottom: 2, width: '100%' }}>
                <Typography variant="h6">Username: {user.username}</Typography>
            </Paper>
            <Paper sx={{ padding: 2, width: '100%' }}>
                <Typography variant="h6">Age: {user.age}</Typography>
            </Paper>
        </Box>
    );
};

export default Profile;
