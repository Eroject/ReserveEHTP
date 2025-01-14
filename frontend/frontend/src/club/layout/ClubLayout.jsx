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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import PieChartIcon from '@mui/icons-material/PieChart';
import { useUserContext } from '../../context/Context';
import { LOGIN_ROUTE } from '../../routes';
import AuthentificationApi from '../../service-authentification/AuthentificationApi';
import { Tooltip } from '@mui/material';
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
      ...((open && openedMixin(theme))),
      '& .MuiDrawer-paper': {
        ...(!open ? closedMixin(theme) : openedMixin(theme)),
        backgroundColor: '#EBEBEB', // Ajout de la couleur de fond
      },
    }),
  );
  const iconStyle = (isDrawerOpen) => ({
    width: '48px',
    height: '48px',
    padding: '8px',
    background: isDrawerOpen ? 'transparent' : '#FFFFFF', // Désactive le carré blanc si Drawer est ouvert
    borderRadius: '9px',
  });

  
export default function ClubLayout() {
    const {logout: contextLogout ,user } = useUserContext()
    const navigate = useNavigate()
    const logout = async () => {
        AuthentificationApi.logout().then( () => {
            contextLogout()
            navigate(LOGIN_ROUTE)
        })
    }
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menuItems = [
    { text: 'Dashboard', route: "/club", icon: <HomeIcon /> },
    { text: 'Calendrier', route: "/club", icon: <EventIcon /> },
    { text: 'Send email', route: '/admin/send-email', icon: <PieChartIcon /> },
    { text: 'Drafts', route: '/admin/drafts', icon: <InboxIcon /> },
    { text: 'Drafts', route: '/admin/drafts', icon: <InboxIcon /> },
  ];
//<Divider />
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
      backgroundColor: '#585858', // Ajoute la couleur de fond ici
      padding: '20px',
      width: '65px', // Ajuste le padding pour avoir un carré autour de l'icône
      borderRadius: '0.1px', // Bordures légèrement arrondies pour un effet carré
      '&:hover': {
        backgroundColor: '#7E7E7E', // Fond rouge lors du survol
      },
    },
    open && { display: 'none' },
  ]}
>
  <MenuIcon />
</IconButton>


    {/* Afficher le texte seulement si le menu est fermé */}
    {!open && (
      <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{ color: '#444444' }} // Ajout de la couleur
    >
      Welcome {user.firstname} {user.lastname}
    </Typography>
    )}
    <Box sx={{ flexGrow: 1 }} /> {/* Espace entre le texte et les icônes */}

    

    <IconButton color="inherit" aria-label="logout" onClick={logout}>
            <LogoutIcon sx={{ color: '#000000' }} />
          </IconButton>

    <IconButton color="inherit" aria-label="home" sx={{ marginRight: 2 }}>
      <PermIdentityIcon sx={{ color: '#000000' }} /> {/* Icône en noir */}
    </IconButton>
  </Toolbar>
</AppBar>
<Divider />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
          <CloseIcon />
          </IconButton>
          @ logo ehtp reminder
        </DrawerHeader>
        <Divider />
        <List>



        {menuItems.map((item) => (
  <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
    <Tooltip title={item.text} placement="right" arrow disableHoverListener={open}>
      <ListItemButton
        component={Link} // Utilisation de Link pour le bouton
        to={item.route} // Route dynamique
        sx={[
          {
            minHeight: 48,
            px: 2.5,
          },
          open
            ? {
                justifyContent: 'initial',
              }
            : {
                justifyContent: 'center',
              },
        ]}
      >
        <ListItemIcon
          sx={{
            ...iconStyle(open), // Style conditionnel
            minWidth: 0,
            justifyContent: 'center',
            alignItems: 'center', // Centrage vertical
            display: 'flex', // Ajout pour flexibilité
          }}
        >
          {item.icon} {/* Icône dynamique */}
        </ListItemIcon>
        <ListItemText
          primary={item.text} // Texte dynamique
          sx={[
            {
              margin: 0, // Supprime les marges
              lineHeight: '48px', // Alignement vertical avec l'icône
            },
            open
              ? {
                  opacity: 1,
                  paddingLeft: '16px', // Ajoute un espace entre l'icône et le texte
                }
              : {
                  opacity: 0,
                },
          ]}
        />
      </ListItemButton>
    </Tooltip>
  </ListItem>
))}

</List>
        <Divider />
        
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Outlet/>
      </Box>
    </Box>
  );
}
