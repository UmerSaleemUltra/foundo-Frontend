import React, { useEffect, useState } from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { primaryColor } from '../../constant';
import AboutComp from '../../website/components/AboutComp';
import Contact from '../../website/components/Contact';
import Footer from '../../website/components/Footer';
import Header from '../../website/components/Header';
import { post_data } from '../../api';

export default function AddonSuccess() {

    const isDesktop = useMediaQuery('(min-width: 768px)');
    const [timeLeft, setTimeLeft] = useState(15);

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
    };

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
    };

    const service_payload = JSON.parse(localStorage.getItem('servicePayload'));
    const transaction_payload = JSON.parse(localStorage.getItem('transactionPayload'));

    const handlePurchaseService = async () => {
        try {
            if (
                transaction_payload &&
                service_payload &&
                Object.keys(transaction_payload)?.length > 0 &&
                Object.keys(service_payload)?.length > 0
            ) {
                const result = await post_data('service-purchased/create-service-purchased', service_payload);

                if (result?.status) {
                    const response2 = await post_data('user-transaction/create-user-transaction', transaction_payload);
                    if (response2?.status) {
                        localStorage.removeItem('servicePayload');
                        localStorage.removeItem('transactionPayload');
                    }
                }
            }

        } catch (error) {
            alert('Error after payment');
        }
    };

    useEffect(() => {
        handlePurchaseService();

        // Set up a timer that counts down every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);


        // Track time to enforce 15-second rule
        const startTime = Date.now();
        const enforceTimeLimit = () => Date.now() - startTime < 15000;

        const preventClose = (event) => {
            if (enforceTimeLimit()) {
                event.preventDefault();
                event.returnValue = 'Are you sure you want to leave? Wait for the process to complete.';
            }
        };

        // Handle tab close and focus loss
        const handleBlur = () => {
            if (enforceTimeLimit()) {
                alert('Please stay on this page for 15 seconds to complete the process.');
            }
        };

        // Add event listeners
        window.addEventListener('beforeunload', preventClose);
        window.addEventListener('blur', handleBlur);

        // Remove listeners after 15 seconds
        const timeout = setTimeout(() => {
            window.removeEventListener('beforeunload', preventClose);
            window.removeEventListener('blur', handleBlur);
        }, 15000);

        // Cleanup listeners on component unmount
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('beforeunload', preventClose);
            window.removeEventListener('blur', handleBlur);
        };

    }, []);

    return (
        <>
            <Header />
            <div style={{ background: '#fff', display: 'flex', justifyContent: 'center', height: '100vh' }}>
                <div style={success_box}>

                    {
                        timeLeft > 0 && (
                            <h3
                                className="global-h3"
                                style={{ margin: '2% 0', fontSize: 20, textAlign: 'center' }}
                            >
                                Do not press back or close this page for {timeLeft} seconds
                            </h3>
                        )
                    }


                    <img
                        src={'https://oredomotor.com/images/success.svg'}
                        style={{ width: 120, marginTop: '4%', marginBottom: '3%' }}
                        alt="Success"
                    />
                    <h3
                        className="global-h3"
                        style={{ margin: '2% 0', fontSize: 20, textAlign: 'center' }}
                    >
                        'Thanks a lot for putting up this Order!'
                    </h3>

                    <p style={{ textAlign: 'center', fontSize: 13, marginTop: '1%', opacity: '70%' }}>
                        Questions? Suggestions? insightful shower thoughts?
                    </p>
                    <p style={{ color: primaryColor, fontWeight: 500, textDecoration: 'underline', textAlign: 'center' }}>
                        info@leegal.co
                    </p>
                    <a href="/dashboard" target="_blank" rel="noreferrer">
                        <Button style={btnStyles}>Go to Dashboard</Button>
                    </a>
                </div>
            </div>
            <AboutComp />
            <div style={{ marginTop: '-10%' }}>
                <Contact />
            </div>
            <Footer />
        </>
    );
}
