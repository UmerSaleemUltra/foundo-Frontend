import React from 'react';
import {
  Box,
  Grid,
  Typography,
  Link,
  IconButton,
  Stack
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HelpIcon from '@mui/icons-material/HelpOutline';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#fff', color: '#222', position: 'relative', px: { xs: 3, md: 10 }, py: 8 }}>
      <Grid container spacing={6}>
        {/* Logo and Contact */}
        <Grid item xs={12} md={4}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#000' }}>
              <Box component="span" sx={{ color: '#007bff' }}>▶</Box>ncorz
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 1 }}>
              Start and Run Your U.S. Business<br />Hassle-Free With Us
            </Typography>
          </Box>

          <Stack spacing={1.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <EmailIcon fontSize="small" />
              <Link href="mailto:support@ncorz.com" underline="hover" color="inherit">support@ncorz.com</Link>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">+1 (502) 970 908</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <HelpIcon fontSize="small" />
              <Link href="#" underline="hover" color="inherit">Frequently Asked Question (FAQ)</Link>
            </Box>
          </Stack>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <IconButton sx={{ border: '1px solid #ccc', color: '#000' }}><FacebookIcon /></IconButton>
            <IconButton sx={{ border: '1px solid #ccc', color: '#000' }}><LinkedInIcon /></IconButton>
            <IconButton sx={{ border: '1px solid #ccc', color: '#000' }}><InstagramIcon /></IconButton>
          </Box>
        </Grid>

        {/* Center Links */}
        <Grid item xs={6} md={4}>
          <Stack spacing={1}>
            <Typography fontWeight="600" sx={{ mb: 1 }}>Links</Typography>
            <Link href="#" color="inherit" underline="hover">About Us</Link>
            <Link href="#" color="inherit" underline="hover">Contact Us</Link>
            <Link href="#" color="inherit" underline="hover">Pricing</Link>
            <Link href="#" color="inherit" underline="hover">Our Services</Link>
          </Stack>
        </Grid>

        {/* Right Policy */}
        <Grid item xs={6} md={4}>
          <Stack spacing={1}>
            <Typography fontWeight="600" sx={{ mb: 1 }}>Legal</Typography>
            <Link href="#" color="inherit" underline="hover">Privacy Policy</Link>
            <Link href="#" color="inherit" underline="hover">Refund Policy</Link>
            <Link href="#" color="inherit" underline="hover">Terms & Conditions</Link>
            <Link href="#" color="inherit" underline="hover">Copyrights</Link>
          </Stack>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="body2" sx={{ mb: 1 }}>2024 - 2025. All rights reserved.</Typography>
        <Typography variant="body2" sx={{ maxWidth: 600, color: '#777' }}>
          Arcu euismod tellus aliquam amet a aenean varius rhoncus. Ut facilisis vulputate nunc et ullamcorper at pellentesque.
          Commodo ultrices morbi ullamcorper risus duis quisque id auctor sit.
        </Typography>
      </Box>

      {/* Right-side image */}
      <Box
       
      />
    </Box>
  );
};

export default Footer;
