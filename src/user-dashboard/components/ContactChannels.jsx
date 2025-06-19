import React from 'react';
import { Button, useMediaQuery, useTheme } from '@mui/material';
import { primaryColor } from '../../constant';
import { IoChatbubblesOutline, IoCallOutline, IoLocationOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

const ContactChannels = () => {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches2 = useMediaQuery(theme.breakpoints.down(600));
    const matches3 = useMediaQuery(theme.breakpoints.down(500));

    const channels = [
        {
            icon: <IoChatbubbleEllipsesOutline size={28} />,
            title: 'Chats to Sales',
            description: 'Speak to our friendly team',
            buttonText: '+91 9770015304',
            link: 'https://api.whatsapp.com/send?phone=919770015304&text=Hi%20Leegal%20team!%20I%27m%20interested%20in%20registering%20my%20business%20in%20the%20United%20States.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20can%20get%20started%3F%0A'
        },
        {
            icon: <IoChatbubblesOutline size={28} />,
            title: 'Chat to Support',
            description: 'We are here to help',
            buttonText: 'info@leegal.co',
        }
    ];

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
            flexWrap: 'wrap',
        },
        card: {
            border: '1px solid gainsboro',
            borderRadius: '10px',
            padding: '20px',
            width: matches1 ? '90%' : 250,
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        icon: {
            marginBottom: '10px',
            padding: '5px',
            border: '1px solid gainsboro',
            borderRadius: '5px',
        },
        title: {
            fontSize: '18px',
            fontWeight: '600',
            marginBottom: '5px',
        },
        description: {
            color: 'grey',
            marginBottom: '15px',
        },
        button: {
            backgroundColor: 'white',
            color: 'black',
            fontWeight: 500,
            border: '1px solid gainsboro',
            textTransform: 'capitalize',
            '&:hover': {
                backgroundColor: primaryColor,
                borderColor: primaryColor,
                color: 'white',
            },
        },
    };

    return (
        <div style={styles.container}>
            {channels?.map((channel, index) => (
                <div key={index} style={styles.card}>
                    <div style={styles.icon}>{channel.icon}</div>
                    <h3 style={styles.title}>{channel.title}</h3>
                    <p style={styles.description}>{channel.description}</p>
                    <a href={channel?.link} target='_blank'>
                        <Button
                            variant="outlined"
                            style={styles.button}
                            onMouseEnter={(e) => {
                                e.target.style.backgroundColor = primaryColor;
                                e.target.style.borderColor = primaryColor;
                                e.target.style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.backgroundColor = 'white';
                                e.target.style.borderColor = 'gainsboro';
                                e.target.style.color = 'black';
                            }}
                        >
                            {channel.buttonText}
                        </Button>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ContactChannels;
