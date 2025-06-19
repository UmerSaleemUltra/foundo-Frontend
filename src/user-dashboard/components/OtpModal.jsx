import React, { useRef, useEffect, useState } from "react";
import { TextField, Button, Snackbar, Alert, Modal, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { post_data } from "../../api";
import { ToastBar, toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/slices/user-slice";
import { primaryColor } from "../../constant";
import { useNavigate } from "react-router-dom";

export default function OtpModal({
    email,
    handleResend,
    phone,
    type,
    open,
    setOpen
}) {

    const dispatch = useDispatch();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [loading, setLoading] = useState(false);
    const otpInputRefs = useRef([]);
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down("sm"));
    const matches_md = useMediaQuery(theme.breakpoints.down("md"));
    const [timer, setTimer] = useState(59);
    const [canResend, setCanResend] = useState(false);
    const { user_data } = useSelector(state => state.user)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: 4,

    };

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        } else {
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleFocus = (index) => {
        setFocusedIndex(index);
    };

    const otpBox = {
        width: matches_md ? 30 : 30,
        height: matches_md ? 40 : 40,
        background: "transparent",
        padding: "2.5% 4%",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
    };

    const handleOtpChange = (index, value) => {
        let arr = value !== "" ? value.split("") : "";
        let currentValue = "";

        if (arr !== "") {
            currentValue = arr[arr.length - 1];
        }

        const newOtp = [...otp];
        newOtp[index] = currentValue;
        setOtp(newOtp);

        if (currentValue !== "" && index < otpInputRefs.current.length - 1) {
            otpInputRefs.current[index + 1].focus();
        }

        if (currentValue === "" && index > 0) {
            otpInputRefs.current[index - 1].focus();
        }
    };

    const handleSubmit = async () => {

        setLoading(true);

        if (type === 'change-email') {
            let payload = { otp: otp.join(""), new_email: email, user_id: user_data?._id };
            const response = await post_data("user/verify-otp-for-change-email", payload);
            if (response?.status === true) {
                setLoading(false)
                dispatch(login(response?.data));
                handleClose();
                toast.success("Email changed successfully")
            } else {
                toast.error(response?.response?.data?.error || "Something went wrong");
            }
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        setTimer(59);
        setCanResend(false);
        handleResend()
    };

    const handleEnter = (event) => {
        if (event.key == 'Enter') {
            handleSubmit()
        }
    }

    const button = {
        padding: '10px 0',
        borderRadius: '8px',
        backgroundColor: primaryColor,
        color: 'white',
        fontSize: 15,
        width: '85%',
        margin: '0 auto 4%',
        borderRadius: 15,
        textTransform: 'capitalize',
        cursor: 'pointer',
        border: 'none',
    }

    const resendTimer = `00:${timer < 10 ? `0${timer}` : timer} seconds`

    const handleClose = () => {
        setOpen(false);
        setOtp(["", "", "", ""]);
    }

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="otp-form">
                        {otp?.map((digit, index) => {
                            return (
                                <>
                                    <div
                                        style={{
                                            ...otpBox,
                                            border:
                                                focusedIndex === index
                                                    ? `2px solid ${primaryColor}`
                                                    : "2px solid #CBCBCB",
                                        }}
                                    >
                                        <TextField
                                            onKeyPress={(event) => handleEnter(event)}
                                            onFocus={() => handleFocus(index)}
                                            value={digit}
                                            inputRef={(ref) => (otpInputRefs.current[index] = ref)}
                                            onChange={(e) =>
                                                handleOtpChange(index, e.target.value, "one")
                                            }
                                            sx={{
                                                input: {
                                                    color: "black",
                                                    fontSize: 30,
                                                    textAlign: "center",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                            variant="standard"
                                            hiddenLabel
                                            placeholder=" "
                                            InputProps={{
                                                disableUnderline: true,
                                                inputProps: { maxLength: 1 },
                                            }}
                                        />
                                    </div>
                                </>
                            );
                        })}
                        <p className="otp-form-txt" style={{ marginTop: '3%' }}>
                            Please enter your verification code.
                        </p>
                        <p className="otp-form-txt">
                            An OTP has been sent to {email ? email : phone}
                        </p>
                    </div >

                    <center>
                        <Button
                            disabled={loading}
                            onClick={handleSubmit}
                            className={loading ? "register-btn-disable" : "register-btn"}
                            style={button}
                        >
                            {loading ? "Verifying..." : "Verify"}
                        </Button>
                    </center>

                    <center>
                        <div style={{ marginBottom: '5%' }}>
                            {canResend ? (
                                <p onClick={handleResendOtp} style={{ cursor: 'pointer', color: primaryColor, fontWeight: 500, textDecoration: 'underline' }}>
                                    Resend OTP
                                </p>
                            ) : (
                                <p className="otp-form-txt">
                                    Didn&apos;t receive OTP? Resend in <b>{resendTimer}</b>
                                </p>

                            )}
                        </div>
                    </center>
                </Box>
            </Modal>
        </>
    );
}