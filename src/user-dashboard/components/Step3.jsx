import { Button, Grid, Checkbox, Paper } from '@mui/material';
import React, { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { addonServicesList, checkoutAddonServicesList, formatDollar } from '../../constant';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function Step3({ selectedAddons, setSelectedAddons, totalAddonPrice, setTotalAddonPrice, services, setServices, onNext, onPrev }) {

    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'))
    const [errors, setErrors] = useState({});
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleValue = (event, item) => {
        const amt = item?.amt
        console.log(event.target.checked);
        if (event.target.checked) {
            setTotalAddonPrice(prev => prev + amt);
            setServices(prev => [...prev, item]);
        } else {
            setTotalAddonPrice(prev => prev - amt);
            setServices(prev => prev.filter(service => service?.text !== item?.text));
        }
        const value = event.target.value;
        setSelectedAddons(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
    };

    const handleError = (error, label) => {
        setErrors(prev => ({ ...prev, [label]: error }));
    };

    // const validation = () => {
    //     let error = false;
    //     if (selectedAddons.length === 0) {
    //         error = true;
    //         handleError('Please select at least one addon', 'addons');
    //     }
    //     return error;
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('selectedAddons', JSON.stringify(selectedAddons))
        localStorage.setItem('totalAddonPrice', totalAddonPrice)
        onNext({ selectedAddons, totalAddonPrice, services });
    };

    const styles = {
        papersContainer: {
            marginBottom: '3%',
            display: 'flex',
            gap: '20px',
            width: '100%',
            flexWrap: 'wrap',
            justifyContent: 'center',
            textAlign: 'left'
        },
        paper: {
            width: isMobile ? '80%' : '250px',
            padding: '20px',
            background: 'white',
            borderRadius: '10px',
            border: '3px solid #F7F8F9',
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
            // backgroundColor: '#EA2024',
            color: '#EA2024',
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
        <div style={{ display: 'flex', justifyContent: 'center', width: matches_md ? '90vw' : '100%' }}>
            <div style={{ width: '100%' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <div style={{ fontWeight: 600, fontSize: 20, }}>Addons Details</div>
                            <span style={{ fontSize: 14, color: '#A1A5B7' }}>
                                Select all the additional services you need.
                            </span>
                        </Grid>

                        {checkoutAddonServicesList?.map((item, index) => (
                            <Grid key={index} item xs={12} style={{ marginTop: '', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Checkbox
                                        value={`${item.text}`}
                                        checked={selectedAddons.includes(`${item.text}`)}
                                        onChange={(e) => handleValue(e, item)}
                                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                                    />
                                    <span style={{ fontSize: 14 }}>{item.text}</span>
                                </div>
                                <div>{formatDollar(item.amt)} / {item?.duration}</div>
                            </Grid>
                        ))}

                        {/* <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', padding: 0 }}>
                            {
                                checkoutAddonServicesList?.map((service, index) => {
                                    return (
                                        <>
                                            <div key={index} style={styles.paper}>
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
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </div> */}

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>

                            <Button startIcon={<KeyboardBackspaceIcon />} onClick={onPrev} style={{ background: 'black', color: 'white', margin: '44px 0px 44px', borderRadius: '50px', padding: '1% 3%' }}>
                                Back
                            </Button>
                            <Button endIcon={<EastIcon />} onClick={handleSubmit} style={{ background: '#EA2024', color: 'white', margin: '44px 0px 44px auto', borderRadius: '50px', padding: '1% 3%' }}>
                                Next
                            </Button>

                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    );
}
