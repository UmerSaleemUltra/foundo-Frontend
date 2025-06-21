import { Divider, useMediaQuery, Tabs, Tab, Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';



const FAQ = () => {

    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [openFaq, setOpenFaq] = useState(null);
    const [selectedTab, setSelectedTab] = useState(0); // 0 = Basics (default)

    const tabStyles = {
        tab: {
            minWidth: 50,
            fontWeight: 600,
            fontSize: matches_md ? '13px' : '15px',
            textTransform: 'none',
            color: '#000',
        },
        selectedTab: {
            background: '#EA580C',
            color: 'white !important',
            borderRadius: '50px',
            padding: '10px 20px',
            margin: '0 5px',
        },
        unselectedTab: {
            color: '#EA580C',
            borderColor: '#EA580C',
            borderRadius: '15px',
            padding: '10px 20px',
            margin: '0 5px',
            background: 'transparent',
            '&:hover': {
                background: 'white',
            },
        },
        tabPanel: {
            paddingTop: '20px',
            width: '100%',
        },
    };


    const lineStyles = {
        fontSize: isMobile ? '14px' : '16px',
        opacity: '70%',
        fontWeight: '400',
        textAlign: 'center',
        lineHeight: '1.5',
        width: matches_md ? '90%' : '40%',
        margin: 'auto'
    };

    const sectionStyles = {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
        margin: '20px 0',
        width: '100%',
        maxWidth: '1200px',
        '@media (max-width: 768px)': {
            flexDirection: 'column',
            alignItems: 'center',
        },
    };

    const textContainerStyles = {
        flex: 1,
        padding: '0 20px',
        '@media (max-width: 768px)': {
            padding: '10px 0',
        },



    };


    const applyStyles = (styles) => css(styles);

    const Section = styled.div`${applyStyles(sectionStyles)}`;
    const TextContainer = styled.div`${applyStyles(textContainerStyles)}`;
    const paperStyle = {
        padding: matches_md ? '10px 10px' : '10px 10px',
        width: matches_md ? '90%' : '70%',
        margin: '10px auto',
        backgroundColor: 'transparent',
        borderRadius: '10px',
        boxShadow: 'none',
        overflow: 'hidden',
    };
    const paperContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
        setOpenFaq(null); // Reset the open FAQ when tab changes
    };

    const faqBasicQuestions = [
        {
            question: 'Do I Need to Be a U.S. Citizen to Work with Leegal?',
            answer: 'No worries! We help entrepreneurs from all over the world incorporate their businesses, regardless of citizenship.',
        },
        {
            question: 'What Information Do You Need from Me to Get Started?',
            answer: 'To begin, we just need some basic information about you and your business, including: - Your Company Name - Your Passport or National ID Card - Your Residential Address',
        },
        {
            question: 'How Long Will It Take to File My Company?',
            answer: "The time required to form your company varies by state, typically taking 2 to 7 business days. Obtaining an EIN from the IRS usually takes around 7 business days, though during tax season, this process may extend to 4 to 8 weeks.",
        },
        {
            question: 'What is a Registered Agent?',
            answer: 'A registered agent is a designated person or entity that receives legal documents and official communications on behalf of your business, such as an LLC or corporation.',
        },
        {
            question: 'What Are the Differences Between EIN and ITIN?',
            answer: 'EIN (Employer Identification Number) and ITIN (Individual Taxpayer Identification Number) are both tax IDs, but they serve different purposes:  \n- EIN: Used by businesses to identify themselves for tax purposes, similar to a Social Security number for a company. It\'s necessary for employers, partnerships, and corporations.  \n- ITIN: Designed for individuals who need to file taxes but do not have a Social Security number. It\'s commonly used by non-residents or foreigners earning income in the U.S. but not eligible for an EIN.'
        }
    ];

    const faqBankingQuestions = [
        {
            question: 'Can I open a U.S. bank account as a non-resident?',
            answer: 'Yes, non-residents can open U.S. business bank accounts! We can help you set up accounts with reliable options that cater to international clients.',
        },
        {
            question: 'Which banks do you work with?',
            answer: "We proudly partner with trusted financial institutions, including Mercury, Wise, and Payoneer, to provide seamless and efficient banking solutions for your business needs.",
        },
        {
            question: 'Is it possible to open a traditional, physical U.S. bank account?',
            answer: 'Yes, you can open a physical bank account at most major U.S. banks using our provided documentation, but this will require an in-person visit to the bank. Alternatively, our High Street Bank Account service can handle this for you. With this service, we assign a manager to your company who visits the bank on your behalf to complete the setup.',
        },
        {
            question: "Is it possible to open a traditional, physical U.S. bank account?",
            answer: "Yes, with our provided documentation, you can open a physical bank account at most major U.S. banks. However, an in-person visit to the bank is required.",
        },
        {
            question: 'Can I remove the manager later, or will they be permanently associated with the account?',
            answer: 'Yes, you can remove the manager at any time. To make this change, you have to visit the bank branch to formally remove the manager and designate yourself as the primary signatory. '
        },

    ];

    const refund = () => {
        return (
            <>
                We do offer refunds for payments made on our website.<br /><br />
                - Payments made for U.S. company formation or any other services are eligible for a 100% refund if requested within 24 hours of the payment.<br />
                - After 24 hours, once your order has been processed, refunds may still be possible. However, in such cases, a full refund cannot be guaranteed.<br />
            </>
        )
    }

    const faqPFRQuestions = [
        {
            question: 'What pricing options does Leegal offer?',
            answer: "Leegal offers a comprehensive One-Stop US Company Formation package that includes name check and clearance, LLC state filing, EIN registration, digital document access, U.S. phone number, business address, business bank account setup, registered agent service for one year, all government fees, and the Digital Business Bank Account.",
        },
        {
            question: 'Are there any hidden fees in Leegal’s service packages?',
            answer: 'We pride ourselves on transparency, our service packages include all essential costs for formation. Any additional fees, such as those charged by the state or third-party services, will be clearly communicated.'
        },
        {
            question: 'What is Leegal\'s refund policy?',
            answer: refund()
        }
    ];

    const faqRAQuestions = [


        {
            question: 'What is a Registered Agent?',
            answer: 'A registered agent is an individual or business entity designated to receive official legal and tax documents on behalf of a business, like an LLC or corporation. This includes service of process (like lawsuits), state filings, and other critical correspondence.',
        },
        {
            question: 'Is Having a Registered Agent Required?',
            answer: 'Yes, most jurisdictions legally require businesses, especially LLCs and corporations, to have a registered agent. The registered agent ensures that important documents reach the business promptly, helping maintain compliance with state regulations.',
        },
        {
            question: 'Can I Serve as My Own Registered Agent?',
            answer: 'Yes, you can act as your own registered agent in many states. However, you must meet specific requirements, including having a physical address within the state of registration and being available during regular business hours to receive documents.',
        },
        {
            question: 'What Are the Risks if a Company Doesn’t Have a Registered Agent?',
            answer: 'Without a registered agent, a company risks non-compliance with state laws, potential fines, and missed legal or tax documents. This could result in legal issues, loss of good standing, or even default judgments if lawsuits go unanswered.',
        },

    ];


    const tabContent = [
        {
            title: 'Basics',
            content: (
                <div style={{ width: '100%' }}>
                    <Paper elevation={0} style={{ paddingTop: '10px' }}>
                        <TextContainer>
                            {faqBasicQuestions.map((faq, index) => (
                                <div key={index}>
                                    <h4
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            fontSize: matches_md ? 14 : 18,
                                            color: openFaq === index ? '#EA580C' : 'black',
                                        }}
                                        onClick={() => toggleFaq(index)}
                                    >
                                        {faq.question}
                                        <span style={{ fontSize: matches_md ? '14px' : '', paddingRight: 5 }}>
                                            {openFaq === index ? '-' : '+'}
                                        </span>
                                    </h4>
                                    {openFaq === index && (
                                        <p
                                            style={{
                                                fontWeight: 300,
                                                color: '#000',
                                                fontSize: matches_md ? 13 : 15,
                                            }}
                                        >
                                            {faq.answer}
                                        </p>
                                    )}
                                    <Divider />
                                </div>
                            ))}
                        </TextContainer>
                    </Paper>
                </div>
            ),
        },

        {
            title: 'Pricing, Fees & Refunds',
            content: (
                <div style={{ width: '100%' }}>
                    <Paper elevation={0} style={{ paddingTop: '10px' }}>
                        <TextContainer>
                            {faqPFRQuestions.map((faq, index) => (
                                <div key={index}>
                                    <h4
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            fontSize: matches_md ? 14 : 18,
                                            color: openFaq === index ? '#EA580C' : 'black',
                                        }}
                                        onClick={() => toggleFaq(index)}
                                    >
                                        {faq.question}
                                        <span style={{ fontSize: matches_md ? '14px' : '', paddingRight: 5 }}>
                                            {openFaq === index ? '-' : '+'}
                                        </span>
                                    </h4>
                                    {openFaq === index && (
                                        <p
                                            style={{
                                                fontWeight: 300,
                                                color: '#000',
                                                fontSize: matches_md ? 13 : 15,
                                            }}
                                        >
                                            {faq.answer}
                                        </p>
                                    )}
                                    <Divider />
                                </div>
                            ))}
                        </TextContainer>
                    </Paper>
                </div>
            ),
        },

        {
            title: 'Registered Agent',
            content: (
                <div style={{ width: '100%' }}>
                    <Paper elevation={0} style={{ paddingTop: '10px' }}>
                        <TextContainer>
                            {faqRAQuestions.map((faq, index) => (
                                <div key={index}>
                                    <h4
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                            fontWeight: 500,
                                            fontSize: matches_md ? 14 : 18,
                                            color: openFaq === index ? '#EA580C' : 'black',
                                        }}
                                        onClick={() => toggleFaq(index)}
                                    >
                                        {faq.question}
                                        <span style={{ fontSize: matches_md ? '14px' : '', paddingRight: 5 }}>
                                            {openFaq === index ? '-' : '+'}
                                        </span>
                                    </h4>
                                    {openFaq === index && (
                                        <p
                                            style={{
                                                fontWeight: 300,
                                                color: '#000',
                                                fontSize: matches_md ? 13 : 15,
                                            }}
                                        >
                                            {faq.answer}
                                        </p>
                                    )}
                                    <Divider />
                                </div>
                            ))}
                        </TextContainer>
                    </Paper>
                </div>
            ),
        },
    ];

    return (
        <>

            <div style={{ background: '', padding: matches_md ? '0 6% 7%' : '0 2%', position: 'relative', marginTop: matches_md ? '10%' : '5%' }} id='faq'>
                <div style={{ position: 'relative' }}>
                    <h2
                        style={{
                            fontWeight: 600,
                            fontSize: matches_md ? 35 : 40,
                            textAlign: 'center',
                            marginTop: matches_md ? '' : '10px',
                            marginBottom: matches_md ? '10px' : '30px',
                            color: '#000',
                        }}
                    >
                        Frequently Asked Questions
                    </h2>
                    <div style={lineStyles}>
                        Got a question? Chances are, it's been asked before! Explore our collection of frequently asked questions.
                    </div>

                    <div style={{ overflowX: 'auto', width: '100%', display: 'flex', justifyContent: 'center', marginTop: '3%' }}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            TabIndicatorProps={{
                                style: {
                                    display: 'none',
                                },
                            }}
                        >
                            {tabContent?.map((tab, index) => (
                                <Tab
                                    key={index}
                                    label={tab.title}
                                    sx={selectedTab === index ? { ...tabStyles.tab, ...tabStyles.selectedTab } : { ...tabStyles.tab, ...tabStyles.unselectedTab }}
                                    style={{
                                        marginTop: '3%',
                                        fontWeight: 400,
                                        color: '#000'
                                    }}
                                />
                            ))}
                        </Tabs>
                    </div>


                    {/* Tab Content */}
                    <div style={paperContainerStyle}>
                        <Paper style={paperStyle}>
                            <div style={tabStyles.tabPanel}>{tabContent[selectedTab].content}</div>
                        </Paper>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FAQ;