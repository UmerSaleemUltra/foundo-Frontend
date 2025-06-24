import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { post_data } from '../../api';
import toast, { Toaster } from 'react-hot-toast';

const CTA = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')


    const styles = {
        container: {
            width: isMobile ? '90%' : '80%',
            backgroundColor: 'black',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '20px',
            borderRadius: '20px',
            margin: '0 auto',
            marginTop: isMobile ? '10%' : '',
            marginTop: isMobile ? '2%' : '100px'
        },
        textContainer: {
            display: 'flex',
            flexDirection: 'column',
            zIndex: 2,
            alignItems: 'flex-start',
            width: isMobile ? '100%' : '780px',
            padding: isMobile ? '20px 30px' : '50px'
        },
        heading: {
            textAlign: 'left',
            fontSize: isMobile ? '26px' : '43px',
            fontWeight: 500,
            marginBottom: '10px',
        },
        inputContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginTop: '10px',
            flexDirection: isMobile ? 'column' : ''
        },
        textField: {
            backgroundColor: 'white',
            borderRadius: '4px',
            width: 300
        },
        button: {
            backgroundColor: 'black',
            color: 'white',
            fontWeight: 500,
            width: isMobile ? '100%' : '30%',
              padding: '10px 15px',
            borderRadius: 3,
            '&:hover': {
                backgroundColor: '#d0191f',
            },
        },
        imageContainer: {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginLeft: '20px',
        },
        image: {
            // maxHeight: '80px', 
            width: isMobile ? '200%' : '90%',
            // objectFit: 'contain',
            marginTop: isMobile ? 'auto' : ''
        },
        divider: {
            width: '100%',
            height: '1px',
            backgroundColor: '#BDBDBD',
            marginTop: '30px',
        }
    };

    const handleSubmit = async () => {
        if (email?.trim() !== '') {
            setLoading(true)
            const response = await post_data('newsletter/create-newsletter', { email })
            if (response?.status) {
                setLoading(false)
                setEmail('')
                toast.success('Thanks for subscribing!')
            }
            else {
                setEmail('')
                setLoading(false)
                toast.success('Something went wrong')
            }
        }
        else {
            setEmail('')
            toast.error('Please enter the email!')
        }
    }

    return (<div style={{ marginBottom: '5%', overflow: 'hidden' }}>
        <Box sx={styles.container} className='ctaBg'>
            <Box sx={styles.textContainer}>
                <Typography sx={styles.heading}>
                    Start, Run and Grow your <br /> business
                </Typography>
                <Box sx={styles.inputContainer}>
                    <TextField
                        onChange={(e) => setEmail(e?.target?.value)}
                        variant="outlined"
                        placeholder="Enter your email"
                        sx={styles.textField}
                    />
                    <Button sx={styles.button} onClick={handleSubmit}>{loading ? 'Subscribe...' : 'Subscribe'}</Button>
                </Box>
            </Box>
            {
                !isMobile && (
                    <Box sx={styles.imageContainer}>
                        <img loading='lazy' src="/images/CTA-IMG.svg" alt="CTA Image" style={styles.image} />
                    </Box>
                )
            }
        </Box>
    </div>
    );
}

export default CTA;