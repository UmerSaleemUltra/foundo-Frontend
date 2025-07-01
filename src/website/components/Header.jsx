import { Button, IconButton, useMediaQuery, Drawer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useSelector } from 'react-redux';
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoginIcon from "@mui/icons-material/Login";

const Header = () => {
  const navigate = useNavigate();
  const isTabletOrBelow = useMediaQuery('(max-width:970px)');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user_data } = useSelector((state) => state.user);

  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handlestartbusiness = () => {
    if (user_data?.is_user) {
      navigate('/dashboard');
    } else {
      navigate('/pricing');
    }
    window.scrollTo(0, 0);
  };

  const navLinks = [
   { label: "Home", path: "/", icon: <HomeOutlinedIcon fontSize="small" /> },
    {
      label: "Pricing",
      path: "/pricing",
      icon: <AttachMoneyIcon fontSize="small" />,
    },
 {
      label: "Contact",
      path: "/Contact",
      icon: <LiveHelpOutlinedIcon fontSize="small" />,
    },
    {
      label: "FAQ",
      path: "/faq",
      icon: <LiveHelpOutlinedIcon fontSize="small" />,
    },
    
  ];

  const styles = {
    container: {
      width: '100%',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      backgroundColor: 'white',
    },
    navContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isTabletOrBelow ? '0 10px' : '0 80px',
      height: 70,
    },
    logo: {
      width: isTabletOrBelow ? '200px' : '200px',
      cursor: 'pointer',
      marginLeft: isTabletOrBelow ? '-20px' : '-40px',
    },
    navItems: {
      display: isTabletOrBelow ? 'none' : 'flex',
      gap: '50px',
      color: 'black',
      fontSize: 15,
      cursor: 'pointer',
    },
    buttonContainer: {
      display: isTabletOrBelow ? 'none' : 'flex',
      gap: '10px',
    },
    getStartedButton: {
      background: '#EA580C',
      color: 'white',
      padding: '10px 15px',
      borderRadius: 3,
      boxShadow: 'none',
      '&:hover': {
        backgroundColor: '#C24505',
      },
    },
    menuIcon: {
      display: isTabletOrBelow ? 'block' : 'none',
      color: 'black',
      fontSize: '36px',
      marginLeft: 'auto',
      cursor: 'pointer',
    },
    drawerContent: {
      padding: '20px',
      backgroundColor: 'white',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    drawerNavItem: {
      fontSize: '18px',
      fontWeight: '400',
      cursor: 'pointer',
      color: 'black',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navContainer}>
        <img
          loading="lazy"
          src="/images/logo.png"
          alt="LOGO"
          style={styles.logo}
          onClick={() => navigate('/')}
        />

        <div style={styles.navItems}>
          {navLinks.map(({ label, path }) => (
            <span key={path} onClick={() => { navigate(path); window.scrollTo(0, 0); }}>
              {label}
            </span>
          ))}
        </div>

        <div style={styles.buttonContainer}>
          <Button onClick={handlestartbusiness} variant="contained" sx={styles.getStartedButton}>
            Get Started
          </Button>
          {user_data?.is_user ? (
            <Button onClick={() => navigate('/dashboard')} variant="contained" sx={styles.getStartedButton}>
              My Dashboard
            </Button>
          ) : (
            <Button onClick={() => navigate('/login')} variant="contained" sx={styles.getStartedButton}>
              Login
            </Button>
          )}
        </div>

        <IconButton style={styles.menuIcon} onClick={handleDrawerToggle}>
          <MenuIcon />
        </IconButton>
      </div>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        PaperProps={{ style: { width: 280 } }}
      >
        <div style={styles.drawerContent}>
          {navLinks.map(({ label, path, icon }) => (
            <div key={path} style={styles.drawerNavItem} onClick={() => { navigate(path); handleDrawerToggle(); }}>
              {label}
            </div>
          ))}

          <Button onClick={() => { handlestartbusiness(); handleDrawerToggle(); }} variant="contained" sx={styles.getStartedButton}>
            Get Started
          </Button>

          {user_data?.is_user ? (
            <Button onClick={() => { navigate('/dashboard'); handleDrawerToggle(); }} variant="contained" sx={styles.getStartedButton}>
              My Dashboard
            </Button>
          ) : (
            <Button onClick={() => { navigate('/login'); handleDrawerToggle(); }} variant="contained" sx={styles.getStartedButton}>
              Login
            </Button>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
