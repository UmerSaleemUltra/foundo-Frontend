import { Box, Button, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { post_data } from "../../api";
import toast from "react-hot-toast";

const AddCoupon = ({ open, setOpen, getAllCoupons, selectedRow, type }) => {

    const [coupon, setCoupon] = React.useState('');
    const [discount, setDiscount] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({});

    useEffect(() => {
        setCoupon(selectedRow?.coupon_code)
        setDiscount(selectedRow?.discount_value)
    }, [selectedRow, open])

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
        setCoupon('');
        setDiscount('');
        setError({});
    }

    const validation = () => {
        let error = {};
        if (!coupon?.trim()) {
            error = { ...error, coupon: 'Please input coupon name' };
        }
        if (!discount?.trim()) {
            error = { ...error, discount: 'Please input discount' };
        }

        setError(error);
        return Object.keys(error).length === 0;
    }

    const handleSubmit = async () => {
        // if (validation()) {
        setLoading(true);

        let payload = {
            coupon_code: coupon,
            discount_value: discount,
        }
        if (type === 'edit') {
            const response = await post_data(`coupon/update-coupon/${selectedRow?._id}`, payload);
            if (response?.status) {
                getAllCoupons()
                toast.success('Coupon updated successfully');
            }
            else {
                getAllCoupons()
                toast.error(response?.response?.data?.message || 'Something went wrong');
            }
        }
        else {
            const response = await post_data('coupon/create-coupon', payload);
            if (response?.status) {
                getAllCoupons()
                toast.success('Coupon created successfully');
            }
            else {
                getAllCoupons()
                toast.error(response?.response?.data?.message || 'Something went wrong');
            }
        }
        setLoading(false);
        handleClose();
        // }
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
                    {type === 'edit' ? 'Edit Coupon' : 'Add Coupon'}
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    <TextField
                        fullWidth
                        label="Coupon Name"
                        variant="outlined"
                        value={coupon}
                        error={error?.coupon}
                        helperText={error?.coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        onFocus={(e) => setError({ ...error, coupon: '' })}
                    />

                    <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        label="Discount (in %)"
                        variant="outlined"
                        value={discount}
                        error={error?.discount}
                        helperText={error?.discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        onFocus={(e) => setError({ ...error, discount: '' })}
                    />

                    <Button
                        variant="contained"
                        style={{
                            textTransform: 'capitalize', background: '#EA2024',
                            color: 'white', boxShadow: 'none', marginTop: 20,
                            borderRadius: 12, padding: 12, marginLeft: 'auto', display: 'flex'
                        }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : <>{type === 'edit' ? 'Update' : 'Create'}</>}
                    </Button>


                </Typography>
            </Box>
        </Modal>
    )
}

export default AddCoupon;