import { useEffect, useState } from "react";
import { get_data, post_data } from "../../api";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Toaster, toast } from 'react-hot-toast';
import { primaryColor } from "../../constant";
import { useNavigate } from "react-router-dom";
import MultiStepForm from "../components/MultiStepForm"
import Header from "../../website/components/Header";
import Steppers from "../components/Steppers"
import AboutComp from "../../website/components/AboutComp";
import Contact from "../../website/components/Contact";
import Footer from "../../website/components/Footer";

export default function Order() {

    const theme = useTheme();
    const matches1 = useMediaQuery(theme.breakpoints.down('md'));
    const matches3 = useMediaQuery(theme.breakpoints.down(500));
    const [step, setStep] = useState(0);
    const isDesktop = useMediaQuery('(min-width: 768px)');


    return (
        <>
            <Header />
            <div style={styles.container}>

                <div style={{
                    ...styles.rightSide,
                    padding: !isDesktop ? "10px" : '40px',
                    width: !isDesktop ? '100%' : '70%',
                    overflow: 'auto',
                    display: 'flex',
                    alignItems: 'start'
                }}>
                    <MultiStepForm step={step} setStep={setStep} />
                </div>


                {isDesktop && (
                    <div style={styles.leftSide}>
                        <div style={{ padding: 20 }}>
                            <Steppers step={step} />
                        </div>
                    </div>
                )}
            </div>
            <div style={{ marginTop: '-5%' }}>
                <Contact />
            </div>
            <Footer />
        </>
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
        width: '30%',
        // height: '100%',
        display: 'flex',
        alignItems: 'center',
        margin: '3%',
        borderRadius: 20,
        padding: '4% 0',
        justifyContent: 'center',
        // position: 'sticky',
        // top: 0,
        overflow: 'hidden',
        // backgroundImage: "url('/images/pricing-bg.svg')",
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        backgroundColor: '#F7F8F9',
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
        backgroundColor: primaryColor,
        color: '#fff',
 padding: '10px 15px',
            borderRadius: 3,        width: '100%',
        marginTop: '4%',
        boxShadow: 'none',
        fontSize: '1rem',
        fontWeight: 400,
        cursor: 'pointer',
    },
};