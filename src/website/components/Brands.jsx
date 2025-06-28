import React, { useEffect, useState } from 'react';
import { useTheme, useMediaQuery, Typography } from '@mui/material';

const Brands = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [images] = useState([
        "/images/mercury1.jpg",
        "/images/stripe.png",
        "/images/wise.png",
        "/images/payoneer.png",
        "/images/paypal.png"
    ]);

    useEffect(() => {
        const styleTag = document.createElement("style");
        styleTag.innerHTML = `
            @keyframes scroll {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            .marquee-wrapper {
                display: flex;
                animation: scroll 25s linear infinite;
                will-change: transform;
            }
            .marquee-container:hover .marquee-wrapper {
                animation-play-state: paused;
            }
        `;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    const styles = {
        outerBox: {
            borderTop: '1px solid #ddd',
            padding: isMobile ? '30px 10px' : '40px 60px',
        },
        heading: {
            fontSize: isMobile ? '18px' : '22px',
            fontWeight: 600,
            color: '#333',
            textAlign: 'center',
            marginBottom: '20px',
        },
        container: {
            overflow: 'hidden',
            width: '100%',
        },
        imageWrapper: {
            display: 'flex',
            gap: isMobile ? '20px' : '40px',
            alignItems: 'center',
            padding: '10px 0',
            flexShrink: 0,
        },
        image: {
            height: isMobile ? '40px' : '60px',
            objectFit: 'contain',
        },
        paypalImage: {
            height: isMobile ? '30px' : '40px',
        },
        mercuryImage: {
            height: isMobile ? '60px' : '85px',
        }
    };

    const renderedImages = [...images, ...images]; // For smooth infinite loop

    return (
        <div style={styles.outerBox}>
            <Typography style={styles.heading}>
                Trusted by global partners
            </Typography>
            <div className="marquee-container" style={styles.container}>
                <div className="marquee-wrapper">
                    <div style={styles.imageWrapper}>
                        {renderedImages.map((src, index) => {
                            let imageStyle = { ...styles.image };
                            if (src === "/images/mercury1.jpg") imageStyle = { ...imageStyle, ...styles.mercuryImage };
                            else if (src === "/images/paypal.png") imageStyle = { ...imageStyle, ...styles.paypalImage };

                            return (
                                <img
                                    key={`${src}-${index}`}
                                    src={src}
                                    alt={`Brand ${index}`}
                                    loading="lazy"
                                    style={imageStyle}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Brands;
