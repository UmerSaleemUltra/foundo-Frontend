import { Button, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { primaryColor } from '../../constant';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const AboutComp = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate()

    const startButton = {
       background: '#ffffff',
            color: 'black',
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
        }

    return (
        <section className="about-section" style={{ position: 'relative' }}>
            <div className="about-content">
                <div className="logo" >
                    <img src="/images/arrow-img.svg" alt="Logo" />
                </div>
                <div className="about-text">
                    <h2>
                        Start, Run and Grow your <span className="highlight">Business</span><br /> in United States
                        <img src="/images/circle-mark.svg" style={{ width: 140, position: 'absolute', top: '37%', left: '27%' }} />
                    </h2>
                </div>
            </div>
            <div className="about-action">
                <p>
                    We help you start, run and grow your business in the United States. <br />
                    Our team of experts is here to guide you through every step of the process.
                </p>
                
                <Button
                    onClick={() => {
                        navigate('/pricing')
                        window.scrollTo(0, 0)
                    }}
                    className="start-business-btn"
                    endIcon={<IoIosArrowForward />} style={startButton}>Start Your Business</Button>
            </div>
        </section>
    );
};

export default AboutComp;