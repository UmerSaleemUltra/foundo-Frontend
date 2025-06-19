import { Autocomplete, Box, Button, CircularProgress, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { get_data, post_data } from "../../api";
import toast from "react-hot-toast";
import { Gif } from "@mui/icons-material";

const AddTransaction = ({ open, setOpen, getAllTransactions, selectedRow, isUpdate }) => {
    const [companyId, setCompanyId] = React.useState(null);
    const [userId, setUserId] = React.useState(null);
    const [service_purchased, setServicePurchased] = React.useState(null);
    const [amount, setAmount] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({});
    const [companyList, setCompanyList] = React.useState([]);
    const [userList, setUserList] = React.useState([]);
    const [paymentDate, setPaymentDate] = React.useState(null);


    useEffect(() => {
        fetchUsers();
        fetchCompanies();
    }, []);

    useEffect(() => {
        if (isUpdate) {
            setCompanyId(selectedRow?.company_id);
            setUserId(selectedRow?.user_id);
            setServicePurchased(selectedRow?.service_purchased);
            setAmount(selectedRow?.amount);
            setPaymentDate(selectedRow?.created_at ? new Date(selectedRow?.created_at).toISOString().split("T")[0] : null);
        }
    }, [selectedRow]);

    const fetchUsers = async () => {
        const response = await get_data('user/get-all-users-for-options');
        if (response?.status === true)
            setUserList(response?.data);
    };

    const fetchCompanies = async () => {
        const response = await get_data('company/get-all-companies-for-options');
        if (response?.status === true)
            setCompanyList(response?.data);

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 5,
        borderRadius: 6,
    };

    const handleClose = () => {
        setOpen(false);
        setCompanyId('');
        setUserId('');
        setServicePurchased('');
        setAmount('');
        setError({});
    }

    const validation = () => {
        let error = {};

        if (!companyId) {
            error.companyId = 'Please select company';
        }

        if (!userId) {
            error.userId = 'Please select user';
        }

        if (!service_purchased) {
            error.service_purchased = 'Please select service';
        }

        if (!amount) {
            error.amount = 'Please input amount';
        }

        setError(error);
        return Object.keys(error).length === 0;
    }

    const handleSubmit = async () => {
        // if (validation()) {
        setLoading(true);

        let payload = {
            company_id: companyId,
            user_id: userId,
            service_purchased: service_purchased,
            amount: amount,
            transaction_id: `TID${Date.now()}${Math?.floor(Math?.random() * 1000)}`,
            created_at: paymentDate
        }

        const response = await post_data('user-transaction/create-user-transaction', payload);
        if (response?.status === true) {
            getAllTransactions()
            toast.success('Transaction created successfully');
        }
        else {
            getAllTransactions()
            toast.error(response?.response?.data?.message || 'Something went wrong');
        }
        setLoading(false);
        handleClose();
    }

    const handleUpdate = async () => {
        // if (validation()) {
        setLoading(true);

        let payload = {
            company_id: companyId,
            user_id: userId,
            service_purchased: service_purchased,
            amount: amount,
            created_at: paymentDate
        }

        const response = await post_data(`user-transaction/update-user-transaction/${selectedRow?._id}`, payload);
        if (response?.status === true) {
            getAllTransactions()
            toast.success('Transaction updated successfully');
        }
        else {
            getAllTransactions()
            toast.error(response?.response?.data?.message || 'Something went wrong');
        }
        setLoading(false);
        handleClose();
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={style}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '7%' }}>
                    {isUpdate ? 'Update Transaction' : 'Add Transaction'}
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} style={{ marginTop: '1%' }}>
                            <Autocomplete
                                disablePortal
                                options={userList}
                                value={userId || null}
                                onChange={(e, newValue) => setUserId(newValue)}
                                getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
                                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                renderInput={(params) => <TextField {...params} label="Select User" />}
                            />
                        </Grid>

                        <Grid item xs={12} style={{ marginTop: '1%' }}>
                            <Autocomplete
                                disablePortal
                                options={companyList}
                                value={companyId || null}
                                onChange={(e, newValue) => setCompanyId(newValue)}
                                getOptionLabel={(option) => option.company_name}
                                isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                renderInput={(params) => <TextField {...params} label="Select Company" />}
                            />
                        </Grid>


                        <Grid item xs={12} style={{ marginTop: '1%' }}>
                            <TextField
                                fullWidth
                                label="Service Purchased"
                                variant="outlined"
                                value={service_purchased}
                                onChange={(e) => setServicePurchased(e.target.value)}
                                error={!!error.service_purchased}
                                helperText={error.service_purchased}
                            />

                        </Grid>

                        <Grid item xs={12} style={{ marginTop: '1%' }}>
                            <TextField
                                fullWidth
                                label="Amount"
                                variant="outlined"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                error={!!error.amount}
                                helperText={error.amount}
                            />

                        </Grid>

                        <Grid item xs={12} style={{ marginTop: '1%' }}>
                            <TextField
                                type="date"
                                fullWidth
                                label="Payment Date"
                                variant="outlined"
                                value={paymentDate}
                                onChange={(e) => setPaymentDate(e.target.value)}
                                error={!!error.paymentDate}
                                helperText={error.paymentDate}
                            />
                        </Grid>
                    </Grid>


                    <Button
                        variant="contained"
                        style={{
                            textTransform: 'capitalize', background: '#EA2024',
                            color: 'white', boxShadow: 'none', marginTop: 20,
                            borderRadius: 12, padding: 12, marginLeft: 'auto', display: 'flex'
                        }}
                        onClick={isUpdate? handleUpdate : handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <>{isUpdate ? 'Update' : 'Create'}</>}
                    </Button>


                </Typography>
            </Box>
        </Modal>
    )
}

export default AddTransaction;