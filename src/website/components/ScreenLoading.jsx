import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function ScreenLoading() {

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(timer);
                    return 100;
                }
                const diff = 5;
                return Math.min(oldProgress + diff, 100);
            });
        }, 100);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
            <Box sx={{ width: 250 }}>
                <center>
                    <img src='/images/logo.png' className='loading-img' style={{ width: 200, marginBottom: '2%' }} />
                    {/* <LinearProgress variant="determinate" value={progress} /> */}
                </center>
            </Box>
        </div>
    );
}