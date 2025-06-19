import { Box, Button, Modal, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { formatDate, formatDollar, primaryColor } from "../../constant";

const InvoiceModal = ({ open, setOpen, currentInvoice }) => {

    const contentRef = useRef(null);
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const styles = {
        invoice: {
            padding: "4%",
            height: 470,
        },
        header: {
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "2px solid #000",
            paddingBottom: "10px",
            marginBottom: "5%",
        },
        brand: {
            textAlign: "left",
        },
        info: {
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "10px",
            paddingBottom: "10px",
        },
        infoSection: {
            textAlign: "left",
        },
        table: {
            width: "100%",
            borderCollapse: "collapse",
        },
        th: {
            border: "1px solid #ddd",
            padding: "8px",
        },
        td: {
            border: "1px solid #ddd",
            padding: "8px",
        },
        footer: {
            marginTop: "20px",
            borderTop: "2px solid #000",
            marginTop: "5%",
            paddingTop: "10px",
            display: "flex",
            justifyContent: "space-between",
        },
        terms: {
            textAlign: "left",
        },
        payment: {
            textAlign: "left",
        },
        summary: {
            marginTop: "20px",
            textAlign: "right",
        },
        text: {
            fontSize: 14,
        },
    };


    const handleDownloadPdf = async () => {
        if (contentRef.current) {
            const canvas = await html2canvas(contentRef.current);
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const pageHeight = 295;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save("invoice.pdf");
        }
    };

    const styleModal = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: '65%',
        height: isDesktop ? '85%' : '80%',
        borderRadius: 2,
        overflowY: 'auto',
        bgcolor: "white",
        color: 'black',
        display: 'flex',
        flexDirection: 'column',
        border: "none",
        boxShadow: 24,
        p: 2,
    };

    const button = {
        padding: '5px',
        fontSize: 13,
        color: '#fff',
        backgroundColor: primaryColor,
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        width: isDesktop ? '15%' : '40%',
        marginTop: '20px',
        boxShadow: 'none',
        marginLeft: 'auto'
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <Box sx={styleModal}>
                    <div ref={contentRef} id="invoice" style={styles.invoice}>
                        <div style={styles.header}>
                            <div style={styles.brand}>
                                <h2 style={{ fontWeight: 600, margin: 0, }}>Leegal LLC</h2>
                                <p style={{ fontSize: 11, opacity: "70%" }}>
                                    Business Formation Partner
                                </p>
                            </div>
                            <h2 style={{ fontWeight: 600, margin: 0 }}>INVOICE</h2>
                        </div>
                        <div style={{ ...styles.info, ...styles.text }}>
                            <div style={styles.infoSection}>
                                <p>
                                    <strong>Invoice to:</strong>
                                </p>
                                <p>{currentInvoice?.user_id?.first_name} {currentInvoice?.user_id?.last_name}</p>
                                <p>{currentInvoice?.user_id?.country}</p>
                            </div>
                            <div style={{ ...styles.infoSection, textAlign: 'right' }}>
                                <p>
                                    <strong>Invoice no.: </strong> {currentInvoice?.invoice_number}
                                </p>
                                <p>
                                    <strong>Date: </strong> {formatDate(currentInvoice?.created_at)}
                                </p>
                            </div>
                        </div>
                        <table style={{ ...styles.table, ...styles.text, marginTop: "3%" }}>
                            <thead style={{ textAlign: "left" }}>
                                <tr>
                                    <th style={{ borderRight: '1px solid gainsboro' }}>S No.</th>
                                    <th style={{ borderRight: '1px solid gainsboro' }}>Transaction ID</th>
                                    <th style={{ borderRight: '1px solid gainsboro' }}>User Name</th>
                                    <th style={{ borderRight: '1px solid gainsboro' }}>Company</th>
                                    <th style={{ borderRight: '1px solid gainsboro' }}>Service</th>
                                    <th style={{ borderRight: '1px solid gainsboro' }}>Amount</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ borderRight: '1px solid gainsboro' }}>1.</td>
                                    <td style={{ borderRight: '1px solid gainsboro' }}>{currentInvoice?.transaction_id}</td>
                                    <td style={{ borderRight: '1px solid gainsboro' }}>{currentInvoice?.user_id?.first_name + ' ' + currentInvoice?.user_id?.last_name}</td>
                                    <td style={{ borderRight: '1px solid gainsboro' }}>{currentInvoice?.company_id?.company_name + ' ' + currentInvoice?.company_id?.designator}</td>
                                    <td style={{ borderRight: '1px solid gainsboro' }}>{currentInvoice?.service_purchased}</td>
                                    <td style={{ borderRight: '1px solid gainsboro' }}>{formatDollar(currentInvoice?.amount)}</td>
                                    <td>{formatDate(currentInvoice?.created_at)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div style={{ ...styles.footer, ...styles.text }}>
                            <div style={styles.terms}>
                                <p>Thanks for doing business with us.</p>
                                {/* <p>Terms & Conditions</p>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                                    dignissim pretium consectetur.
                                </p> */}
                            </div>
                            <div style={{ ...styles.summary, ...styles.text }}>
                                <p style={{ margin: 0, padding: 0 }}>
                                    <strong>Total Paid: {formatDollar(currentInvoice?.amount)}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                    <Button variant="contained" onClick={() => { handleDownloadPdf() }} style={button}>Download</Button>
                </Box>
            </Modal>
        </>
    );
};

export default InvoiceModal;