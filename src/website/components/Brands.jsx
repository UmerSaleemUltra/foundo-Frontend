import React, { useEffect, useRef, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

const Brands = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Check if the device is mobile
    const [images, setImages] = useState([
        "/images/mercury1.jpg",
        "/images/stripe.png",
        // "/images/wise.png",
        "/images/payoneer.png",
        "/images/paypal.png"
    ]);
    const observerRef = useRef(null);
    const lastImageRef = useRef(null); // Reference for the last image

    const styles = {
        container: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            padding: isMobile ? '20px 10% 0' : '20px 10%', // Use percentages for padding for better responsiveness
            boxSizing: 'border-box',
        },
        imageWrapper: {
            display: 'flex',
            flexWrap: 'no-wrap',
            flexDirection: 'row-reverse',
            gap: isMobile ? '10px' : '30px',
            marginTop: isMobile ? '5px' : '20px',
            marginBottom: '20px',
            overflowX: 'auto',
            whiteSpace: 'nowrap',
            scrollBehavior: 'smooth',
            alignItems: 'center',
        },

        image: {
            height: isMobile ? '40px' : '60px', // Set a smaller height for images on mobile
            width: 'auto', // Keep width auto to maintain aspect ratio
            objectFit: 'contain', // Ensure the image fits within its container
            transition: 'height 0.3s ease', // Smooth transition for height changes
        },
        paypalImage: {
            height: isMobile ? '30px' : '40px', // Set a smaller height for PayPal images on mobile
            width: 'auto', // Keep width auto to maintain aspect ratio
            objectFit: 'contain', // Ensure the image fits within its container
            transition: 'height 0.3s ease', // Smooth transition for height changes
        },
        mercuryImage: {
            height: isMobile ? '60px' : '85px', // Set a larger height for Mercury images on mobile
            width: 'auto', // Keep width auto to maintain aspect ratio
            objectFit: 'contain', // Ensure the image fits within its container
            transition: 'height 0.3s ease', // Smooth transition for height changes
        },
        trustText: {
            bottom: isMobile ? '0' : '2%',
            color: 'black',
            fontSize: isMobile ? '14px' : '15px',
            fontWeight: '500',
            textAlign: 'center',
            zIndex: 3,
        },
        hideScrollbar: {
            '&::-webkit-scrollbar': {
                display: 'none',
            },
            scrollbarWidth: 'none',
            '-ms-overflow-style': 'none',
        },
    };

    useEffect(() => {
        if (isMobile) { // Ensure the observer is only active on mobile devices
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    // Load more images when the last image is in view
                    loadMoreImages();
                }
            });

            if (lastImageRef.current) {
                observer.observe(lastImageRef.current);
            }

            return () => {
                if (lastImageRef.current) {
                    observer.unobserve(lastImageRef.current);
                }
            };
        }
    }, [isMobile, images]);

    const loadMoreImages = () => {
        const newImages = [
            // "/images/mercury1.jpg",
            "/images/stripe.png",
            "/images/wise.png",
            "/images/payoneer.png",
            "/images/paypal.png",
        ];
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    return (
        <>
            {/* <div style={{ ...styles.trustText, marginTop: isMobile ? '10%' : '5%', }}>Our business partners and affiliates.</div> */}
            <div style={styles.container}>
                <div style={{ ...styles.imageWrapper, ...styles.hideScrollbar }}>
                    {images.slice().reverse().map((src, index) => { // Reverse the images for rendering
                        let imageStyle = styles.image;

                        if (src === "/images/mercury1.jpg") {
                            imageStyle = styles.mercuryImage;
                        } else if (src === "/images/paypal.png") {
                            imageStyle = styles.paypalImage;
                        }

                        return (
                            <img
                                loading='lazy'
                                key={src}
                                src={src}
                                alt={`Brand ${index}`}
                                style={imageStyle}
                                ref={index === images.length - 1 ? lastImageRef : null} // Assign ref to the last image
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Brands;