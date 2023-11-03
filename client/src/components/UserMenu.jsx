import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider'
import { Box } from '@mui/system';
import { Avatar, Menu, MenuItem, Typography } from '@mui/material';

const UserMenu = () => {
    const { user: { displayName, photoUrl, auth } } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    // console.log("user: ", user);

    const handleLogout = () => {
        auth.signOut();
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    }

    return (
        <>
            <Box sx={{display:'flex'}} onClick={handleClick}>
                <Typography>{displayName}</Typography>
                <Avatar alt='avatar' src={photoUrl} sx={{width:24, height:24,marginLeft:'5px'}}/>
            </Box>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    )
}

export default UserMenu
