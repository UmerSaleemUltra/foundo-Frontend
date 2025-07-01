import { Autocomplete, Button, Grid, TextField, } from "@mui/material";
import { IoIosArrowForward } from "react-icons/io";
import { formatPrice, states } from "../../constant";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get_data } from "../../api";
import { useSelector } from "react-redux";
import { useTheme, useMediaQuery } from "@mui/material";





export default function StateFee() {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const styles = {

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
        }
        
    

    const [selectedState, setSelectedState] = useState(null);
    const navigate = useNavigate()
    const { user_data } = useSelector(state => state.user);

    const handleStateSelect = (event, newValue) => {
        setSelectedState(newValue);
    };

    const heading = {
        fontSize: isMobile ? 30 : '45px',
        color: '#000',
        textAlign: 'left',
        margin: 0,
        padding: 0,
    }

    useEffect(() => {
        setSelectedState({ label: "Wyoming", fee: 102 },)
    }, [])

    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await get_data(`user/get-exchange-rate`);
                if (response?.status) {
                    setExchangeRate(response?.data);
                } else {
                    // console.log('Failed to fetch exchange rate');
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
        <>
            <Grid container spacing={0} style={{
                background: 'transparent',
                width: '100%',
                display: 'flex',
                justifyContent: 'left',
                textAlign: 'left',
                gap: 0,
                margin: 0,
                padding: isMobile ? '10% 5%' : '6% 7%'
            }}>
                <Grid item md={6} style={{ width: '100%' }}>
                    <div>
                        <h3 style={heading}>State Fees</h3>
                        <img src="/images/underline.svg" style={{ width: 300 }} />

                        <p style={{ color: '#40483D', fontSize: 14, width: isMobile ? '90%' : '70%' }}>
                            Starting your business has never been easier! Select your preferred state of incorporation and discover transparent pricing tailored to your needs. Whether it’s state fees or business initial filing, we ensure clarity and simplicity in every step of forming your LLC.
                        </p>
                    </div>
                </Grid>
                <Grid item md={6} style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: 0 }} >
                    <div
                        // className="pricing-box"
                        style={{
                            boxShadow: 'none',
                            padding: isMobile ? '8% 10%' : '5% 10%',
                            background: 'white',
                            borderRadius: 15,
                            textAlign: 'center',
                            margin: '1rem 0',
                            width: 380
                        }}>
                        <div className="price-tag">
                            <h4 style={{ fontWeight: 500, color: '#555555', textAlign: 'left', margin: 0 }}>State of Incorpration</h4>
                        </div>

                        <Grid item xs={12} style={{ marginTop: '5%' }}>
                            <Autocomplete
                                disablePortal
                                options={states}
                                value={selectedState}
                                onChange={handleStateSelect}
                                getOptionLabel={(option) => option.label}
                                renderOption={(props, option) => (
                                    <li {...props}>
                                        <div>
                                            {option.label} <em>{option.tagline}</em>
                                        </div>
                                    </li>
                                )}
                                renderInput={(params) => <TextField {...params} label="Select state" style={{ textAlign: 'left' }} />}
                            />
                        </Grid>

                        <div className="price-tag">
                            <h4 style={{ fontWeight: 500, color: '#000', textAlign: 'center', margin: '6% 0 4%', fontSize: 20 }}>
                                {selectedState?.label} One-Stop LLC Formation
                            </h4>
                        </div>

                        <Grid container spacing={0} style={{ margin: '8% 0' }}>
                            <Grid item md={6} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '50%', borderRight: '1px solid gainsboro' }}>
                                <h2 style={{ fontSize: isMobile ? 35 : 50, margin: 0, fontWeight: 700, textAlign: 'center', margin: '6% 0 3%' }}>${selectedState?.fee}</h2>
                                {/* <h2 style={{ fontSize: isMobile ? 35 : 50, margin: 0, fontWeight: 700, textAlign: 'center', margin: '6% 0 3%' }}>{formatPrice(convertToINR(Math.ceil(selectedState?.fee)))}</h2> */}
                                <p className="process-time" style={{ textAlign: 'center', margin: 0 }}>State Fee</p>
                            </Grid>
                            <Grid item md={6} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', width: '50%' }}>
                                <h2 style={{ fontSize: isMobile ? 35 : 50, margin: 0, fontWeight: 700, textAlign: 'center', margin: '6% 0 3%' }}>${selectedState?.fee + 249}</h2>
                                {/* <h2 style={{ fontSize: isMobile ? 35 : 50, margin: 0, fontWeight: 700, textAlign: 'center', margin: '6% 0 3%' }}>{formatPrice(convertToINR(Math.ceil(selectedState?.fee + 249)))}</h2> */}
                                <p className="process-time" style={{ textAlign: 'center', margin: 0 }}>Total Formation Fee</p>
                            </Grid>
                        </Grid>

                        <Button
                        sx={styles.startButton}
                            onClick={() => {
                                localStorage.setItem('selectedState', JSON.stringify(selectedState?.label));
                                localStorage.setItem('selectedStateFee', JSON.stringify(selectedState?.fee));
                                localStorage.setItem('selectedPlan', 'One-Stop');
                                localStorage.setItem('selectedPlanAmount', JSON.stringify(selectedState?.fee + 249));
                                if (user_data?.is_user) {
                                    navigate('/business-formation');
                                    window.scrollTo(0, 0);
                                }
                                else {
                                    navigate('/create-account');
                                    window.scrollTo(0, 0);
                                }
                            }}
                            endIcon={<IoIosArrowForward />} >Start My LLC {!isMobile && <>in {selectedState?.label}</>}</Button>
                        <p className="process-time" style={{ textAlign: 'center', margin: '4% 0 0' }}>Starts at $249 + State Fees</p>
                        {/* <p className="process-time" style={{ textAlign: 'center', margin: '4% 0 0' }}>Starts at {formatPrice(convertToINR(Math.ceil(249)))} + State Fees</p> */}
                    </div>
                </Grid>
            </Grid >
        </>
    )
}