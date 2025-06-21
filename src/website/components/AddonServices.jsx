import { Paper, Button, Grid } from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { addonServicesList, formatDollar } from "../../constant";

const AddonServices = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate();

    const handleStartBusiness = () => {
        navigate('/pricing');
        window.scrollTo(0, 0)
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const styles = {
        container: {
            background: '#F7F8F9',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            flexDirection: 'column',
        },
        heading: {
            fontSize: isMobile ? 30 : '45px',
            color: '#000',
            textAlign: 'left',
            margin: 0,
            padding: 0,
        },
        papersContainer: {
            marginBottom: '3%',
            display: 'flex',
            gap: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            textAlign: 'left'
        },
        paper: {
            width: isMobile ? '80%' : '250px',
            padding: '20px',
            background: 'white',
            borderRadius: '10px',
            boxShadow: 'none',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        },
        title: {
            color: '#000',
            fontSize: '23px',
            fontWeight: 600,
            marginTop: '10%'
        },
        description: {
            fontSize: '14px',
            fontWeight: 300,
            marginTop: '5%',
            marginBottom: '5%',
        },
        button: {
            // backgroundColor: '#EA580C',
            color: '#EA580C',
            marginTop: '10px',
            textTransform: 'none',
            borderRadius: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'fit-content',
            // padding: '12px 15px',
        },
        buttonContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: '6%',
        },
        buttonIcon: {
            marginLeft: '5px',
        },
    };

    return (
        <>
            <img src="/images/wave.svg" style={{ width: '100%', marginBottom: isMobile ? '-3%' : '-1%' }} />
            <Grid container spacing={0} style={{
                background: '#F7F8F9',
                width: '100%',
                display: 'flex',
                justifyContent: 'left',
                textAlign: 'left',
                gap: 0,
                margin: 0,
                padding: isMobile ? '6% 7%' : '3% 7%'
            }}>
                <Grid item md={8}>
                    <div>
                        <h3 style={styles.heading}>Your One-Stop <br />Solution</h3>
                        <img src="/images/underline.svg" style={{ width: isMobile ? 300 : 400 }} />
                    </div>
                </Grid>
                <Grid item md={4}>
                    <div>
                        <p style={{ color: '#40483D', fontSize: 14 }}>
                            Simplify your business needs with our comprehensive range of services designed for entrepreneurs and professionals. We help you save time, stay compliant, and grow your business seamlessly.
                        </p>
                    </div>
                </Grid>
            </Grid>
            <div style={styles.container}>
                <div style={styles.papersContainer}>
                    {addonServicesList?.map((service, index) => (
                        <Paper key={index} style={styles.paper}>
                            <div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <img loading='lazy' src={service.image} alt={service.text} />
                                    <div style={{ fontWeight: 500, marginLeft: 'auto' }}>{formatDollar(service.amt)} {service?.duration}</div>
                                </div>
                                <div style={styles.title}>{service.text}</div>
                                <div style={styles.description}>
                                    {service.description}
                                </div>
                            </div>
                            <div style={styles.buttonContainer}>
                                <Button
                                    onClick={() => {
                                        handleStartBusiness();
                                        scrollToTop();
                                    }}
                                    style={styles.button}>
                                    Apply Now
                                    <ArrowForwardIcon style={styles.buttonIcon} />
                                </Button>
                            </div>
                        </Paper>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AddonServices;