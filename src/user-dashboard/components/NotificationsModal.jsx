import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

export default function NotificationsModal({ open, setOpen }) {
    // Adjusted style to ensure the modal is centered correctly
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Centers the modal
        width: 400, // Adjust width as needed
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        maxHeight: '80%',
        overflowY: 'auto',
        p: 4,
        borderRadius: 6,
    };

    const notificationsList = () => {
        const notifications = [
            { title: 'Payment Successful', description: 'Your payment of $1,500 has been processed successfully.' },
            { title: 'Tax Filing Reminder', description: 'Don’t forget to file your annual tax return before January 15th.' },
            { title: 'New CPA Consultation Available', description: 'Book your 30-minute consultation with our CPA experts now.' },
            { title: 'Subscription Renewal', description: 'Your subscription will renew on March 1st, 2025.' },
            { title: 'Payment Successful', description: 'Your payment of $1,500 has been processed successfully.' },
            { title: 'Tax Filing Reminder', description: 'Don’t forget to file your annual tax return before January 15th.' },
            { title: 'New CPA Consultation Available', description: 'Book your 30-minute consultation with our CPA experts now.' },
            { title: 'Subscription Renewal', description: 'Your subscription will renew on March 1st, 2025.' },
        ];

        return (
            <div className="notifications-container">
                <h3 style={{ marginTop: 0, paddingBottom: '4%', fontSize: 20, borderBottom: '1px solid gainsboro' }}>Recent Notifications</h3>
                {notifications?.map((notification, index) => (
                    <div key={index} className="notification-item">
                        <h4 className="notification-title">{notification.title}</h4>
                        <p className="notification-description">{notification.description}</p>
                    </div>
                ))}
            </div>
        );
    };

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {notificationsList()}
                </Box>
            </Modal>
        </div>
    );
}
