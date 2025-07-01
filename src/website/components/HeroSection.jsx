import { Button, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { FaWhatsapp } from 'react-icons/fa6';


const HeroSection = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleStartBusiness = () => {
        navigate('/pricing');
        window.scrollTo(0, 0)
    };

    const styles = {
        container: {
            width: '100%',
            backgroundColor: 'white',
            boxSizing: 'border-box',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            marginTop: '2%',
            padding: isMobile ? '0 20px' : '0',

        },
        starContainer: {
            marginTop: isMobile ? '6%' : '3%',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: isMobile ? '20px' : '10px',


        },

        reviewText: {
            marginLeft: isMobile ? '15px' : '10px',
            marginTop: isMobile ? '3px' : '0',
            color: 'black',
            fontSize: isMobile ? '14px' : '16px',
            fontWeight: 'bold',

        },
        starIcon: {
            color: '#FFD700',
            fontSize: isMobile ? '18px' : '20px',
            justifyContent: 'center', // Use this for horizontal centering in flex
        },
        buttonContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: isMobile ? '10px' : '15px',
            marginTop: isMobile ? '20px' : '40px',
            flexDirection: isMobile ? 'column' : 'row',
        },

        
        startButton: {
            background: '#EA580C',
            color: 'white',
        padding: '10px 15px',
            borderRadius: 3,
            fontSize: isMobile ? '13px' : '14px',
            boxShadow: 'none',
            textTransform: 'capitalize',
            zIndex: 10,
            '&:hover': {
                boxShadow: 'none',
                backgroundColor: '#C24505',
            },
        },
        consultButton: {
            boxShadow: 'none',
                padding: '10px 15px',
            borderRadius: 3,
            borderColor: '#1CA650',
            color: '#000',
            textTransform: 'capitalize',
            backgroundColor: 'transparent',
            fontSize: isMobile ? '13px' : '14px',
            zIndex: 10,
            '&:hover': {
                boxShadow: 'none',
                borderColor: '#1CA650',

            },
        },
        imageContainer: {
            position: 'relative',
            top: isMobile ? '0%' : '-5%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        vectorImage: {
            position: 'absolute',
            left: isMobile ? '-2%' : '0',
            top: isMobile ? '-20%' : '-15%',
            width: isMobile ? '90%' : '',
        },
        overviewImage: {
            zIndex: 2,
            marginTop: isMobile ? '7%' : '3%',
            width: isMobile ? '95%' : '75%',
            borderRadius: '15px 15px 0 0 ',
        },
        newOverviewImage: {
            zIndex: 2,
            marginTop: isMobile ? '7%' : '3%',
            width: isMobile ? '95%' : '',
            // borderRadius: '15px 15px 0 0 ',
            // boxShadow: '0 0 30px rgb(219, 219, 219)'
        },
        trustText: {
            position: 'absolute',
            bottom: isMobile ? '0' : '2%',
            color: 'black',
            fontSize: isMobile ? '12px' : '15px',
            fontWeight: '500',
            textAlign: 'center',
            zIndex: 3,
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.starContainer}>
                <img src='/images/star.png' style={{ width: 100 }} />
            </div>
            <div>
                <h2
                    style={{
                        fontSize: isMobile ? '30px' : '55px',
                        textAlign: 'center',
                        lineHeight: '1.1',
                        color: '#000',
                        margin: isMobile ? '5% 0 4%' : '2% 0 4%',
                    }}
                >
                    {!isMobile && <>Launch your U.S. Company <br /> from anywhere in the World</>}
                    {isMobile && <>Launch your U.S. Company from anywhere in the World</>}
                </h2>
                <div
                    style={{
                        fontSize: isMobile ? '13px' : '17px',
                        fontWeight: '400',
                        textAlign: 'center',
                        lineHeight: '1.5',
                        opacity: '60%'
                    }}
                >
                    {!isMobile && <>Start your U.S. Company hassle-free, no matter where you are. <br /> With expert support at every step, we make it easy for you.</>}
                    {isMobile && <>Start your U.S. Company hassle-free, no matter where you are. With expert support at every step, we make it easy for you.</>}
                </div>
                <div style={styles.buttonContainer}>
                    <Button
                        endIcon={<IoIosArrowForward />}
                        variant="contained"
                        sx={styles.startButton}
                        onClick={handleStartBusiness} // Add onClick handler
                    >
                        Start Your business
                    </Button>
                    <a href={'https://api.whatsapp.com/send?phone=919770015304&text=Hi%20Leegal%20team!%20I%27m%20interested%20in%20registering%20my%20business%20in%20the%20United%20States.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20can%20get%20started%3F%0A'} target="_blank" rel="noopener noreferrer">
                        <Button variant="outlined" sx={styles.consultButton} startIcon={<FaWhatsapp color='#1CA650' />}>
                            WhatsApp Support
                        </Button>
                    </a>
                </div>
            </div>
            <div style={styles.imageContainer}>
                {/* <img loading='lazy' src="/images/Vector 1.svg" alt="Vector Image" style={styles.vectorImage} /> */}
                <img loading='lazy' src="/images/dashboard.png" alt="Overview Image" style={styles.overviewImage} />
                {/* <img loading='lazy' src="/images/dashboard-new.svg" alt="Overview Image" style={styles.newOverviewImage} /> */}
                {/* <img
                    src="/images/new-dashboard.svg"
                    alt="Dashboard Image"
                    style={{
                        ...styles.overviewImage,
                        position: 'absolute',
                        right: '10%',
                        zIndex: 1,
                        width: isMobile ? '60%' : '60%',
                    }}
                />
                <img
                    src="/images/new-dashboard.svg"
                    alt="Dashboard Image"
                    style={{
                        ...styles.overviewImage,
                        position: 'absolute',
                        left: '10%',
                        zIndex: 1,
                        width: isMobile ? '60%' : '60%',
                    }}
                /> */}
            </div>
            {/* <div style={styles.trustText}>Our business partners and affiliates.</div> */}
        </div>
    );
};

export default HeroSection;