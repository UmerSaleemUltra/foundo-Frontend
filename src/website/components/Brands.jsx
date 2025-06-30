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
                0% { transform: translateX(0); }
                100% { transform: translateX(-50%); }
            }
            .marquee-wrapper {
                display: flex;
                animation: scroll 30s linear infinite;
            }
            .marquee-container:hover .marquee-wrapper {
                animation-play-state: paused;
            }
            .brand-img:hover {
                transform: scale(1.05);
                transition: transform 0.3s ease-in-out;
            }
        `;
        document.head.appendChild(styleTag);
        return () => {
            document.head.removeChild(styleTag);
        };
    }, []);

    const styles = {
        outerBox: {

            padding: isMobile ? '30px 15px' : '50px 80px',
        },
        heading: {
            fontSize: isMobile ? '20px' : '26px',
            fontWeight: 600,
            color: '#222',
            textAlign: 'center',
            marginBottom: '30px',
        },
        container: {
            overflow: 'hidden',
            width: '100%',
        },
        imageWrapper: {
            display: 'flex',
            gap: isMobile ? '20px' : '60px',
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

    const renderedImages = [...images, ...images];

    return (
        <div style={styles.outerBox}>
            <Typography style={styles.heading}>
                Trusted by Global Partners
            </Typography>
            <div className="marquee-container" style={styles.container}>
                <div className="marquee-wrapper">
                    <div style={styles.imageWrapper}>
                        {renderedImages.map((src, index) => {
                            let imageStyle = { ...styles.image };
                            if (src.includes("mercury")) imageStyle = { ...imageStyle, ...styles.mercuryImage };
                            else if (src.includes("paypal")) imageStyle = { ...imageStyle, ...styles.paypalImage };

                            return (
                                <img
                                    key={`${src}-${index}`}
                                    src={src}
                                    alt={`Brand ${index}`}
                                    className="brand-img"
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
