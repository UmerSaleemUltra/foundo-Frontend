import { Autocomplete, Box, Button, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { post_data } from "../../api";
import toast from "react-hot-toast";
import { Country, State, City } from 'country-state-city';

const AddUser = ({ open, setOpen, getAllUsers, selectedRow, type }) => {

    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({});
    const [countryList, setCountryList] = React.useState([])


    React.useEffect(() => {
        setCountryList(Country?.getAllCountries());
    }, []);

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
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setCountry('');
        setError({});
    }

    const validation = () => {
        let error = {};
        if (!firstName.trim()) {
            error.firstName = "First Name is required";
        }
        if (!lastName.trim()) {
            error.lastName = "Last Name is required";
        }
        if (!email.trim()) {
            error.email = "Email is required";
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            error.email = "Enter a valid email address";
        }
        if (!phone.trim()) {
            error.phone = "Phone number is required";
        } else if (!/^\+?[0-9]{7,15}$/.test(phone)) {
            error.phone = "Enter a valid phone number";
        }
        if (!password.trim()) {
            error.password = "Password is required";
        }
        if (!country.trim()) {
            error.country = "Country is required";
        }

        setError(error);
        return Object.keys(error).length === 0;
    }

    const handleSubmit = async () => {
        // if (validation()) {
        setLoading(true);

        let payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password,
            country: country
        }

        const response = await post_data('user/create-user', payload);
        if (response?.status === true) {
            getAllUsers()
            toast.success('User created successfully');
        }
        else {
            getAllUsers()
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
                    {type === 'edit' ? 'Edit Coupon' : 'Add User'}
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>

                    <TextField
                        fullWidth
                        label="First Name"
                        variant="outlined"
                        value={firstName}
                        error={error?.firstName}
                        helperText={error?.firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onFocus={(e) => setError({ ...error, firstName: '' })}
                    />

                    <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        label="Last Name"
                        variant="outlined"
                        value={lastName}
                        error={error?.lastName}
                        helperText={error?.lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onFocus={(e) => setError({ ...error, lastName: '' })}
                    />

                    <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        label="Email"
                        variant="outlined"
                        value={email}
                        error={error?.email}
                        helperText={error?.email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={(e) => setError({ ...error, email: '' })}
                    />

                    <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        label="Phone"
                        variant="outlined"
                        value={phone}
                        error={error?.phone}
                        helperText={error?.phone}
                        onChange={(e) => setPhone(e.target.value)}
                        onFocus={(e) => setError({ ...error, phone: '' })}
                    />

                    <TextField
                        style={{ marginTop: '5%' }}
                        fullWidth
                        label="Password"
                        variant="outlined"
                        value={password}
                        error={error?.password}
                        helperText={error?.password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={(e) => setError({ ...error, password: '' })}
                    />

                    <Autocomplete
                        style={{ marginTop: '5%' }}
                        id="country-select"
                        options={countryList}
                        value={countryList?.find(c => c.isoCode === country) || null}
                        onChange={(event, newValue) => setCountry(newValue?.isoCode)}
                        autoHighlight
                        getOptionLabel={(option) => option?.name}
                        renderOption={(props, option) => (
                            <Box
                                component="li"
                                {...props}
                                value={option?.isoCode}
                                key={option?.isoCode}
                            >
                                {option?.name}
                            </Box>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select Country"
                                fullWidth
                            />
                        )}
                    />

                    <Button
                        variant="contained"
                        style={{
                            textTransform: 'capitalize', background: '#EA580C',
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

export default AddUser;