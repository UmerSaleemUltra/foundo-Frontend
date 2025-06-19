import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, useMediaQuery } from '@mui/material';
import { primaryColor } from '../../constant';
import { Link } from 'react-router-dom';


export default function SuccessModal({ open, setOpen }) {

    const isDesktop = useMediaQuery('(min-width: 768px)');

    const success_div = {
        background: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '0 auto',
        padding: '8% 2%',
    }

    const success_box = {
        width: isDesktop ? '80%' : '90%',
        margin: 'auto',
        marginTop: isDesktop ? '' : '15%',
        padding: '2% 2% 3%',
        background: 'white',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'column',
    }


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#fff',
        border: 'none',
        boxShadow: 24,
        maxHeight: '80%',
        overflowY: 'auto',
        p: 6,
        borderRadius: 5,
    };

    const handleClose = () => setOpen(false);

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
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <div style={success_div}>
                        <div style={success_box}>
                            <img src={'https://oredomotor.com/images/success.svg'} style={{ width: 120, marginTop: '-14%', marginBottom: '3%' }} />
                            <h3 className="global-h3" style={{ margin: '2% 0', fontSize: 20, textAlign: 'center' }}>'Thanks a lot for putting up this Order!'</h3>
                            {/* <p style={{ textAlign: 'center', fontSize: 13, opacity: '70%' }}>
                                Your Mailto order ASK123456 has successfully been placed. You'll fin all the details about your order below, and we'll send you a shipping confrimation email as soon as your order ships. In the meantime, you can share Mailto and earn store credit.
                            </p> */}
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
                </Box>
            </Modal>
        </div>
    );
}
