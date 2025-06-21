import { Button, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from "react-icons/io";
import { MdCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../../constant';
import { get_data } from '../../api';
import { useSelector } from 'react-redux';

const OneStopPricing = ({ screen, selectedState }) => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { user_data } = useSelector(state => state.user);

    const navigate = useNavigate()

    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await get_data(`user/get-exchange-rate`);
                if (response?.status) {
                    setExchangeRate(response?.data);
                } else {
                }
            } catch (error) {
            }
        };

        fetchExchangeRate();
    }, []);

    const convertToINR = (usdAmount) => {
        return (usdAmount * exchangeRate).toFixed(2);
    };

    return (
        <section className="pricing-section" style={{
            borderRadius: screen === 'pricing' ? 20 : 0,
            marginTop: screen === 'pricing' ? '4%' : '',
            // padding: screen === 'pricing' ? '2%' : 0
            padding: isMobile ? 0 : screen === 'pricing' ? '2%' : ''
        }}>
            <div className="pricing-content">
                <h4>PRICING</h4>
                <h3 style={{ fontSize: isMobile ? 25 : 35, fontWeight: 600 }}>ONE PRICE, NO SURPRISES</h3>
                <p style={{ opacity: '90%', fontSize: isMobile ? 15 : '' }}>
                    We offer everything at a single price. No upselling, no hidden charges, no payment processing charges, no taxes added at the end. You pay what you see here and not a dollar more.
                </p>
                <div style={{ marginTop: '3%', display: 'flex', gap: isMobile ? 0 : 40, flexDirection: isMobile ? 'column' : 'row' }}>
                    <ul className="features-list">
                        <li><MdCheckCircle /> Name check and Clearance</li>
                        <li><MdCheckCircle /> LLC State Filing</li>
                        {/* <li><MdCheckCircle /> Tax Registration - EIN</li> */}
                        <li><MdCheckCircle /> EIN Registration </li>
                        <li><MdCheckCircle /> Digital Document Access</li>
                        {/* <li><MdCheckCircle /> FinCEN BOI Report</li> */}
                        {/* <li><MdCheckCircle /> U.S Phone Number</li> */}
                    </ul>
                    <ul className="features-list">
                        <li><MdCheckCircle /> Business Address</li>
                        {/* <li><MdCheckCircle /> Business Bank Account</li> */}
                        <li><MdCheckCircle /> Digital Business Bank Account</li>
                        <li><MdCheckCircle /> Registered Agent for 1 Year</li>
                        <li><MdCheckCircle /> All Government Fees</li>
                    </ul>
                </div>
            </div>
            <div className="pricing-box" style={{ padding: isMobile ? '6% 12% 8%' : '' }}>
                <div className="price-tag">
                    <h4>All-in one price</h4>
                    {
                        screen === 'pricing' && (
                            <div className="price-tag">
                                <h4 style={{ fontWeight: 500, color: '#000', textAlign: 'center', margin: '6% 0 4%', fontSize: 18 }}>
                                    {selectedState?.label} One-Stop LLC Formation
                                </h4>
                            </div>
                        )
                    }
                    <h2 style={{ fontSize: isMobile ? 70 : 90, margin: '5% 0 0', fontWeight: 700 }}>
                        {
                            screen === 'pricing' ? (
                                <>${selectedState?.fee + 249}</>
                                // <>
                                //     {formatPrice(convertToINR(Math.ceil(selectedState?.fee + 249)))}
                                // </>
                            ) : (
                                <>$249</>
                                // <>
                                //     {formatPrice(convertToINR(Math.ceil(249)))}
                                // </>
                            )
                        }
                    </h2>
                </div>
                {
                    screen !== 'pricing' && (
                        <p className="process-time" style={{ fontSize: 16 }}>+ State Fee</p>
                    )
                }
                <Button
                    onClick={() => {
                        if (screen === 'pricing') {
                            if (user_data?.is_user) {
                                navigate('/business-formation')
                                window.scrollTo(0, 0)
                                localStorage.setItem('selectedState', JSON.stringify(selectedState?.label));
                                localStorage.setItem('selectedStateFee', JSON.stringify(selectedState?.fee));
                                localStorage.setItem('selectedPlan', 'One-Stop');
                                localStorage.setItem('selectedPlanAmount', JSON.stringify(selectedState?.fee + 249));
                            }
                            else {
                                navigate('/create-account')
                                window.scrollTo(0, 0)
                                localStorage.setItem('selectedState', JSON.stringify(selectedState?.label));
                                localStorage.setItem('selectedStateFee', JSON.stringify(selectedState?.fee));
                                localStorage.setItem('selectedPlan', 'One-Stop');
                                localStorage.setItem('selectedPlanAmount', JSON.stringify(selectedState?.fee + 249));
                            }
                        }
                        else {
                            navigate('/pricing')
                            window.scrollTo(0, 0)
                        }

                    }}

                    endIcon={<IoIosArrowForward />} style={{
                        background: '#EA580C',
                        color: 'white',
                        padding: isMobile ? '15px 35px' : '12px 30px',
                        borderRadius: '50px',
                        fontSize: isMobile ? '13px' : '14px',
                        boxShadow: 'none',
                        marginTop: '4%',
                        textTransform: 'capitalize',
                        zIndex: 10,
                        '&:hover': {
                            backgroundColor: '#d0191f',
                        },
                    }}>
                    {screen === 'pricing' ? 'Start My LLC' : 'Start Your Business'}
                </Button>
                {/* <p className="process-time">4 Weeks Process</p> */}
            </div>
        </section>
    );
};

export default OneStopPricing;
