import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { get_data, post_data } from "../../api";
// import OtpComponent from "../website/OtpComponent";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Country, State, City } from 'country-state-city';
import { Toaster, toast } from 'react-hot-toast';
import { primaryColor } from "../../constant";
import { useNavigate } from "react-router-dom";
import OtpComponent from "./OtpComp";

export default function SignupComp() {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches3 = useMediaQuery(theme.breakpoints.down(500));

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [loader, setLoader] = useState(false);
    const [otpForm, setOtpForm] = useState(false);
    const [emailForm, setEmailForm] = useState(true);

    const navigate = useNavigate()

    const validate = () => {
        let valid = true;
        setEmailError("");
        setFirstNameError("");
        setPasswordError("");
        setPhoneError("");
        setConfirmPasswordError("");

        if (!email) {
            setEmailError("Email is required");
            valid = false;
        }
        if (!phone) {
            setPhoneError("Phone number is required");
            valid = false;
        }
        if (!firstName) {
            setFirstNameError("Name is required");
            valid = false;
        }
        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        }
        else if (password?.trim()?.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
            valid = false;
        }
        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password is required");
            valid = false;
        } else if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords do not match");
            valid = false;
        }

        return valid;
    };


    const handleSubmit = async () => {
        if (validate()) {
            try {
                setLoader(true);
                const data = await post_data("user/send-otp-to-register-user", { email, password });
                setLoader(false);

                if (data?.status === true) {
                    setOtpForm(true);
                    setEmailForm(false);
                }
                else {
                    setEmail("");
                    setPassword("");
                    toast.error(data?.response?.data?.message || "Email already exist")
                }
            } catch (error) {
                setLoader(false);
            }
        }
    };

    return (
        <div style={styles.container}>

            <div style={{ ...styles.rightSide, padding: matches3 ? "20px" : '40px', width: matches3 ? '100%' : '50%' }}>
                <div style={{ width: matches3 ? '100%' : matches1 ? "95%" : '70%', margin: 'auto' }}>
                    {emailForm && (
                        <>
                            <h2 style={styles.loginHeading}>A new Business begins here!</h2>
                            <p style={styles.loginText}>
                                Fill in the details below to create your account.
                            </p>
                            <TextField
                                label="First Name"
                                variant="outlined"
                                fullWidth
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setFirstNameError("");
                                }}
                                error={!!firstNameError}
                                helperText={firstNameError}
                                style={styles.input}
                            />

                            <TextField
                                label="Last Name"
                                variant="outlined"
                                fullWidth
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value);
                                }}
                                style={styles.input}
                            />


                            <TextField
                                label="Phone Number"
                                variant="outlined"
                                fullWidth
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    setPhoneError("");
                                }}
                                style={styles.input}
                                error={!!phoneError}
                                helperText={phoneError}
                            />

                            <div style={{ display: 'flex', gap: 10 }}>
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setEmailError("");
                                    }}
                                    error={!!emailError}
                                    helperText={emailError}
                                    style={{ ...styles.input, width: '100%' }}
                                />
                            </div>

                            <TextField
                                label="Password"
                                variant="outlined"
                                type={showPassword ? "text" : "password"}
                                fullWidth
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                error={!!passwordError}
                                helperText={passwordError}
                                style={{ ...styles.input }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Confirm Password"
                                variant="outlined"
                                type={showConfirmPassword ? "text" : "password"}
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordError("");
                                }}
                                error={!!confirmPasswordError}
                                helperText={confirmPasswordError}
                                style={styles.input}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button
                                type="button"
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={loader}
                                style={styles.signInButton}
                            >
                                {loader ? 'Sign Up...' : ' Sign Up'}
                            </Button>
                            <p style={{ marginTop: '5%' }} onClick={() => navigate('/login')}>
                                Already have an account?
                                <span style={{ textDecoration: 'underline', cursor: 'pointer' }}> Login</span>
                            </p>
                        </>
                    )}

                    {otpForm && (
                        <OtpComponent
                            handleResend={handleSubmit}
                            type="signup"
                            email={email}
                            password={password}
                            first_name={firstName}
                            last_name={lastName}
                            phone={phone}
                        />
                    )}

                </div>

            </div>


            {!matches3 && (
                <div style={styles.leftSide}>
                    <img
                        style={{ width: matches1 ? 350 : 450, height: matches1 ? 350 : 450 }}
                        src="/images/signup.svg"
                    />
                </div>
            )}

        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'white',
    },
    leftSide: {
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
        backgroundColor: '#f4f4f4',
    },
    rightSide: {
        backgroundColor: '#fff',
        borderRadius: '10px',
    },
    loginHeading: {
        fontSize: '1.5rem',
        color: primaryColor,
        marginBottom: '20px',
        fontWeight: 500,
    },
    loginText: {
        fontSize: '1rem',
        color: '#2a2a2a',
        marginBottom: '20px',
        textAlign: 'left',
    },
    input: {
        marginBottom: '10px',
    },
    signInButton: {
        padding: '9px 20px',
        backgroundColor: primaryColor,
        color: '#fff',
        borderRadius: 50,
        width: '100%',
        marginTop: '4%',
        boxShadow: 'none',
        fontSize: '1rem',
        fontWeight: 400,
        cursor: 'pointer',
    },
};