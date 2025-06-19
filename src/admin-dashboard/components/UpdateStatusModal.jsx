import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Autocomplete, Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getInitials, primaryColor } from '../../constant';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';


export default function UpdateStatusModal({
    open,
    setOpen,
    selectedRow,
    getCompanyList,
    isPayment
}) {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 450,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: 6
    };

    console.log('selectedRow', selectedRow);

    const [status, setStatus] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [amount, setAmount] = React.useState('')

    const { user_data } = useSelector(state => state.user);

    React.useEffect(() => {
        setStatus(selectedRow?.status)
        setAmount(selectedRow?.paid_amount)
    }, [open, user_data, selectedRow])


    const handleClose = () => setOpen(false);

    const handleUpdate = async () => {
        setLoading(true)
        let payload = {
            status: status,
        }
        const response = await post_data(`company/update-company/${selectedRow?._id}`, payload)
        if (response?.status === true) {
            getCompanyList()
            setLoading(false)
            toast.success('Company updated successfully')
            setOpen(false)

            let payload2 = {
                name: selectedRow?.user_id?.first_name + ' ' + selectedRow?.user_id?.last_name,
                email: selectedRow?.user_id?.email,
                company_name: selectedRow?.company_name,
                designator: selectedRow?.designator,
            }
            const response2 = await post_data(`company/send-company-formed-mail`, payload2)

        }
        else {
            getCompanyList()
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }


    const handleAmtUpdate = async () => {
        setLoading(true)
        let payload = {
            paid_amount: amount,
        }
        const response = await post_data(`company/update-company/${selectedRow?._id}`, payload)
        if (response?.status === true) {
            getCompanyList()
            setLoading(false)
            toast.success('Company Amount updated successfully')
            setOpen(false)
        } else {
            getCompanyList()
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

                    <div className="user-info">
                        <div className="user-details">
                            <h4 className="user-name">{selectedRow?.company_name}</h4>
                        </div>
                    </div>

                    <div className="company-selector-container">

                        {isPayment
                            ?
                            <FormControl fullWidth style={{ marginBottom: '5%' }}>
                                <TextField
                                    id="outlined-basic"
                                    label="Amount"
                                    variant="outlined"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </FormControl>
                            :
                            <FormControl fullWidth style={{ marginBottom: '5%' }}>
                                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                                <Select
                                    value={status}
                                    label="Status"
                                    onChange={(e) => setStatus(e.target.value)}
                                >
                                    <MenuItem value={'processing'}>Processing</MenuItem>
                                    <MenuItem value={'completed'}>Completed</MenuItem>
                                </Select>
                            </FormControl>
                        }

                        <button className="add-company-btn" onClick={isPayment ? handleAmtUpdate : handleUpdate}>
                            {loading ? 'Save...' : 'Save'}
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}