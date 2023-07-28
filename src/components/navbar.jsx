
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import profile from "../images/profile.png"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';

import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AddIcon from '@mui/icons-material/Add';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Drawer from "./drawer"
import "../App.css"
import { Link } from 'react-router-dom';
import AccountMenu from "./accountmenu"
//Styled Component
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  
  marginRight: 400,
 
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: '600px',
    borderRadius:"18px"
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));


export default function SearchAppBar({handleSearch,name }) {
  
  const [state, setState] = React.useState({
   
    left: false,

    
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          
          <Drawer color="inherit" left={state.left}/>
          
          <YouTubeIcon/>
         <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
          
           <Link 
      to="/"
      style={{ textDecoration: 'none' }}
      className="custom-link"
    >
      Youtube
    </Link>
          </Typography>
          
          <Search onKeyDown={handleSearch} >
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Tooltip title="Create" arrow> <Button color="inherit"><AddIcon/></Button>  </Tooltip>
        
          <Tooltip title="Notifications" arrow> <Button color="inherit">
            <NotificationsIcon/></Button>  </Tooltip> 
          <Button color="inherit">
          <AccountMenu name={name}/>
</Button>  
        </Toolbar>
      </AppBar>
     
    </Box>
  );
}
