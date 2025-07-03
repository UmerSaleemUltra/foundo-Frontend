import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

export default function CouponModal({
    open,
    setOpen,
}) {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isMobile ? '80%' : 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 3,
        borderRadius: 5
    };


    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <div className="coupon-section">
                        <h2 className="heading-secondary">A little something, just for you!</h2>
                        <h2 className="heading-primary" style={{ fontSize: isMobile ? 40 : 80, color: 'black' }}>$50 OFF</h2>
                        <p className="subheading">Use Coupon Code <span style={{ fontWeight: 600, color: '#000' }}>START50</span></p>

                        <Button
                            onClick={() => {
                                setOpen(false)
                                navigate('/pricing');
                                window.scrollTo(0, 0)
                            }}
                            endIcon={<IoIosArrowForward />}
                            variant="contained"
                            style={{
                                background: '#EA580C',
                                color: 'white',
                                padding: '10px 15px',
                                borderRadius: 3,
                                fontSize: isMobile ? '13px' : '14px',
                                boxShadow: 'none',
                                margin: '2% 0',
                                textTransform: 'capitalize',
                                zIndex: 10,
                                '&:hover': {
                                    boxShadow: 'none',
                                    backgroundColor: '#C24505',
                                },
                            }}
                        >
                            Apply Coupon Code
                        </Button>

                        <p className="decline-p" onClick={() => setOpen(false)}>Nah, I don’t like saving money</p>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}