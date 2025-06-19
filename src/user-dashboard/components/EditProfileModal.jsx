import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Autocomplete, Avatar } from '@mui/material';
import { getInitials, primaryColor } from '../../constant';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { Country, State, City } from 'country-state-city';
import ChangePassword from '../../admin-dashboard/components/ChangePassword';
import ChangeEmail from './ChangeEmail';


export default function EditProfileModal({
    open,
    setOpen,
    user_data,
    getAllUsers,
    type
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

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [countryList, setCountryList] = React.useState([])
    const [country, setCountry] = React.useState('');
    const [ChangePasswordOpen, setChangePasswordOpen] = React.useState(false);
    const [changeEmailOpen, setChangeEmailOpen] = React.useState(false);


    React.useEffect(() => {
        setFirstName(user_data?.first_name)
        setLastName(user_data?.last_name)
        setEmail(user_data?.email)
        setPhone(user_data?.phone)
        setCountry(user_data?.country)
    }, [open, user_data])


    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        setLoading(true)
        let payload = {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            email: email,
            country: country,
        }
        const response = await post_data(`user/update-user/${user_data?._id}`, payload)
        if (response?.status) {
            if (type === 'admin') {
                getAllUsers()
            }
            setLoading(false)
            toast.success('Profile updated successfully')
            setOpen(false)
        }
        else {
            if (type === 'admin') {
                getAllUsers()
            }
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }

    React.useEffect(() => {
        setCountryList(Country?.getAllCountries());
    }, []);

    const handleCountryChange = (event, newValue) => {
        if (newValue) {
            setCountry(newValue.isoCode);
        }
    };


    return (
        <div>
            <ChangeEmail open={changeEmailOpen} setOpen={setChangeEmailOpen} user_data={user_data} />
            <ChangePassword open={ChangePasswordOpen} setOpen={setChangePasswordOpen} type={'User Profile'} user_data={user_data} />

            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info">
                        <Avatar className="user-avatar">{getInitials(user_data?.first_name + ' ' + user_data?.last_name)}</Avatar>
                        <div className="user-details">
                            <h4 className="user-name">{user_data?.first_name + ' ' + user_data?.last_name}</h4>
                        </div>
                    </div>

                    <div className="company-selector-container">

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                id="outlined-basic" label="First Name" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setLastName(e.target.value)} value={lastName}
                                id="outlined-basic" label="Last Name" variant="outlined" />
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
                        

                        {/* <p onClick={() => {
                            setOpen(false)
                            setChangeEmailOpen(true)
                        }} style={{ color: primaryColor, fontWeight: 500, cursor: 'pointer', fontSize: 14, textDecoration: 'underline', marginBottom: '6%' }}>
                            Change Email
                        </p> */}

                        <div style={{ marginBottom: '3%' }}>
                            <Autocomplete
                                id="country-select"
                                options={countryList}
                                value={countryList?.find(c => c.isoCode === country) || null}
                                onChange={handleCountryChange}
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
                        </div>

                        <p
                            onClick={() => {
                                setOpen(false)
                                setChangePasswordOpen(true)
                            }}
                            style={{ color: primaryColor, fontWeight: 500, cursor: 'pointer', fontSize: 14, textDecoration: 'underline', marginBottom: '6%' }}>
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
