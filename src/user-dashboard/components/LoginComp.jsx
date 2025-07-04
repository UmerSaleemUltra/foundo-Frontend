import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { primaryColor } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { post_data } from "../../api";
import { useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/slices/user-slice";
import { Toaster, toast } from 'react-hot-toast';

export default function LoginComp() {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches2 = useMediaQuery(theme.breakpoints.down(800));
    const matches3 = useMediaQuery(theme.breakpoints.down(500));


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [loader, setLoader] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user_data } = useSelector((state) => state.user);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validate = () => {
        let valid = true;

        if (!email) {
            setEmailError("Email or Phone Number is required");
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email address is invalid");
            valid = false;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            valid = false;
        } else {
            setPasswordError("");
        }

        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                setLoader(true);
                const data = await post_data("user/user-login", { email, password });
                setLoader(false);

                if (data?.status === true) {
                    dispatch(login(data?.data?.user));
                    localStorage.setItem("authToken", data?.data?.token);
                    toast.success("Login Successfully");
                    setEmail("");
                    setPassword("");
                    navigate("/dashboard");

                    // ✅ Retrieve token if needed
                    const savedToken = localStorage.getItem("authToken");
                    console.log("Saved Token:", savedToken);
                } else {
                    toast.error(data?.message || "Invalid credentials");
                }
            } catch (error) {
                setLoader(false);
                const message = error?.response?.data?.message || "Network error or server issue";
                toast.error(message);
            }
        }
    };

    return (
        <div style={styles.container}>

            <div style={{ ...styles.rightSide, padding: matches3 ? "20px" : '40px', width: matches3 ? '100%' : '50%', }}>
                <div style={{ width: matches3 ? '100%' : matches1 ? "95%" : '70%', margin: 'auto' }}>
                    <h2 style={styles.loginHeading}>Login</h2>
                    <p style={styles.loginText}>
                        Fill in the details below to login to your Dashboard.
                    </p>
                    <form onSubmit={handleSubmit} style={styles.form}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError(false);
                            }}
                            error={!!emailError}
                            helperText={emailError}
                            style={styles.input}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setPasswordError(false);
                            }}
                            error={!!passwordError}
                            helperText={passwordError}
                            style={styles.input}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <div style={styles.rememberMeSection}>
                            <Link href="/forget-password" style={styles.resetPasswordLink}>
                                Forget Password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loader}
                            style={styles.signInButton}
                        >
                            {loader ? 'Sign In...' : 'Sign In'}
                        </Button>
                        <p style={{ marginTop: '5%' }} onClick={() => navigate('/create-account')}>Don&apos;t have an account?
                            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
                                Sign Up
                            </span>
                        </p>
                    </form>
                </div>
            </div>


            {matches3 ? <></> : <div style={styles.leftSide}>
                <img
                    style={{ width: matches1 ? 350 : 450, height: matches1 ? 350 : 450 }}
                    src="/images/login.svg"
                />
            </div>}

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
        padding: 0,
        backgroundColor: 'white',
    },
    leftSide: {
        width: '50%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f4f4f4',
    },
    heading: {
        position: 'relative', // Ensure the heading appears above the overlay
        zIndex: 2,
        fontSize: '2.5rem',
        fontWeight: 500,
        margin: '25% 15%',
        color: 'black', // Change text color to white for better visibility
    },
    rightSide: {
        backgroundColor: '#fff',
        borderRadius: '10px',

        boxSizing: 'border-box',
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
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
    },
    rememberMeSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    resetPasswordLink: {
        fontSize: '0.875rem',
        color: primaryColor,
        textDecoration: 'none',
    },
    signInButton: {
        backgroundColor: primaryColor,
        color: '#fff',
        border: 'none',
 padding: '10px 15px',
            borderRadius: 3,        boxShadow: 'none',
        fontSize: '1rem',
        fontWeight: 400,
        cursor: 'pointer',
        textTransform: 'none', // to remove uppercase transformation of Button
    },
    signUpText: {
        marginTop: '20px',
        fontSize: '1rem',
        color: '#2a2a2a',
        textAlign: 'center',
    },
    signUpLink: {
        color: primaryColor,
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};