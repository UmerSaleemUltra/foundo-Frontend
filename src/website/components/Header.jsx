import { Button, IconButton, useMediaQuery, Drawer, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useSelector } from 'react-redux';


const Header = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user_data } = useSelector((state) => state.user);


    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    

    const handlecontactbuzzfilling  = () => {
  const phoneNumber = "923394882800"; // Without '+' and spaces
  const message = "Hi Buzz Filing team! I'm interested in registering my business in the United States. Could you please share more details on how I can get started?";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
};


    const styles = {
        container: {
            width: '100%',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
        },
        headerBar: {
            background: 'black',
            color: 'white',
            padding: '10px',
            fontSize: matches_md ? '10px' : 14,
            height: matches_md ? 'fit-content' : '',
            textAlign: 'center',
        },
        navContainer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: matches_md ? '0 10px' : '0 80px',
            height: 70,
        },
        logo: {
            width: matches_md ? '40%' : '15%',
            cursor: 'pointer',
        },
        navItems: {
            display: matches_md ? 'none' : 'flex',
            gap: '50px',
            color: 'black',
            fontSize: 15,
            cursor: 'pointer',
        },
        buttonContainer: {
            display: matches_md ? 'none' : 'flex',
            gap: '10px',
        },
        signInButton: {
            borderColor: '#EA2024',
            padding: '7px 0',
            color: '#EA2024',
            borderRadius: 3,
            '&:hover': {
                borderColor: '#EA2024',
                backgroundColor: 'white',
            },
            '&:focus': {
                outline: 'none',
                borderColor: '#EA2024',
            },
        },
        getStartedButton: {
            background: '#EA2024',
            color: 'white',
            padding: '10px 15px',
            borderRadius: 3,
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: '#d0191f',
                boxShadow: 'none',
            },
            '&:focus': {
                outline: 'none',
                backgroundColor: '#EA2024',
            },
        },
        divider: {
            width: '100%',
            height: '1px',
            backgroundColor: '#BDBDBD',
        },
        menuIcon: {
            display: matches_md ? 'block' : 'none',
            fontSize: '36px',
            color: 'black',
            cursor: 'pointer',
            marginLeft: 'auto',
        },
        drawerContent: {
            display: 'flex',
            flexDirection: 'column',
            padding: '20px',
            gap: '10px',
            backgroundColor: 'white',
            color: 'black',
        },
        drawerNavItem: {
            color: 'black',
            fontSize: '18px',
            textDecoration: 'none',
            cursor: 'pointer',
            padding: '10px 0',
            fontWeight: '400',
        },
        drawerButtonContainer: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            marginTop: '20px',
        },
    };

    return (
        <div style={styles.container}>
          
            <div style={styles.navContainer}>
                <img loading="lazy" src="/images/buzz-filling-logo.png" alt="LOGO" style={styles.logo} onClick={() => navigate('/')} />
                <div style={styles.navItems}>
                    <span onClick={() => {
                        navigate('/');
                        window.scrollTo(0, 0);
                    }}>Home</span>
                    <span onClick={() => {
                        navigate('/pricing');
                        window.scrollTo(0, 0);
                    }}>Pricing</span>
                    <span onClick={() => {
                        navigate('/about');
                        window.scrollTo(0, 0);
                    }}>About</span>
                    <span onClick={() => {
                        navigate('/faq');
                        window.scrollTo(0, 0);
                    }}>FAQ</span>
                </div>
                <div style={styles.buttonContainer}>
                    {/* <Button variant="outlined" sx={styles.signInButton}>Sign In</Button> */}
                    <Button
                        onClick={handlecontactbuzzfilling} // Add onClick handler
                        variant="contained" sx={styles.getStartedButton}>Get Started</Button>
                         {user_data?.is_user ? (
                <Button
                    onClick={() => {
                        navigate('/dashboard');
                        window.scrollTo(0, 0);
                    }}
                    variant="contained"
                    sx={styles.getStartedButton}
                >
                    My Dashboard
                </Button>
            ) : (
                <Button
                    onClick={() => navigate('/login')}
                    variant="contained"
                    sx={styles.getStartedButton}
                >
                    Login
                </Button>
            )}
                </div>
                <IconButton style={styles.menuIcon} onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
            </div>
            <div style={styles.divider}></div>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    style: {
                        backgroundColor: 'white',
                        color: 'black',
                        width: '280px',
                    },
                }}
            >
                <div style={styles.drawerContent}>
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/'); handleDrawerToggle(); }}>Home</div>
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/pricing'); handleDrawerToggle(); }}>Pricing</div>
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/about'); handleDrawerToggle(); }}>About</div>
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/faq'); handleDrawerToggle(); }}>FAQ</div>
                    <div style={styles.drawerButtonContainer}>
                        {/* <Button variant="outlined" sx={styles.signInButton}>Sign In</Button> */}
                        <Button
                            onClick={handlecontactbuzzfilling} // Add onClick handler
                            variant="contained" sx={styles.getStartedButton}>Get Started</Button>

                             {user_data?.is_user ? (
                <Button
                    onClick={() => {
                        navigate('/dashboard');
                        window.scrollTo(0, 0);
                    }}
                    variant="contained"
                    sx={styles.getStartedButton}
                >
                    My Dashboard
                </Button>
            ) : (
                <Button
                    onClick={() => navigate('/login')}
                    variant="contained"
                    sx={styles.getStartedButton}
                >
                    Login
                </Button>
            )}
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Header;