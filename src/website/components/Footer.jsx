import * as React from 'react';
import { Button, Grid, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import ListItemText from '@mui/material/ListItemText';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from 'react-icons/fa6';
import { primaryColor } from '../../constant';

export default function Footer(props) {

    var navigate = useNavigate()
    const [dense, setDense] = React.useState(false);
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const companyItems = [
        {
            title: 'Home',
            link: '/'
        },
        {
            title: 'Pricing',
            link: '/pricing'
        },
        {
            title: 'FAQ',
            link: '/faq'
        },
    ]

    const addonsItems1 = [
        'Premium Business Address',
        'ITIN Application',
        'Annual Report Filing',
        'Seller Permit / Resale Certificate',
    ]

    const addonsItems2 = [
        'US Dedicated IP VPS',
        'Business Website Setup',
        'Company Dissolution',
        'Company Amendment',
    ]

    const handleItemClick = (item) => {
        navigate(item?.link)
        window.scrollTo(0, 0)
    }

    return (
        <div>
            <div className='footerSec' style={{ padding: matches_md ? '10% 5%' : '6% 10%' }}>
                <Grid container spacing={1}>
                    <Grid item md={2} style={{ width: '50%' }}>
                        <Typography style={{ fontWeight: 600 }}>
                            Company
                        </Typography>
                        <List dense={dense} style={{ marginTop: '2%', opacity: '70%' }}>
                            {
                                companyItems.map((item) => {
                                    return (
                                        <ListItem style={{ paddingLeft: 0, padding: '0', cursor: 'pointer' }}>
                                            <ListItemText onClick={() => handleItemClick(item)}><span className='listItem'>{item?.title}</span></ListItemText>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Grid>

                    <Grid item md={3} style={{ width: '50%' }}>
                        <Typography style={{ fontWeight: 600 }}>
                            Addons Services
                        </Typography>
                        <List dense={dense} style={{ marginTop: '2%', opacity: '70%' }}>
                            {
                                addonsItems1.map((item) => {
                                    return (
                                        <ListItem style={{ paddingLeft: 0, padding: '0', cursor: 'pointer' }}>
                                            <ListItemText onClick={handleItemClick}><span className='listItem'>{item}</span></ListItemText>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Grid>

                    <Grid item md={3} style={{ width: '30%', marginTop: matches_md ? '5%' : 0 }}>
                        <Typography style={{ fontWeight: 600 }}>

                        </Typography>
                        <List dense={dense} style={{ marginTop: !isMobile ? '10%' : '2%', opacity: '70%' }}>
                            {
                                addonsItems2.map((item) => {
                                    return (
                                        <ListItem style={{ paddingLeft: 0, padding: '0', cursor: 'pointer' }}>
                                            <ListItemText onClick={handleItemClick}><span className='listItem'>{item}</span></ListItemText>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </Grid>


                    <Grid item md={2} style={{ width: '30%', marginTop: matches_md ? '5%' : 0 }}>
                        <Typography style={{ fontWeight: 700 }}>
                            Legal
                        </Typography>
                        <List dense={dense} style={{ marginTop: '2%', opacity: '70%' }}>
                            <ListItem style={{ paddingLeft: 0, padding: '0', cursor: 'pointer' }}>
                                <ListItemText onClick={() => { navigate('/privacy-policy'); window.scrollTo(0, 0); }}><span className='listItem'>Privacy Policy</span></ListItemText>
                            </ListItem>
                            <ListItem style={{ paddingLeft: 0, padding: '0', cursor: 'pointer' }}>
                                <ListItemText onClick={() => { navigate('/terms-and-conditions'); window.scrollTo(0, 0); }}><span className='listItem'>Terms and Conditions</span></ListItemText>
                            </ListItem>
                        </List>
                    </Grid>

                    <Grid item md={2} style={{ width: '30%', marginTop: matches_md ? '5%' : 0 }}>
                        <Typography style={{ fontWeight: 700 }}>
                            Follow us
                        </Typography>
                        <div style={{ marginTop: '5%', display: 'flex', gap: 10 }}>
                            <a href='https://www.facebook.com/leegal.co' target='_blank'><FaFacebook style={{ fontSize: 22, opacity: '100%', marginRight: '3%', color: primaryColor }} /></a>
                            <a href='https://www.linkedin.com/company/leegal-co/' target='_blank'><FaLinkedin style={{ fontSize: 22, opacity: '100%', marginRight: '3%', color: primaryColor }} /></a>
                            <a href='https://www.instagram.com/leegal.co/' target='_blank'><FaInstagram style={{ fontSize: 22, opacity: '100%', marginRight: '3%', color: primaryColor }} /></a>
                        </div>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%', margin: '3% 0' }} />

                <Grid container spacing={2} style={{ padding: matches_md ? '5% 0' : 0 }}>
                    <Grid item md={8}>
                        <Typography style={{ fontWeight: 600, fontSize: '23px' }}>
                            Instant Support via WhatsApp
                        </Typography>
                        <p style={{ opacity: '70%', fontSize: '15px', margin: 0 }}>Reach out to us directly on WhatsApp for quick support. We're here to help!</p>
                    </Grid>
                    <Grid item md={4}>
                        <a href={"https://api.whatsapp.com/send?phone=919770015304&text=Hi%20Leegal%20team!%20I%27m%20interested%20in%20registering%20my%20business%20in%20the%20United%20States.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20can%20get%20started%3F%0A"} target="_blank" rel="noopener noreferrer">
                            <Button variant="outlined" startIcon={<FaWhatsapp color='#1CA650' />} style={{
                                boxShadow: 'none',
                                padding: isMobile ? '15px 45px' : '12px 20px',
                                borderRadius: '50px',
                                borderColor: '#1CA650',
                                color: '#000',
                                textTransform: 'capitalize',
                                backgroundColor: 'transparent',
                                fontSize: isMobile ? '13px' : '14px',
                                zIndex: 10,
                                '&:hover': {
                                    boxShadow: 'none',
                                    borderColor: '#d0191f',

                                }
                            }}>
                                WhatsApp Support
                            </Button>
                        </a>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%', margin: '3% 0' }} />

                <Grid container spacing={3}>
                    <Grid item md={4}>
                        <img src='/images/new.png' style={{ width: '50%', marginLeft: '-6%', marginTop : '-50%' }} />
                        <p style={{ opacity: '70%', fontSize: '15px', marginTop : '-20px' }}>
                            Get your U.S. company today, With our expert support at every step, we make it easy to get your company online and running smoothly.
                        </p><br />
                        <div style={{
                            opacity: '70%',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center'
                        }}><MailIcon fontSize='small' style={{ marginRight: '3%' }} />info@leegal.co</div>

                        <div style={{
                            opacity: '70%',
                            fontSize: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '3%'
                        }}><PhoneIcon fontSize='small' style={{ marginRight: '3%' }} />+91 9770015304</div>
                    </Grid>



                    <Grid item md={8}>
                        <p style={{ opacity: '70%' }}>© 2025 Leegal. All rights reserved.</p>

                        <p style={{ opacity: '70%' }}>Leegal products may not be available to all customers. Terms of Condition apply and are subject to change.</p>

                        <p style={{ opacity: '70%', fontSize: '15px' }}>
                            We are not a law firm, nor can we offer official legal advice. What you see on our website, and any of our communication over email, Whatsapp, Slack, SMS, Zoom call, Intercom, social media is purely for general and educational matters, and should not be taken as official legal advice. By using our website and service, you are explicitly accepting our Terms of Service, Privacy Policy.
                        </p>
                    </Grid>
                </Grid>



            </div>
        </div>
    )
}