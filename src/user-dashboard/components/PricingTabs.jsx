import * as React from 'react';
import { Grid, Button } from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

export default function PricingTabs(props) {

    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'))
    const { user_data } = useSelector(state => state.user);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const navigate = useNavigate()

    const businessItems = [
        {
            icon: <DoneIcon />,
            title: 'Name Check and Clearance'
        },
        {
            icon: <DoneIcon />,
            title: 'Registered Agent for 1 Year'
        },
        {
            icon: <DoneIcon />,
            title: 'Business Address'
        },
        {
            icon: <DoneIcon />,
            title: 'LLC State Filing'
        },
        {
            icon: <DoneIcon />,
            title: 'All Government Fees'
        },
        {
            icon: <DoneIcon />,
            title: 'Tax Registration - EIN'
        },
        // {
        //     icon: <DoneIcon />,
        //     title: 'Business Bank Account'
        // },
        {
            icon: <DoneIcon />,
            title: 'Digital Document Access'
        },
        {
            icon: <DoneIcon />,
            title: 'Digital Business Bank Account'
        }
    ];


    const premiumItems = [
        {
            icon: <DoneIcon />,
            title: 'Starter Package Included'
        },
        {
            icon: <DoneIcon />,
            title: 'Unique Business Address (Annually)'
        },
        {
            icon: <DoneIcon />,
            title: 'Reseller Certificate / Seller Permit'
        },
        {
            icon: <DoneIcon />,
            title: 'Dedicated IP VPS - 1 Month'
        }
    ]

    const state = props?.state
    const fee = props?.fee

    return (
        <Grid container spacing={matches_md ? 1 : 3} className='pricingPackage' id='pricing'>

            {
                state ? <></> :

                    <Grid item xs={12}>
                        <h2 className='featuresHeading' style={{ textAlign: matches_md ? 'left' : 'center', padding: matches_md ? '0 2%' : '' }}>Simplified<span className='gradientText'> Pricing </span>for all your needs</h2>
                        <p className='featuresPara' style={{ marginTop: '1%', marginBottom: '1%', textAlign: matches_md ? 'left' : 'center', padding: matches_md ? '0 2%' : '' }}>Get upfront, clear pricing for starting and running your business.</p><br />
                    </Grid>

            }


            <Grid item xs={12} >
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <h2 className='featuresHeading' style={{ fontSize: matches_md ? 25 : 30, textAlign: 'center', marginBottom: matches_md ? '5%' : 0 }}>
                        {state ?
                            <><span className='gradientText'>{state}</span> One-Stop LLC Formation</> : ''
                        }
                    </h2>
                </div>
            </Grid>

            <Grid item md={6} style={{ width: '100%', }}>
                <Grid style={{ height: '100%', }} container spacing={0} className='business'>


                    <Grid item xs={12} className='tabLeftCol'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2%' }}>
                            <h3 style={{ fontWeight: 500, fontSize: '20px', marginBottom: '0' }}>Launch Your US Business 🚀</h3>
                        </div>
                        <h3 style={{ fontWeight: 600, fontSize: '40px' }}>${state ? fee + 249 : '249'} <span style={{ fontWeight: 400, fontSize: '20px', opacity: '80%' }}>
                            {state ? 'One Time' : '+ State Fees'}
                        </span></h3>
                        <p className='pricingContent' style={{ marginTop: '0' }}>
                            Our price covers all processing, document preparation, and related services.
                        </p>
                        <Button
                            onClick={() => {
                                if (user_data?._id) {
                                    navigate('/create-account');
                                    window.scrollTo(0, 0);
                                    localStorage.setItem('selectedState', JSON.stringify(props?.state));
                                    localStorage.setItem('selectedStateFee', JSON.stringify(props?.fee));
                                    localStorage.setItem('selectedPlan', 'One-Stop');
                                    localStorage.setItem('selectedPlanAmount', JSON.stringify(props?.fee + 249));
                                }
                                else {
                                    navigate('/login');
                                    window.scrollTo(0, 0);
                                }
                            }}
                            fullWidth variant='contained' className='globalButton' style={{
                                background: 'linear-gradient(to right, #EA2024, #EA2024)',
                                padding: '3% 4%',
                                margin: '7% 0 5%',
                                borderRadius: 14,
                                boxShadow: 'none'
                            }}>Get Started</Button>

                        {
                            businessItems.map((item, i) => {
                                return (
                                    <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0' }}>
                                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                            <span style={{ marginRight: '2%' }}><DoneIcon fontSize='medium' /></span>
                                            <span className='pricingContent' style={{ fontSize: '16px', padding: 0, margin: 0 }}>{item.title}</span>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid>

            {/* <Grid item md={6} style={{ width: '100%' }}>
                <Grid style={{ height: '780px' }} container spacing={0} className='premium'>
                    <Grid item xs={12} className='tabLeftCol'>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '2%' }}>
                            <h3 style={{ fontWeight: 500, fontSize: '20px', marginBottom: '0' }}>Advance 🎯</h3>
                        </div>
                        <h3 style={{ fontWeight: 600, fontSize: '40px' }}>${state ? fee + 249 : '249'} <span style={{ fontWeight: 400, fontSize: '20px' }}>
                            {state ? 'One Time' : '+ State Fees'}
                        </span></h3>
                        <p className='pricingContent' style={{ marginTop: '0' }}>
                            Perfect for Amazon Businesses and Marketplace Sellers
                        </p>
                        <Button
                            onClick={() => {
                                navigate('/dashboard/order');
                                window.scrollTo(0, 0)
                                localStorage.setItem('selectedState', JSON.stringify(props?.state));
                                localStorage.setItem('selectedStateFee', JSON.stringify(props?.fee));
                                localStorage.setItem('selectedPlan', 'Advance');
                                localStorage.setItem('selectedPlanAmount', JSON.stringify(props?.fee + 249));
                            }}
                            fullWidth variant='contained' className='globalButton' style={{
                                background: 'white',
                                color: 'black',
                                padding: '3% 4%',
                                borderRadius: 14,
                                margin: '7% 0 5%',
                                boxShadow: 'none'
                            }}>Go Advance</Button>

                        {
                            premiumItems.map((item, i) => {
                                return (

                                    <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0' }}>
                                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
                                            <span style={{ marginRight: '2%' }}><DoneIcon fontSize='medium' /></span>
                                            <span className='pricingContent' style={{ fontSize: '16px', padding: 0, margin: 0 }}>{item.title}</span>
                                        </Grid>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Grid>
            </Grid> */}

        </Grid>
    );
}