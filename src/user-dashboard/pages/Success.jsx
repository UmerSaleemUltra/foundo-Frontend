import React, { useEffect, useState } from 'react';
import { Button, useMediaQuery } from '@mui/material';
import { primaryColor } from '../../constant';
import AboutComp from '../../website/components/AboutComp';
import Contact from '../../website/components/Contact';
import Footer from '../../website/components/Footer';
import Header from '../../website/components/Header';
import { post_data } from '../../api';
import { useSelector } from 'react-redux';

export default function Success() {

    const isDesktop = useMediaQuery('(min-width: 768px)');
    const { user_data } = useSelector((state) => state.user);
    const [timeLeft, setTimeLeft] = useState(15);

    const success_box = {
        width: isDesktop ? '40%' : '90%',
        margin: '5% auto',
        padding: '2% 2% 3%',
        background: '#F7F8F9',
        display: 'flex',
        justifyContent: 'center',
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'column',
    };

    const btnStyles = {
        padding: '13px 30px',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: primaryColor,
        border: 'none',
        borderRadius: 12,
        textTransform: 'capitalize',
        cursor: 'pointer',
        marginTop: '20px',
    };

    const company_payload = JSON.parse(localStorage.getItem('companyFormdata'));
    const members = JSON.parse(sessionStorage.getItem('members'));

    // const getFileFromIndexedDB = (key) => {
    //     return new Promise((resolve, reject) => {
    //         if (!key) {
    //             reject("Invalid key for IndexedDB retrieval");
    //             return;
    //         }

    //         const request = indexedDB.open("tempFileDB", 1);

    //         request.onsuccess = (e) => {
    //             const db = e.target.result;
    //             const transaction = db.transaction("files", "readonly");
    //             const store = transaction.objectStore("files");
    //             const getRequest = store.get(key); // Fetch using memberId as key

    //             getRequest.onsuccess = () => {
    //                 resolve(getRequest.result?.file || null);
    //             };

    //             getRequest.onerror = () => {
    //                 reject("Error retrieving file from IndexedDB");
    //             };
    //         };

    //         request.onerror = () => {
    //             reject("Error opening IndexedDB");
    //         };
    //     });
    // };



    // const getFileFromIndexedDB = (key) => {
    //     return new Promise((resolve, reject) => {
    //         if (!key) {
    //             reject("Invalid key for IndexedDB retrieval");
    //             return;
    //         }

    //         const request = indexedDB.open("tempFileDB", 1);

    //         request.onsuccess = (e) => {
    //             const db = e.target.result;
    //             const transaction = db.transaction("files", "readonly");
    //             const store = transaction.objectStore("files");
    //             const getRequest = store.get(key);

    //             getRequest.onsuccess = () => {
    //                 resolve(getRequest.result?.file || null);
    //             };

    //             getRequest.onerror = () => {
    //                 reject("Error retrieving file from IndexedDB");
    //             };
    //         };

    //         request.onerror = () => {
    //             reject("Error opening IndexedDB");
    //         };
    //     });
    // };

    const getFileFromIndexedDB = (key) => {
    return new Promise((resolve, reject) => {
        if (!key) {
            reject("Invalid key for IndexedDB retrieval");
            return;
        }

        const request = indexedDB.open("tempFileDB", 1);

        // Create object store if not present
        request.onupgradeneeded = (e) => {
            const db = e.target.result;
            if (!db.objectStoreNames.contains("files")) {
                db.createObjectStore("files");
            }
        };

        request.onsuccess = (e) => {
            const db = e.target.result;

            if (!db.objectStoreNames.contains("files")) {
                reject("Object store 'files' not found in IndexedDB");
                return;
            }

            const transaction = db.transaction("files", "readonly");
            const store = transaction.objectStore("files");
            const getRequest = store.get(key);

            getRequest.onsuccess = () => {
                resolve(getRequest.result?.file || null);
            };

            getRequest.onerror = () => {
                reject("Error retrieving file from IndexedDB");
            };
        };

        request.onerror = () => {
            reject("Error opening IndexedDB");
        };
    });
};


    const handleCreateCompany = async () => {
        try {

            const formdata = new FormData();

            formdata.append('user_id', user_data?._id);
            formdata.append('name', `${user_data?.first_name} ${user_data?.last_name}`);
            formdata.append('email', user_data?.email);
            formdata.append('phone', user_data?.phone);
            formdata.append('gender', company_payload?.gender);
            formdata.append('company_name', company_payload?.company_name);
            formdata.append('state', company_payload?.state);
            formdata.append('state_fee', company_payload?.stateFee);
            // formdata.append('state', JSON.parse(localStorage?.getItem("selectedState")))?.replace(/"/g, '');
            // formdata.append('state_fee', JSON.parse(localStorage?.getItem("selectedStateFee")));
            formdata.append('designator', company_payload?.designator);
            formdata.append('industry', company_payload?.industry);
            formdata.append('website', company_payload?.website);
            formdata.append('description', company_payload?.description);
            formdata.append('members', JSON.stringify(company_payload?.members));
            formdata.append('addons', JSON.stringify(company_payload?.addons));
            formdata.append('addons_amount', company_payload?.addons_amount);
            formdata.append('discount_amount', company_payload?.discount_amount);
            formdata.append('plan_amount', JSON.parse(localStorage?.getItem("selectedPlanAmount")));
            formdata.append('selected_plan', localStorage?.getItem("selectedPlan"));
            formdata.append('total_amount', parseInt(company_payload?.total_amount));
            formdata.append('paid_amount', parseInt(company_payload?.total_amount));
            // formdata.append('total_amount', parseInt(JSON.parse(localStorage?.getItem("selectedPlanAmount"))) + parseInt(company_payload?.addons_amount) - parseInt(company_payload?.discount_amount));
            // formdata.append('paid_amount', parseInt(JSON.parse(localStorage?.getItem("selectedPlanAmount"))) + parseInt(company_payload?.addons_amount) - parseInt(company_payload?.discount_amount));
            formdata.append('services', JSON.stringify(company_payload?.services));

            // for (const [index, member] of company_payload?.members?.entries()) {

            //     console.log("Member:", member, 'index:', index);
            //     if (member) {
            //         console.log("Member Passport:", member?.passport);
            //         const file = await getFileFromIndexedDB(member.id);
            //         console.log("File fomr IndexedDB:", file);
            //         if (file) {
            //             formdata.append(`passport${index + 1}`, file);
            //         }
            //     }
            // }
            
            members?.forEach((member, index) => {
                formdata.append(`passport${index + 1}`, member?.passport);
            });

            if (
                company_payload && Object.keys(company_payload)?.length > 0
            ) {
                const result = await post_data("company/create-company", formdata);
                if (result?.status === true) {
                    let payload2 = {
                        user_id: user_data?._id,
                        company_id: result?.data?._id || null,
                        transaction_id: `TID${Date.now()}${Math?.floor(Math?.random() * 1000)}`,
                        service_purchased: company_payload?.addons_amount > 0 ? `LLC Formation + Addons Services` : 'LLC Formation',
                        amount: company_payload?.total_amount
                    };
                    const response2 = await post_data('user-transaction/create-user-transaction', payload2)
                    if (response2?.status) {
                        localStorage.removeItem('businessFormdata');
                        localStorage.removeItem('companyFormdata');
                        sessionStorage.removeItem('members');
                    }
                } else {
                }
            }


        } catch (error) {
            console.log('error after payment', error);

            alert('Error after payment');
        }
    };

    useEffect(() => {
        handleCreateCompany();


        // Set up a timer that counts down every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);


        const startTime = Date.now();
        const enforceTimeLimit = () => Date.now() - startTime < 15000;

        const preventClose = (event) => {
            if (enforceTimeLimit()) {
                event.preventDefault();
                event.returnValue = 'Are you sure you want to leave? Wait for the process to complete.';
            }
        };

        const handleBlur = () => {
            if (enforceTimeLimit()) {
                alert('Please stay on this page for 15 seconds to complete the process.');
            }
        };

        window.addEventListener('beforeunload', preventClose);
        window.addEventListener('blur', handleBlur);

        const timeout = setTimeout(() => {
            window.removeEventListener('beforeunload', preventClose);
            window.removeEventListener('blur', handleBlur);
        }, 15000);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('beforeunload', preventClose);
            window.removeEventListener('blur', handleBlur);
        };


    }, []);

    return (
        <>
            <Header />
            <div style={{ background: '#fff', display: 'flex', justifyContent: 'center', height: '100vh' }}>
                <div style={success_box}>

                    {
                        timeLeft > 0 && (
                            <h3
                                className="global-h3"
                                style={{ margin: '2% 0', fontSize: 20, textAlign: 'center' }}
                            >
                                Do not press back or close this page for {timeLeft} seconds
                            </h3>
                        )
                    }

                    <img
                        src={'/images/green-check-icon.svg'}
                        style={{ width: 120, marginTop: '4%', marginBottom: '3%' }}
                        alt="Success"
                    />
                    <h3
                        className="global-h3"
                        style={{ margin: '2% 0', fontSize: 20, textAlign: 'center' }}
                    >
                        Payment Successfull! <br />'Thanks a lot for putting up this Order'
                    </h3>

                    <p style={{ textAlign: 'center', fontSize: 13, marginTop: '1%', opacity: '70%' }}>
                        Questions? Suggestions? insightful shower thoughts?
                    </p>
                    <p style={{ color: primaryColor, fontWeight: 500, textDecoration: 'underline', textAlign: 'center' }}>
                        info@leegal.co
                    </p>
                    <a href="/dashboard" target="_blank" rel="noreferrer">
                        <Button style={btnStyles}>Go to Dashboard</Button>
                    </a>
                </div>
            </div>
            <AboutComp />
            <div style={{ marginTop: '-10%' }}>
                <Contact />
            </div>
            <Footer />
        </>
    );
}
