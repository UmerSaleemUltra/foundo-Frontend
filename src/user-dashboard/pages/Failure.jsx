import * as React from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { primaryColor } from '../../constant';
import AboutComp from '../../website/components/AboutComp';
import Contact from '../../website/components/Contact';
import Footer from '../../website/components/Footer';
import Header from '../../website/components/Header';


export default function Failure() {

    const isDesktop = useMediaQuery('(min-width: 768px)');

    const success_box = {
        width: isDesktop ? '40%' : '90%',
        margin: '5% auto',
        padding: '2% 2% 3%',
        background: '#F7F8F9',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'column',
    }

    const btnStyles = {
        padding: '13px 30px',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: primaryColor,
        border: 'none',
        borderRadius: 12,
        textTransform: 'capitalize',
        cursor: 'pointer',
        marginTop: '20px',
    }

    return (
        <>
            <Header />
            <div style={{ background: '#fff', display: 'flex', justifyContent: 'center', height: '100vh' }}>
                <div style={success_box}>
                    <img src={'/images/wrong-icon.svg'} style={{ width: 120, marginTop: '-14%', marginBottom: '3%' }} />
                    <h3 className="global-h3" style={{ margin: '2% 0', fontSize: 20, textAlign: 'center' }}>Oops! Payment Failed. Please Try Again</h3>

                    <p style={{ textAlign: 'center', fontSize: 13, marginTop: '1%', opacity: '70%' }}>
                        Questions? Suggestions? insightful showe thoughts?
                    </p>
                    <p style={{ color: primaryColor, fontWeight: 500, textDecoration: 'underline', textAlign: 'center' }}>
                        info@leegal.co
                    </p>
                    <a href='/dashboard' target='_blank'>
                        <Button style={btnStyles}>Go to Dashboard</Button>
                    </a>
                </div>
            </div>
            <AboutComp />
            <div style={{ marginTop: '-5%' }}>
                <Contact />
            </div>
            <Footer />
        </>
    );
}
