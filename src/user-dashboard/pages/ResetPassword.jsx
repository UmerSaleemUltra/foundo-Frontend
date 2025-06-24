import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { primaryColor } from "../../constant";
import { useDispatch, useSelector } from "react-redux";
import { post_data } from "../../api";
import { FormHelperText, IconButton, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { login } from "../../redux/slices/user-slice";
import { Toaster, toast } from 'react-hot-toast';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function ResetPassword() {
    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches2 = useMediaQuery(theme.breakpoints.down(800));
    const matches3 = useMediaQuery(theme.breakpoints.down(500));

    const { token } = useParams();  // Corrected use of useParams
    const navigate = useNavigate()
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loader, setLoader] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const dispatch = useDispatch()
    const { user_data } = useSelector(state => state.user);

    const handleError = (label, value) => {
        setErrors((prev) => ({ ...prev, [label]: value }));
    };

    const validate = () => {
        let error = false;

        if (!password) {
            error = true;
            handleError('password', 'Password is required');
        }

        if (!confirmPassword) {
            error = true;
            handleError('confirmPassword', 'Confirm password is required');
        }

        if (password && confirmPassword && password !== confirmPassword) {
            error = true;
            handleError('confirmPassword', 'Passwords do not match');
        }

        return error;
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const error = validate();
        if (!error) {
            try {
                setLoader(true);
                const data = await post_data('user/reset-password', { new_password: password, token });
                if (data.status) {
                    toast.success('Password reset successfully');
                    setPassword('');
                    setConfirmPassword('');
                    dispatch(login(data?.data?.user));
                    localStorage.setItem('authToken', data?.data?.token);
                    navigate('/login');
                } else {
                    toast.error(data?.response?.data?.message || 'Something went wrong');
                }
                setLoader(false);
            } catch (error) {
                setLoader(false);
                toast.error('Something went wrong');
            }
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowPassword2(!showPassword2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                setLoader(true);

                setLoader(false);
            } catch (error) {
                setLoader(false);
            }
        }
    }

    return (
        <div style={styles.container}>

            <div style={{ ...styles.rightSide, padding: matches3 ? "20px" : '40px', width: matches3 ? '100%' : '50%', }}>
                <div style={{ width: matches3 ? '100%' : matches1 ? "95%" : '70%', margin: 'auto' }}>
                    <h2 style={styles.loginHeading}>Reset Password</h2>
                    <p style={styles.loginText}>
                        Fill in the details below to reset your password.
                    </p>
                    <form onSubmit={handleResetPassword} style={styles.form}>
                        <TextField
                            fullWidth
                            label="Enter New Password"
                            type={showPassword ? 'text' : 'password'}
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setErrors({ ...errors, password: '' })}
                            autoComplete="off"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={togglePasswordVisibility} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {errors.password && <FormHelperText style={{ color: "#d32f2f" }}>{errors.password}</FormHelperText>}


                        <TextField
                            fullWidth
                            label="Confirm New Password"
                            type={showPassword2 ? 'text' : 'password'}
                            variant="outlined"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            onFocus={() => setErrors({ ...errors, confirmPassword: '' })}
                            autoComplete="off"
                            sx={{ marginTop: '20px' }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={toggleConfirmPasswordVisibility} edge="end">
                                            {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {errors.confirmPassword && <FormHelperText style={{ color: "#d32f2f" }}>{errors.confirmPassword}</FormHelperText>}


                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loader}
                            style={styles.signInButton}
                        >
                            {loader ? 'Loading...' : 'Reset Password'}
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
                    src="/images/reset-password.svg"
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
        padding: '10px 20px',
        marginTop: '20px',
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