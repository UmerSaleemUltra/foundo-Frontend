import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Autocomplete, Avatar } from '@mui/material';
import { getInitials, primaryColor } from '../../constant';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { Country, State, City } from 'country-state-city';
import ChangePassword from './ChangePassword';


export default function AdminEditProfileModal({
    open,
    setOpen,
    user_data,
}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: 6
    };


    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [passwordOpen, setPasswordOpen] = React.useState(false)

    React.useEffect(() => {
        setName(user_data?.name)
        setEmail(user_data?.email)
    }, [open, user_data])


    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        setLoading(true)
        let payload = {
            name: name,
            email: email,
        }
        const response = await post_data(`super-admin/update-super-admin/${user_data?._id}`, payload)
        if (response?.status === true) {
            setLoading(false)
            toast.success('Profile updated successfully')
            setOpen(false)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }


    return (
        <div>
            <ChangePassword open={passwordOpen} setOpen={setPasswordOpen} user_data={user_data} />

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info">
                        <Avatar className="user-avatar">{getInitials(user_data?.name)}</Avatar>
                        <div className="user-details">
                            <h4 className="user-name">{user_data?.name}</h4>
                        </div>
                    </div>

                    <div className="company-selector-container">

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setName(e.target.value)} value={name}
                                id="outlined-basic" label="Name" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setEmail(e.target.value)} value={email}
                                id="outlined-basic" label="Email" variant="outlined" />
                        </div>

                        <p onClick={() => {
                            setPasswordOpen(true)
                            setOpen(false)
                            }} style={{ color: primaryColor, fontWeight: 500, cursor: 'pointer', fontSize: 14, textDecoration: 'underline', marginBottom: '6%' }}>
                            Change Password
                        </p>

                        <button className="add-company-btn" onClick={handleSave}>
                            {loading ? 'Save...' : 'Save'}
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}
