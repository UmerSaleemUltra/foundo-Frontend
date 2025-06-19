import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function EditRegAgent({
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

    const [name, setName] = React.useState(company?.reg_agent_name)
    const [address, setAddress] = React.useState(company?.reg_agent_address)

    const [loading, setLoading] = React.useState(false)

    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        setLoading(true)
        let payload = {
            reg_agent_name: name,
            reg_agent_address: address,
        }
        const response = await post_data(`company/update-company/${company?._id}`, payload)
        if (response?.status) {
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
                            <h4 className="user-name">Registered Agent</h4>
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
                                onChange={(e) => setAddress(e.target.value)} value={address}
                                id="outlined-basic" label="Address" variant="outlined" />
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