import { Box, Modal, Typography, TextField, Divider, Button, InputAdornment, IconButton, OutlinedInput, InputLabel, FormControl, FormHelperText } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { post_data } from "../../api";
import OtpModal from "./OtpModal";

export default function ChangeEmail({ open, setOpen, user_data }) {

    const [newEmail, setNewEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [otpOpen, setOtpOpen] = useState(false);

    const handleClose = () => setOpen(false);

    const validation = () => {
        const error = {};
        if (!newEmail.trim()) {
            error.currentPassword = "New Email is required";
        }

        setError(error);
        return Object.keys(error).length === 0;
    };

    const handleSave = async () => {
        if (validation()) {
            setLoading(true);
            const payload = {
                newEmail: newEmail,
            };

            const result = await post_data(`user/change-user-email/${user_data?._id}`, payload);


            if (result?.status === true) {
                setLoading(false);
                setOtpOpen(true);
                handleClose();
            }
            else {
                toast.error(result?.response?.data?.message || 'Something went wrong');
                setLoading(false);
            }
        }
    };


    return (
        <div>
            <OtpModal email={newEmail} handleResend={handleSave} type={'change-email'} open={otpOpen} setOpen={setOtpOpen} />
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
                        Change Email
                    </Typography>

                    <TextField
                        id="outlined-basic"
                        label="Enter New Email"
                        variant="outlined"
                        style={{ margin: '5% 0' }}
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        error={!!error.newEmail}
                        helperText={error.newEmail}
                        fullWidth
                    />
                    <button className="add-company-btn" style={{ marginTop: 10 }} disabled={loading} onClick={handleSave}>
                        {loading ? 'Loading...' : 'Get OTP'}
                    </button>
                </Box>
            </Modal>
        </div>
    );
}