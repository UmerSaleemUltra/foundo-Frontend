import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function EditAssocMember({
    open,
    setOpen,
    company
}) {

    const { user_data } = useSelector(state => state.user);
    const navigate = useNavigate()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 5,
        borderRadius: 6
    };

    const [fullName, setFullName] = React.useState(company?.name)
    const [email, setEmail] = React.useState(company?.email)
    const [phone, setPhone] = React.useState(company?.phone)
    const [gender, setGender] = React.useState(company?.gender)
    const [loading, setLoading] = React.useState(false)

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        setLoading(true)
        let payload = {
            name: fullName,
            phone: phone,
            gender: gender,
            email: email,
        }
        const response = await post_data(`company/update-company/${company?._id}`, payload)
        if (response?.status === true) {
            setLoading(false)
            toast.success('Company updated successfully')
            setOpen(false)
            navigate("/admin/dashboard/company")
            window.scrollTo(0, 0)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info" style={{ marginBottom: '8%' }}>
                        <div className="user-details">
                            <h4 className="user-name">Associated Member</h4>
                        </div>
                    </div>

                    <div className="company-selector-container">

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setFullName(e.target.value)} value={fullName}
                                id="outlined-basic" label="Full Name" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setPhone(e.target.value)} value={phone}
                                id="outlined-basic" label="Phone Number" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setEmail(e.target.value)} value={email}
                                id="outlined-basic" label="Email" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <button className="add-company-btn" onClick={handleSave} style={{ marginTop: '3%' }}>
                            {loading ? 'Save...' : 'Save'}
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}