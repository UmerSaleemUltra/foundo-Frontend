import { Autocomplete, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { use } from 'react';
import { get_data } from '../../api';
import { states } from "../../constant";

export default function Step1({
    name,
    email,
    phone,
    gender,
    setName,
    setEmail,
    setPhone,
    setGender,
    onNext,
    currentUser,
    setCurrentUser,
    user_data
}) {
    const [selectedState, setSelectedState] = useState(null);
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const [countryCode, setCountryCode] = useState('');
    const [errors, setErrors] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await get_data('user/get-all-users-for-options');
        if (response?.status === true)
            setUsers(response?.data);
    };

    const handleStateSelect = (event, newValue) => {
        localStorage.setItem('selectedState', JSON.stringify(newValue?.label));
        localStorage.setItem('selectedStateFee', JSON.stringify(newValue?.fee));
        localStorage.setItem('selectedPlan', 'One-Stop');
        localStorage.setItem('selectedPlanAmount', JSON.stringify(newValue?.fee + 249));

        setSelectedState(newValue);
    };

    useEffect(() => {
        const state = JSON.parse(localStorage.getItem('selectedState'));
        if (state) {
            setSelectedState({ label: state, fee: localStorage.getItem('selectedStateFee') })
        }
        // setSelectedState({ label: "Wyoming", fee: 102 },)
    }, []);

    const handleError = (error, label) => {
        setErrors(prev => ({ ...prev, [label]: error }));
    };

    const validation = () => {
        let error = false;
        if (!name.trim()) {
            error = true;
            handleError('Please input Name', 'name');
        }
        if (!email.trim()) {
            error = true;
            handleError('Please input Email', 'email');
        }
        if (!phone.trim()) {
            error = true;
            handleError('Please input Phone', 'phone');
        }
        if (!gender.trim()) {
            error = true;
            handleError('Please input Gender', 'gender');
        }

        return error;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const hasError = validation();
        if (!hasError) {
            onNext({ name, email, phone: countryCode + phone, gender, currentUser });
        }
    };


    return (
        <div style={{ width: matches_md ? '90vw' : '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', justifyContent: 'center' }} >
                <div style={{ width: '100%' }}>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <div style={{ fontWeight: 500 }} >Account Info</div>
                            </Grid>


                            {
                                user_data?.is_super_admin === true &&
                                <Grid item xs={12} style={{ marginTop: '1%' }}>
                                    <Autocomplete
                                        disablePortal
                                        options={states}
                                        value={selectedState}
                                        onChange={handleStateSelect}
                                        getOptionLabel={(option) => option.label}
                                        renderOption={(props, option) => (
                                            <li {...props}>
                                                <div>
                                                    {option.label} <em>{option.tagline}</em>
                                                </div>
                                            </li>
                                        )}
                                        renderInput={(params) => <TextField {...params} label="Select state" />}
                                    />
                                </Grid>
                            }


                            {
                                user_data?.is_super_admin === true &&
                                <Grid item xs={12} style={{ marginTop: '1%' }}>
                                    <Autocomplete
                                        disablePortal
                                        options={users}
                                        value={currentUser || null}
                                        onChange={(e, newValue) => setCurrentUser(newValue)}
                                        getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
                                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                                        renderInput={(params) => <TextField {...params} label="Select User" />}
                                    />
                                </Grid>
                            }

                            <Grid item xs={12} style={{ marginTop: '1%' }}>
                                <TextField
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    label="Enter Full Name"
                                    onFocus={() => handleError('', 'name')}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => handleError('', 'email')}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email}
                                    label="Email Address" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        label="Gender"
                                        onChange={(e) => setGender(e.target.value)}
                                        onFocus={() => handleError('', 'gender')}
                                        error={Boolean(errors.gender)}
                                    >
                                        <MenuItem value={'Male'}>Male</MenuItem>
                                        <MenuItem value={'Female'}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                                {errors.gender ? <div style={{ color: '#EA2024', fontSize: 12 }}>{errors.gender}</div> : <></>}
                            </Grid>
                            <Grid item xs={6} >
                                <PhoneInput
                                    country={'us'}
                                    value={phone}
                                    onChange={(phone, countryData) => {
                                        setPhone(phone);
                                        setCountryCode(countryData.dialCode);
                                        if (!phone) {
                                            handleError('Please input Phone...', 'phone');
                                        } else {
                                            handleError('', 'phone');
                                        }
                                    }}
                                    onBlur={() => {
                                        if (!phone) {
                                            handleError('Please input Phone...', 'phone');
                                        }
                                    }}
                                    inputStyle={{ width: '100%' }}
                                />
                                {errors.phone ? <div style={{ color: '#EA2024', fontSize: 12 }}>{errors.phone}</div> : <></>}
                            </Grid>
                            <Grid item xs={12} style={{ display: 'flex' }} >
                                <Button endIcon={<EastIcon />} onClick={handleSubmit} style={{ background: '#EA2024', color: 'white', margin: '44px 0px 44px auto', borderRadius: '50px', padding: '1% 3%' }}>
                                    Next
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </div>
    );
};