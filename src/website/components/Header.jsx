import { Button, IconButton, useMediaQuery, Drawer, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";
import { useSelector } from "react-redux";

const Header = () => {

    const navigate = useNavigate();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);
    const { user_data } = useSelector(state => state.user);

    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleStartBusiness = () => {
        navigate('/pricing');
        window.scrollTo(0, 0)
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
            padding: matches_md ? '0 10px' : '0 60px',
            height: matches_md ? 60 : 70,
            background: '#FEF2F3',
            width: matches_md ? '90%' : '80%',
            margin: '2% auto 0',
            borderRadius: '50px'
        },
        logo: {
            width: matches_md ? '25%' : '12%',
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
            textTransform: 'capitalize',
            padding: '7px 20px',
            borderRadius: '50px',
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
        loginButton: {
            background: '#fff',
            border: '1px solid #E7E7E7',
            color: '#000',
            padding: '7px 20px',
            borderRadius: '50px',
            textTransform: 'capitalize',
            boxShadow: 'none',
            '&:hover': {
                backgroundColor: 'black',
                boxShadow: 'none',
                border: '1px solid #000',
                color: 'white'
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
            {/* <div style={styles.headerBar}>
                Use Coupon Code: START50 and get exclusive $50 Discount instantly 🎉. Available for a Limited Time!
            </div> */}
            <div style={styles.navContainer}>
                <img loading="lazy" src="/images/logo.svg" alt="LOGO" style={styles.logo} onClick={() => navigate('/')} />
                <div style={styles.navItems}>
                    <span onClick={() => {
                        navigate('/');
                        window.scrollTo(0, 0);
                    }}>Home</span>
                    <a href="/pricing" style={{ textDecoration: 'none', color: 'black' }}><span>Pricing</span></a>
                    <a href="/faq" style={{ textDecoration: 'none', color: 'black' }}><span>FAQ</span></a>
                    {/* <a href="/about" style={{ textDecoration: 'none', color: 'black' }}><span>About</span></a> */}
                    <a href="https://blog.leegal.co/" target="_blank" style={{ textDecoration: 'none', color: 'black' }}><span>Blog</span></a>
                </div>
                <div style={styles.buttonContainer}>
                    {
                        user_data?.is_user ? (
                            <Button
                                onClick={() => { navigate('/dashboard'); window.scrollTo(0, 0) }}
                                variant="contained" sx={styles.getStartedButton}>My Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => navigate('/login')}
                                    variant="contained" sx={styles.loginButton}>Login
                                </Button>
                                <Button
                                    onClick={handleStartBusiness}
                                    variant="contained" sx={styles.getStartedButton}>Start Your business
                                </Button>
                            </>
                        )
                    }
                </div>
                <IconButton style={styles.menuIcon} onClick={handleDrawerToggle}>
                    <MenuIcon />
                </IconButton>
            </div>
            {/* <div style={styles.divider}></div> */}
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
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/'); window.scrollTo(0, 0); handleDrawerToggle(); }}>Home</div>
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/pricing'); window.scrollTo(0, 0); handleDrawerToggle(); }}>Pricing</div>
                    <div style={styles.drawerNavItem} onClick={() => { navigate('/faq'); window.scrollTo(0, 0); handleDrawerToggle(); }}>FAQ</div>
                    <a href="https://blog.leegal.co/" target="_blank" style={{ textDecoration: 'none' }}><div style={styles.drawerNavItem} onClick={() => { handleDrawerToggle(); }}>Blog</div></a>
                    <div style={styles.drawerButtonContainer}>
                        {
                            user_data?.is_user ? (
                                <Button
                                    onClick={() => { navigate('/dashboard'); window.scrollTo(0, 0) }}
                                    variant="contained" sx={styles.getStartedButton}>My Dashboard
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        onClick={() => navigate('/login')}
                                        variant="contained" sx={styles.loginButton}>Login
                                    </Button>
                                    <Button
                                        onClick={handleStartBusiness}
                                        variant="contained" sx={styles.getStartedButton}>Get Started
                                    </Button>
                                </>
                            )
                        }
                    </div>
                </div>
            </Drawer>
        </div>
    );
};

export default Header;