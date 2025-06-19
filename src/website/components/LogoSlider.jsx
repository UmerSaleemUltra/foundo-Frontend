import React from 'react';
import { useTheme, useMediaQuery } from '@mui/material';



const logos = [
  { src: '/images/ALM-logo.png', width: 100 },
  { src: '/images/ARETE-logo.jpg', width: 120 },
  { src: '/images/futurejob-logo.png', width: 190 },
  { src: '/images/Cognisol-logo.png', width: 110 },
  { src: '/images/emo-logo.jpg', width: 100 },
  { src: '/images/hk-global-logo.webp', width: 90 },
  { src: '/images/kivavee-logo.png', width: 140 },
  { src: '/images/kk-logo.png', width: 120 },
  { src: '/images/mdercm-logo.png', width: 150 },
  { src: '/images/pmhs-logo.jpg', width: 140 },
  { src: '/images/Solvagence-logo.png', width: 160 },
  { src: '/images/Zentartika-logo.png', width: 160 },
  { src: '/images/THE-WEB-DEV-logo.png', width: 160 },
  { src: '/images/DMC-logo.png', width: 150 },
  { src: '/images/MHL-logo.png', width: 80 },
  { src: '/images/wcf-logo.webp', width: 150 },
  { src: '/images/Agentyne-logo.png', width: 160 },
  { src: '/images/highlevel-logo.png', width: 150 },
  { src: '/images/coretech-logo.png', width: 100 },
  { src: '/images/trans-global-logo.jpg', width: 110 },
  { src: '/images/coderz-vision-logo.jpeg', width: 90 },
  { src: '/images/bridgepoint-logo.avif', width: 220 },
  { src: '/images/palamu-logo.png', width: 145 },
  { src: '/images/Ranking-rush-logo.webp', width: 125 },

];

const LogoSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const firstHalf = logos.slice(0, Math.ceil(logos.length / 2));
  const secondHalf = logos.slice(Math.ceil(logos.length / 2));

  return (
    <>
      <div className="logo-slider-container">
        <div className="logo-slider slider-left">
          <div className="logo-track">
            {firstHalf.concat(firstHalf).map((logo, index) => (
              <div className="logo-slide" key={`top-${index}`}>
                <img
                  src={logo.src}
                  alt={`Logo ${index}`}
                  style={{
                    width: isMobile ? logo.width * 0.8 : logo.width,
                    height: 'auto',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="logo-slider slider-right" style={{ marginTop: '-5%' }}>
          <div className="logo-track reverse">
            {secondHalf.concat(secondHalf).map((logo, index) => (
              <div className="logo-slide" key={`bottom-${index}`}>
                <img
                  src={logo.src}
                  alt={`Logo ${index}`}
                  style={{
                    width: isMobile ? logo.width * 0.8 : logo.width,
                    height: 'auto',
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoSlider;
