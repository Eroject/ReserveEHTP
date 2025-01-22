import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PieChartIcon from '@mui/icons-material/PieChart';
import CloseIcon from '@mui/icons-material/Close';
import { Outlet } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link } from 'react-router-dom';
// import { useUserContext } from '../context/Context';
// import { Link, Outlet /* , useNavigate */ } from 'react-router-dom';
// import AuthentificationApi from '../services/Api/AuthentificationApi';
import { CLUB_SEND_REQUEST_ROUTE, CLUB_REQUEST_HISTORY_ROUTE } from '../routes';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(!open && closedMixin(theme)),
    ...(open && openedMixin(theme)),
    '& .MuiDrawer-paper': {
      ...(!open ? closedMixin(theme) : openedMixin(theme)),
      backgroundColor: '#EBEBEB',
    },
  })
);

const iconStyle = (isDrawerOpen) => ({
  width: '48px',
  height: '48px',
  padding: '8px',
  background: isDrawerOpen ? 'transparent' : '#FFFFFF',
  borderRadius: '9px',
});

export default function ClubDashboard() {
  // const { logout: contextLogout, user } = useUserContext();  // Si nécessaire, décommentez cette ligne pour la gestion de l'utilisateur
  // const navigate = useNavigate();  // Décommentez si vous utilisez la navigation dans le code

  // const logout = async () => {  // Si la fonction de déconnexion est nécessaire, décommentez
  //   AuthentificationApi.logout().then(() => {
  //     contextLogout();
  //     navigate(LOGIN_ROUTE);
  //   });
  // };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { text: 'réservation', route: CLUB_SEND_REQUEST_ROUTE, icon: <EventIcon /> },
    { text: 'suivi', route: CLUB_REQUEST_HISTORY_ROUTE, icon: <PieChartIcon /> },
  ];
  
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid rgb(224, 224, 224)',
          boxShadow: 'none',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
                marginLeft: -3,
                backgroundColor: '#585858',
                padding: '20px',
                width: '65px',
                borderRadius: '0.1px',
                '&:hover': {
                  backgroundColor: '#7E7E7E',
                },
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
  
          {!open && (
            <Typography variant="h6" noWrap component="div" sx={{ color: '#444444' }}>
              Bonjour {/* {user.firstname} {user.lastname} */}
            </Typography>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <IconButton color="inherit">
            <LogoutIcon sx={{ color: '#000000' }} />
          </IconButton>
          <IconButton color="inherit" sx={{ marginRight: 2 }}>
            <PermIdentityIcon sx={{ color: '#000000' }} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <CloseIcon />
          </IconButton>
          <img src="/pictures/ehtp_logo.png" alt="Logo EHTP" style={{height:"100%", width:"100%", marginLeft:"0"}}/>
        </DrawerHeader>
        <Divider />
        <List>
  {menuItems.map((item) => (
    <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        component={Link}
        to={item.route}
        sx={{
          justifyContent: 'center',
          minHeight: 72, // Plus d'espace pour texte + icône
          display: 'flex',
          flexDirection: 'column', // Empile icône et texte
          alignItems: 'center',
        }}
      >
        <ListItemIcon
          sx={{
            justifyContent: 'center',
            display: 'flex',
            minWidth: 0,
          }}
        >
          {item.icon}
        </ListItemIcon>
        <ListItemText
          primary={item.text}
          primaryTypographyProps={{
            variant: 'caption', // Petite taille de texte
            textAlign: 'center',
            color: '#000', // Couleur du texte
          }}
          sx={{
            opacity: 1, // Toujours visible
            marginTop: '4px', // Espace entre icône et texte
          }}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>

        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
  
  
}
