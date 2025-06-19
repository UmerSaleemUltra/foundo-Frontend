import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { get_data, post_data } from "../../api";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Country, State, City } from 'country-state-city';
import { Toaster, toast } from 'react-hot-toast';
import { primaryColor } from "../../constant";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/user-slice";
import { useDispatch } from "react-redux";

export default function AccessUser() {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches3 = useMediaQuery(theme.breakpoints.down(500));

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const [pin, setPin] = useState("");
    const [pinError, setPinError] = useState("");

    const [loader, setLoader] = useState(false);

    const validate = () => {
        let valid = true;
        setEmailError("");

        if (!email) {
            setEmailError("Email is required");
            valid = false;
        }

        if (!pin) {
            setPinError("Pin is required");
            valid = false;
        }

        return valid;
    };


    const handleSubmit = async () => {
        if (validate()) {
            try {
                setLoader(true);
                const response = await post_data("super-admin/access-user", { email, pin });
                setLoader(false);

                if (response?.status) {
                    setEmail("");
                    setPin("")

                    dispatch(login(response?.data?.user));
                    localStorage.setItem("authToken", response?.data.token);
                    toast.success('Login successfull')
                    navigate('/dashboard')
                }
                else {
                    setEmail("");
                    setPin("")
                    toast.error('Something went wrong')
                }
            } catch (error) {
                setLoader(false);
            }
        }
    };

    return (
        <div style={styles.container}>

            <div style={{ ...styles.rightSide, padding: matches3 ? "20px" : '40px', width: matches3 ? '100%' : '50%' }}>
                <div style={{ width: matches3 ? '100%' : matches1 ? "95%" : '60%', margin: 'auto' }}>

                    <h2 style={styles.loginHeading}>Login to user's dashboard!</h2>
                    <p style={styles.loginText}>
                        Fill in the details below.
                    </p>


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
                        label="Admin PIN"
                        variant="outlined"
                        fullWidth
                        value={pin}
                        onChange={(e) => {
                            setPin(e.target.value);
                            setPinError("");
                        }}
                        style={styles.input}
                        error={!!pinError}
                        helperText={pinError}
                    />

                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        disabled={loader}
                        style={styles.signInButton}
                    >
                        {loader ? 'Login...' : ' Login'}
                    </Button>

                </div>

            </div>

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