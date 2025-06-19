import CircularProgress from '@mui/material/CircularProgress';
import { primaryColor } from '../../constant';

export default function Loader() {

    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '100%' }}>
                <CircularProgress style={{ width: 30, height: 30, marginBottom: 5, color: primaryColor }} />
                <p style={{ marginTop: 10, marginBottom: 50, opacity: '70%' }}>Fetching Records...</p>
            </div>
        </>
    )
}