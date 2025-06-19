import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import ContactChannels from './ContactChannels';

export default function SupportModal({ open, setOpen }) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Centers the modal
        width: 650, // Adjust width as needed
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        maxHeight: '80%',
        overflowY: 'auto',
        p: 4,
        borderRadius: 6,
    };

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <ContactChannels />
                </Box>
            </Modal>
        </div>
    );
}
