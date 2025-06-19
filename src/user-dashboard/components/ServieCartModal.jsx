import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Backdrop, Button, CircularProgress, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { formatDollar, formatPrice, primaryColor } from '../../constant';
import { useSelector } from 'react-redux';
import { get_data, post_data } from '../../api';
import SuccessModal from './SuccessModal';
import toast from 'react-hot-toast';


export default function ServieCartModal({ open, setOpen, service, company }) {

    const [discount, setDiscount] = React.useState(0);
    const [successOpen, setSuccessOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false);
    const [hash, setHash] = React.useState(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { user_data } = useSelector((state) => state.user);
    const [showPaymentPage, setShowPaymentPage] = React.useState(false);
    const [transactionId, setTransactionId] = React.useState(null);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        maxHeight: '80%',
        overflowY: 'auto',
        p: 6,
        borderRadius: 5,
    };

    const handleClose = () => setOpen(false);


    const styles = {
        summarySection: {
            padding: '20px',
            border: '1px solid #E0E0E0',
            borderRadius: 5,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
        },
        purchaseButton: {
            padding: '9px 20px',
            fontSize: '15px',
            color: '#fff',
            backgroundColor: primaryColor,
            border: 'none',
            cursor: 'pointer',
            textTransform: 'capitalize',
            width: '100%',
            borderRadius: 50,
            marginTop: '20px',
            boxShadow: 'none',
        },
        priceRow: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '1% 0',
        },
    };

    const [exchangeRate, setExchangeRate] = React.useState(null);

    React.useEffect(() => {
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


    const getHash = async (payload) => {
        try {
            console.log('outer');
            const res = await post_data('payu/hash-for-services', { name: user_data?.first_name, email: user_data?.email, phone: user_data?.phone, amount: convertToINR(Math?.ceil(service?.amt)), productinfo: "Addon Services" });

            if (res?.status === true) {
                console.log('inner');
                setHash(res?.data?.hash)
                setTransactionId(res?.data?.txnid);
                setShowPaymentPage(true);
            } else {
                console.log('Failed to get hash');
                toast.error(res?.response?.data?.error || "Something went wrong");
            }
        } catch (e) {
            console.log('error while getting hash', e);
        }
    }

    const handlePhonePePayment = async (payload) => {

        getHash(payload);

        console.log('handlePhonePePayment');

        localStorage.setItem('servicePayload', JSON.stringify(
            {
                user_id: user_data?._id,
                company_id: company?._id || null,
                service_name: service?.text,
                service_description: service?.description,
                service_amount: service?.amt,
                discount_amount: discount || 0,
                total_amount: service?.amt,
                paid_amount: service?.amt,
            }
        ))
        localStorage.setItem('transactionPayload', JSON.stringify(
            {
                user_id: user_data?._id,
                company_id: company?._id || null,
                transaction_id: transactionId,
                service_purchased: service?.text,
                amount: service?.amt,
            }
        ))

        let phonePePayload = {
            user_id: user_data?._id,
            name: user_data?.first_name + ' ' + user_data?.last_name,
            amount: convertToINR(Math?.ceil(service?.amt)),
            number: user_data?.phone,
            transactionId: transactionId,
        }
        const response = await post_data('service-purchased/make-payment', phonePePayload)

        if (response) {
            window.location.href = response?.data?.url;
            setLoading(false)

        } else {
            // alert("Failed to initiate PhonePe payment.");
            setLoading(false)
        }
    }


    React.useEffect(() => {
        if (hash && transactionId) {
            document.getElementById("payuForm").submit();
        }
    }, [hash, transactionId]);

    return (
        <div>

            {
                showPaymentPage
                    ?
                    <form id="payuForm" action="https://secure.payu.in/_payment" method="post">
                        <input type="hidden" name="key" value="HVTs54" />
                        <input type="hidden" name="txnid" value={transactionId} />
                        <input type="hidden" name="productinfo" value="Addon Services" />
                        <input type="hidden" name="amount" value={convertToINR(Math?.ceil(service?.amt))} />
                        <input type="hidden" name="email" value={user_data?.email} />
                        <input type="hidden" name="firstname" value={user_data?.first_name} />
                        <input type="hidden" name="lastname" value="" />
                        <input type="hidden" name="surl" value="https://api.leegal.co/api/payu/success" />
                        <input type="hidden" name="furl" value="https://api.leegal.co/api/payu/failure" />
                        <input type="hidden" name="phone" value={user_data?.phone} />
                        <input type="hidden" name="hash" value={hash} />
                        <input type="submit" value="Submit" />
                    </form>
                    :
                    <>
                        {
                            loading &&
                            <Backdrop
                                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1000 })}
                                open={loading}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }
                        <SuccessModal open={successOpen} setOpen={setSuccessOpen} />
                        <Modal open={open} onClose={handleClose}>
                            <Box sx={style}>
                                <Grid container spacing={2} style={{ width: '100%' }}>
                                    <Grid item md={6} style={{ width: '50%' }}>
                                        <div className="service-card">
                                            <h4 style={{ marginTop: 0 }}>{service.text}</h4>
                                            <p>{service.description}</p>
                                            <div className="service-price">{formatDollar(service.amt)} / {service.duration}</div>
                                            <div className="service-actions">
                                                {/* <button className="learn-more-btn">Learn more</button> */}
                                            </div>
                                        </div>
                                    </Grid>

                                    <Grid item md={6} style={{ width: '50%' }}>
                                        <Box sx={styles.summarySection}>
                                            <Typography variant="h6" gutterBottom>Billing Details</Typography>

                                            <Box sx={styles.priceRow}>
                                                <Typography variant="body1">Total:</Typography>
                                                <Typography variant="body1">{formatDollar(service?.amt)}</Typography>
                                            </Box>
                                            <Box sx={styles.priceRow}>
                                                <Typography variant="body1" style={{ fontWeight: 500 }}>Net Payable:</Typography>
                                                <Typography variant="body1" style={{ fontWeight: 500 }}>{formatDollar(service?.amt)}</Typography>
                                            </Box>
                                            <Box sx={styles.priceRow}>
                                                <Typography variant="body1" style={{ fontWeight: 500 }}></Typography>
                                                <Typography variant="body1" style={{ fontWeight: 500, opacity: '70%' }}>In INR: ({formatPrice(convertToINR(Math?.ceil(service?.amt)))})</Typography>
                                            </Box>

                                            <Button style={styles.purchaseButton} onClick={handlePhonePePayment}>Pay Now</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Modal>
                    </>
            }
        </div>
    );
}
