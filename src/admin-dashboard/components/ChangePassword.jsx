import { Box, Modal, Typography, TextField, Divider, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { post_data } from "../../api";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ChangePassword({ open, setOpen, user_data, type }) {
    console.log('changepass', user_data);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [showPassword, setShowPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleClose = () => setOpen(false);

    const validation = () => {
        const error = {};
        if (!currentPassword.trim()) {
            error.currentPassword = type === "User Profile" ? "Field is required" : "Current Password is required";
        }
        if (!newPassword.trim()) {
            error.newPassword = type === "User Profile" ? "Field is required" : "New Password is required";
        }

        if (type === "User Profile") {
            if (currentPassword !== newPassword) {
                error.newPassword = "Password doesn't match";
            }
        }

        setError(error);
        return Object.keys(error).length === 0;
    };

    const handleSave = async () => {
        if (validation()) {
            setLoading(true);
            const payload = {
                currentPassword: currentPassword,
                newPassword: newPassword,
            };

            let result;

            if (type === "User Profile") {
                result = await post_data(`user/change-user-password-by-admin/${user_data?._id}`, payload);

            } else if (user_data?.is_user === true) {
                result = await post_data(`user/change-user-password/${user_data?._id}`, payload);
            } else {
                result = await post_data(`super-admin/change-password-super-admin/${user_data?._id}`, payload);
            }

            if (result?.status === true) {
                toast.success('Password changed successfully');
                setLoading(false);
                handleClose();
            }
            else {
                toast.error(result?.response?.data?.message || 'Something went wrong');
                setLoading(false);
            }
        }
    };


    return (
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    border: "none",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 4,
                }}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Change Password
                </Typography>


                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-password">{type === "User Profile" ? "New Password" : "Current Password"}</InputLabel>
                    <OutlinedInput
                        type={showPassword ? 'text' : 'password'}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        value={currentPassword}
                        error={error?.currentPassword}
                        helperText={error?.currentPassword}
                        onFocus={() => setError({ ...error, currentPassword: '' })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={type === "User Profile" ? "New Password" : "Current Password"}
                    />
                    <FormHelperText sx={{ color: '#d32f2f' }}>{error?.currentPassword}</FormHelperText>
                </FormControl>

                <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel htmlFor="outlined-adornment-password">{type === "User Profile" ? "Confirm Password" : "New Password"}</InputLabel>
                    <OutlinedInput
                        type={showNewPassword ? 'text' : 'password'}
                        onChange={(e) => setNewPassword(e.target.value)}
                        value={newPassword}
                        error={error?.newPassword}
                        helperText={error?.newPassword}
                        onFocus={() => setError({ ...error, newPassword: '' })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showNewPassword ? 'hide the password' : 'display the password'
                                    }
                                    onClick={handleClickShowNewPassword}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label={type === "User Profile" ? "Confirm Password" : "New Password"}
                    />
                    <FormHelperText sx={{ color: '#d32f2f' }}>{error?.newPassword}</FormHelperText>
                </FormControl>

                <button className="add-company-btn" style={{ marginTop: 15 }} disabled={loading} onClick={handleSave}>
                    {loading ? 'Save...' : 'Save'}
                </button>

            </Box>
        </Modal>
    );
}