import { Button, Grid, Checkbox, Card, TextField, CircularProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import EastIcon from '@mui/icons-material/East';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import toast from 'react-hot-toast';
import { get_data, post_data } from '../../api';
import { addonServicesList, formatPrice } from '../../constant';
export default function Step4({ onSubmit, onPrev, totalAddonPrice, loading, setSelectedAddons, setTotalAddonPrice, services, setServices, discount, setDiscount, couponApplied, setCouponApplied, finalPrice, setFinalPrice }) {

    const navigate = useNavigate();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'))
    const [addonsList, setAddonsList] = useState([]);
    const [couponCode, setCouponCode] = useState('');
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
    const planAmount = parseInt(localStorage.getItem('selectedPlanAmount'));
    const [exchangeRate, setExchangeRate] = useState(null);

    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await get_data(`user/get-exchange-rate`);
                if (response?.status === true) {
                    setExchangeRate(response?.data);
                } else {
                    console.log('Failed to fetch exchange rate');
                }
            } catch (error) {
            }
        };

        fetchExchangeRate();
    }, []);


    const handleSubmit = (e) => {
        onSubmit({});
    };

    useEffect(() => {
        const selectedAddons = JSON.parse(localStorage.getItem("selectedAddons"));
        if (selectedAddons[0]) {
            setAddonsList(selectedAddons);
        } else {
            setAddonsList([]);
        }
    }, [])

    // let selectedAddons = localStorage.getItem('selectedAddons').split(",");


    const handleRemoveAddon = (addon) => {
        setSelectedAddons(prev => prev.filter(item => item !== addon));
        setAddonsList(prev => prev.filter(item => item !== addon));
        addonServicesList?.map((addonDetail) => addonDetail?.text === addon && setTotalAddonPrice(prev => prev - addonDetail.amt));
        localStorage.setItem("selectedAddons", addonsList.filter(item => item !== addon));
        setServices(prev => prev.filter(service => service?.text !== addon));
    }

    const handleApplyCoupon = async () => {
        if (couponCode === '') {
            toast.error('Please enter a coupon code');
            return;
        }
        setIsApplyingCoupon(true);

        const response = await post_data(`coupon/get-coupon`, { coupon_code: couponCode })
        if (response?.status === true) {
            setDiscount(response?.data?.discount_value)
            setCouponApplied(true);
        } else {
            toast.error('Invalid coupon code');
            setDiscount(0);
        }
        setIsApplyingCoupon(false);
    };

    const convertToINR = (usdAmount) => {
        return (usdAmount * exchangeRate).toFixed(2);
    };

    return (
        <div
            style={{
                width: matches_md ? '90vw' : '100%',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <div style={{ width: '100%' }}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, fontSize: 20 }}>Summary</div>
                    </Grid>

                    <Grid item xs={12} style={{ marginTop: '1%' }}>
                        <Grid
                            container
                            spacing={1}
                            padding={3}
                            style={{
                                border: '1px solid gainsboro',
                                borderRadius: 5,
                            }}
                        >
                            <Grid item xs={1}>
                                <ShoppingCartIcon
                                    sx={{
                                        fontSize: matches_md ? 30 : 40,
                                        color: '#EA580C',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={11}>
                                <div style={{ fontWeight: 600 }}>Billing Details</div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        marginTop: 25,
                                    }}
                                >
                                    <div>{localStorage.getItem('selectedPlan')} Plan</div>
                                    <div>${JSON.parse(localStorage.getItem('selectedPlanAmount'))}</div>
                                </div>
                                <Divider style={{ margin: '12px 0px' }} />

                                {addonsList.length === 0 ?
                                    <></>
                                    :
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <div
                                            style={{
                                                display: 'flex',
                                                gap: '10px',
                                                flexWrap: 'wrap',
                                            }}
                                        >
                                            {
                                                addonsList?.map((addon, index) => (
                                                    <div
                                                        key={index}
                                                        style={{
                                                            padding: '8px 12px',
                                                            borderRadius: '16px',
                                                            backgroundColor: '#e0e0e0',
                                                            display: 'inline-block',
                                                            fontSize: '14px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                        }}
                                                    >
                                                        {addon}
                                                        <CloseIcon
                                                            onClick={() => handleRemoveAddon(addon)}
                                                            style={{
                                                                cursor: 'pointer',
                                                                fontSize: 16,
                                                                color: '#EA580C',
                                                                marginLeft: 10,
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                        </div>

                                        <div>${totalAddonPrice}</div>
                                    </div>}
                                {addonsList.length === 0 ? <></> :
                                    <Divider style={{ margin: '12px 0px 20px 0px' }} />
                                }

                                {
                                    couponApplied ?
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ fontWeight: 600 }}>Discount</div>
                                            <div style={{ fontWeight: 600 }}>
                                                -${discount}
                                            </div>
                                        </div>
                                        :
                                        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'space-between' }}>
                                            <TextField
                                                label="Coupon Code"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                // sx={{width: '85%'}}
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleApplyCoupon}
                                                disabled={isApplyingCoupon}
                                                style={{
                                                    backgroundColor: '#EA580C',
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    boxShadow: 'none',
                                                }}
                                            >
                                                {isApplyingCoupon ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Apply'}
                                            </Button>
                                        </div>}

                                <Divider style={{ margin: '10% 0 2%' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div style={{ fontWeight: 600 }}>Total</div>
                                    <div style={{ fontWeight: 600, fontSize: 20 }}>
                                        ${
                                            Math.ceil(planAmount + totalAddonPrice - discount)
                                        }
                                        <span style={{ fontSize: 18, marginLeft: '5px', fontWeight: 400 }}>
                                            ({formatPrice(convertToINR(Math.ceil(planAmount + totalAddonPrice - discount)))})
                                        </span>
                                    </div>
                                </div>
                                <Divider style={{ margin: '12px 0px 40px 0px' }} />
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        {/* <Button
                            endIcon={<EastIcon />}
                            onClick={onSubmit}
                            style={{
                                gap: 10,
                                background: '#EA580C',
                                color: 'white',
                                margin: '44px 0px 44px auto',
                            }}
                        >
                            {loading ? 'Place Order...' : 'Place Order'}
                        </Button> */}

                        <Button startIcon={<KeyboardBackspaceIcon />} onClick={onPrev} style={{ background: 'black', color: 'white', margin: '44px 0px 44px', borderRadius: '50px', padding: '1% 3%' }}>
                            Back
                        </Button>
                        <Button endIcon={<EastIcon />} onClick={() => onSubmit({ finalPrice: convertToINR(Math.ceil(planAmount + totalAddonPrice - discount)) })} style={{ background: '#EA580C', color: 'white', margin: '44px 0px 44px auto', borderRadius: '50px', padding: '1% 3%' }}>
                            {loading ? 'Place Order...' : 'Place Order'}
                        </Button>

                    </Grid>
                </Grid>
            </div>
        </div>
    );
}
