import React from 'react';
import { useTheme, useMediaQuery, Button } from '@mui/material';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';

const Comparison = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const styles = {
        container: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
            boxSizing: 'border-box',
            padding: isMobile ? '0 2% 10%' : '1% 3% 7%',
        },
        tableWrapper: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            width: isMobile ? '700px' : '1100px',
            overflowX: 'auto',
            margin: 'auto',
            borderCollapse: 'collapse',
            textAlign: 'center',
            border: '1px solid #f0f0f0',
            backgroundColor: '#fff',
        },
        th: {
            border: '1px solid #f0f0f0',
            padding: isMobile ? '5%' : '1.5% 2.5%',
            backgroundColor: '#f9f9f9',
            fontWeight: '600',
            width: 150,
            fontSize: isMobile ? '14px' : '18px',
            color: 'black',
        },
        thLeegal: {
            color: 'black',
            borderTopLeftRadius: '10px',
            borderTopRightRadius: '10px',
        },
        td: {
            border: '1px solid #f0f0f0',
            padding: isMobile ? '5%' : '2.5%',
            fontSize: isMobile ? '14px' : '16px',
        },
        column1: {
            color: 'black',
        },
        column2: {
            color: 'white',
            padding: isMobile ? '10px' : '20px',
            borderRadius: '0px',
        },
        column2Total: {
            borderBottomLeftRadius: '10px',
            borderBottomRightRadius: '10px',
        },
        totalRow: {
            fontWeight: '600',
            backgroundColor: '#f9f9f9',
        },
        image: {
            width: isMobile ? '20px' : '25px',
            height: isMobile ? '20px' : '25px',
        },
        totalText: {
            color: 'black',
            fontWeight: '600',
        },
        totalBold: {
            fontWeight: '600',
        },
        blackBold: {
            color: 'black',
            fontWeight: '600',
        },
    };


    const rowContent = [
        ['Company Formation'],
        ['EIN'],
        ['Registered Agent'],
        ['Business Address'],
        // ['Business Bank Account'],
        ['Digital Document Access'],
        // ['FinCEN BOI Report'],
    ];

    // const renderRow = (rowIndex) => {
    //     const isImageRow = rowIndex < 6; // Adjusted to 7 rows with icons
    //     const iconSrc = {
    //         leegal: '/images/check-icon.svg',
    //         column3:
    //             rowIndex === 4 ? '/images/check-icon.svg' : rowIndex === 5 ? '/images/check-icon.svg' : '/images/check-icon.svg',
    //         column4:
    //             rowIndex === 4 ? '/images/check-icon.svg' : rowIndex === 5 ? '/images/check-icon.svg' : '/images/check-icon.svg',
    //     };

    //     return (
    //         <>
    //             <tr key={rowIndex}>
    //                 <td style={{ ...styles.td, textAlign: 'left', ...styles.column1, ...(rowIndex === 6 && styles.totalBold) }}>
    //                     {rowContent[rowIndex][0]}
    //                 </td>
    //                 <td style={{
    //                     ...styles.td,
    //                     ...styles.column2,
    //                     ...(rowIndex === 6 && styles.column2Total),
    //                 }}>
    //                     {isImageRow ? (
    //                         <img loading="lazy" src={iconSrc.leegal} alt="icon" style={styles.image} />
    //                     ) : (
    //                         <span style={styles.totalText}>{rowContent[rowIndex][1]}</span>
    //                     )}
    //                 </td>
    //                 <td style={{ ...styles.td, ...(rowIndex === 6 && styles.blackBold) }}>
    //                     {isImageRow ? (
    //                         <img loading="lazy" src={iconSrc.column3} alt="icon" style={styles.image} />
    //                     ) : (
    //                         rowContent[rowIndex][2]
    //                     )}
    //                 </td>
    //                 <td style={{ ...styles.td, ...(rowIndex === 6 && styles.blackBold) }}>
    //                     {isImageRow ? (
    //                         <img loading="lazy" src={iconSrc.column4} alt="icon" style={styles.image} />
    //                     ) : (
    //                         rowContent[rowIndex][3]
    //                     )}
    //                 </td>
    //             </tr>
    //         </>
    //     );
    // };


    const renderRow = (rowIndex) => {
        const isImageRow = rowIndex < rowContent.length; // Adjusted to match row count
        const iconSrc = {
            leegal: '/images/check-icon.svg',
            column3:
                rowIndex === 4 ? '/images/check-icon.svg' : rowIndex === 5 ? '/images/check-icon.svg' : '/images/check-icon.svg',
            column4:
                rowIndex === 4 ? '/images/check-icon.svg' : rowIndex === 5 ? '/images/check-icon.svg' : '/images/check-icon.svg',
        };

        return (
            <>
                <tr key={rowIndex}>
                    <td style={{ ...styles.td, textAlign: 'left', ...styles.column1, ...(rowIndex === rowContent.length && styles.totalBold) }}>
                        {rowContent[rowIndex][0]}
                    </td>
                    <td style={{
                        ...styles.td,
                        ...styles.column2,
                        ...(rowIndex === rowContent.length && styles.column2Total),
                    }}>
                        {isImageRow ? (
                            <img loading="lazy" src={iconSrc.leegal} alt="icon" style={styles.image} />
                        ) : (
                            <span style={styles.totalText}>{rowContent[rowIndex][1]}</span>
                        )}
                    </td>
                    <td style={{ ...styles.td, ...(rowIndex === rowContent.length && styles.blackBold) }}>
                        {isImageRow ? (
                            <img loading="lazy" src={iconSrc.column3} alt="icon" style={styles.image} />
                        ) : (
                            rowContent[rowIndex][2]
                        )}
                    </td>
                    <td style={{ ...styles.td, ...(rowIndex === rowContent.length && styles.blackBold) }}>
                        {isImageRow ? (
                            <img loading="lazy" src={iconSrc.column4} alt="icon" style={styles.image} />
                        ) : (
                            rowContent[rowIndex][3]
                        )}
                    </td>
                </tr>
            </>
        );
    };

    const startButton = {
        background: '#EA580C',
        color: 'white',
        padding: '10px 15px',
            borderRadius: 3,
        fontSize: isMobile ? '13px' : '14px',
        boxShadow: 'none',
        textTransform: 'capitalize',
        marginTop: '3%',
        zIndex: 10,
        '&:hover': {
            boxShadow: 'none',
            backgroundColor: '#d0191f',
        },
    };

    return (
        <div style={styles.container}>
            <h2 style={{ textAlign: 'center', marginBottom: isMobile ? '5px' : '5px', color: '#000', fontWeight: 600, fontSize: 40 }}>
                We are the Best
                <img src="/images/text-high.svg" alt="highlight" />
            </h2>
            <p style={{ opacity: '70%', fontWeight: 400, fontSize: 15, width: isMobile ? '90%' : '35%', textAlign: 'center', marginBottom: isMobile ? '8%' : '4%' }}>
                See how we stack up against top competitors. Compare our pricing and services to clearly understand why we’re the right choice for your business needs.
            </p>
            <div style={styles.tableWrapper}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={{ ...styles.th, textAlign: 'left', width: 250 }}>
                                Comparison
                                <p style={{ opacity: '70%', fontWeight: 400, fontSize: 13, width: 200 }}>
                                    Choose your plan according to your organizational plan
                                </p>
                            </th>
                            <th style={{ ...styles.th, ...styles.thLeegal }}>
                                <img src="/images/logo.png" style={{ width: 180 }} alt="Leegal logo" />
                            </th>
                            <th style={styles.th}>
                                <img src="/images/workhy.png" style={{ width: 120 }} className="workhyImg" alt="Workhy logo" />
                            </th>
                            <th style={styles.th}>
                                <img src="/images/doola.webp" style={{ width: 90 }} alt="Doola logo" />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {Array.from({ length: 6 }, (_, i) => renderRow(i))}
                        {renderRow(6)} */}
                        {Array.from({ length: rowContent.length }, (_, i) => renderRow(i))}



                        <tr>
                            <td style={{ ...styles.td, textAlign: 'left', ...styles.column1 }}>
                            Digital Business Bank Account
                            </td>
                            <td style={{
                                ...styles.td,
                                ...styles.column2,
                            }}>
                                <img src='/images/check-icon.svg' style={{
                                    width: isMobile ? '20px' : '25px',
                                    height: isMobile ? '20px' : '25px',
                                }} />
                            </td>
                            <td style={{
                                ...styles.td,
                                ...styles.column2,
                            }}>
                                {/* <span style={{ ...styles.totalText, fontSize: 18 }}>₹5,982</span> */}
                                <span style={{ ...styles.totalText, fontSize: 18 }}>$69</span>
                            </td>
                            <td style={{
                                ...styles.td,
                                ...styles.column2,
                            }}>
                                {/* <span style={{ ...styles.totalText, fontSize: 18 }}>₹12,918</span> */}
                                <span style={{ ...styles.totalText, fontSize: 18 }}>$149</span>
                            </td>
                        </tr>

                        <tr>
                            <td style={{ ...styles.td, textAlign: 'left', ...styles.column1, ...styles.totalBold, fontSize: 18 }}>
                                Total
                            </td>
                            <td style={{
                                ...styles.td,
                                ...styles.column2,
                            }}>
                                <span style={{ ...styles.totalText, fontSize: 18 }}>
                                    $249 + State Fee
                                    {/* ₹21,589 + State Fee */}
                                    <p style={{ opacity: '60%', fontSize: 12, margin: 0 }}>(Additional $50 OFF at checkout)</p>
                                </span>
                            </td>
                            <td style={{
                                ...styles.td,
                                ...styles.column2,
                            }}>
                                {/* <span style={{ ...styles.totalText, fontSize: 18 }}>₹31,820 + State Fee</span> */}
                                <span style={{ ...styles.totalText, fontSize: 18 }}>$367 + State Fee</span>
                            </td>
                            <td style={{
                                ...styles.td,
                                ...styles.column2,
                            }}>
                                <span style={{ ...styles.totalText, fontSize: 18 }}>$446 + State Fee</span>
                                {/* <span style={{ ...styles.totalText, fontSize: 18 }}>₹38,669 + State Fee</span> */}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div >
            <Button
                endIcon={<IoIosArrowForward />}
                variant="contained"
                sx={startButton}
                onClick={() => {
                    navigate('/pricing');
                    window.scrollTo(0, 0);
                }}
            >
                Start Your Business
            </Button>
        </div >
    );
};

export default Comparison;
