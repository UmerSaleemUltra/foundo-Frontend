import React, { useEffect, useState } from 'react';
import { Steps, Card, Typography, Radio, Button, Divider, Rate, Badge, Progress, Form } from 'antd';
import BusinessEntitySelection from './components/BusinessEntitySelection';
import { FaArrowRight } from 'react-icons/fa';
import { Backdrop, CircularProgress, useMediaQuery } from '@mui/material';
import toast from 'react-hot-toast';
import StateSelection from './components/StateSelection';
import FeaturesSection from './components/FeaturesSection';
import BusinessInformationForm from './components/BusinessInformationForm';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import MemberSelection from './components/MemberSelection';
import AddSingleMember from './components/AddSingleMember';
import AddMultipleMember from './components/AddMultipleMember';
import Review from './components/Review';
import { useSelector } from 'react-redux';
import { get_data, post_data } from '../api';
import AddonServicesSelection from './components/AddonServicesSelection';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const BusinessFormation = () => {
    const { user_data } = useSelector((state) => state.user);
    const navigate = useNavigate()
    const isLarge = useMediaQuery('(max-width: 1024px)');
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [currentStep, setCurrentStep] = useState(0);
    const [selectedEntity, setSelectedEntity] = useState('');
    const [selectedState, setSelectedState] = useState(null);
    const [selectedStructure, setSelectedStructure] = useState(null);
    const [form] = Form.useForm();
    const [companyForm, setCompanyForm] = useState({});
    const [singleForm] = Form.useForm();
    const [members, setMembers] = useState([]);
    const [showPaymentPage, setShowPaymentPage] = useState(false);
    const [exchangeRate, setExchangeRate] = useState(null);
    const [transactionId, setTransactionId] = React.useState(null);
    const [hash, setHash] = React.useState(null);
    const [selectedServices, setSelectedServices] = useState([]);
    const [couponApplied, setCouponApplied] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [localData, setLocalData] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [discountValue, setDiscountValue] = useState(0);


    useEffect(() => {
        const fetchExchangeRate = async () => {
            try {
                const response = await get_data(`user/get-exchange-rate`);
                if (response?.status) {
                    setExchangeRate(response?.data);
                } else {
                }
            } catch (error) {
            }
        };

        fetchExchangeRate();
    }, []);


    useEffect(() => {
        const scrollToTop = () => {
            try {
                const contentContainer = document.getElementById('content-container');
                if (contentContainer) {
                    contentContainer.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            } catch (error) {
                console.error('Scroll error:', error);
            }

            const container = document.getElementById('container');
            if (container) {
                container.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        };

        // Add a small delay to ensure DOM is updated
        const timer = setTimeout(scrollToTop, 50);

        return () => clearTimeout(timer);
    }, [currentStep]);

    const fetchLocal = async () => {

        const localStorageData = JSON.parse(localStorage.getItem("businessFormdata"));

        console.log('localStorageData', localStorageData);

        if (localStorageData && Object.keys(localStorageData)?.length > 0) {
            setSelectedEntity(localStorageData?.selectedEntity || '');
            setSelectedState(localStorageData?.selectedState || '');
            setCompanyForm(localStorageData?.companyForm);
            form.setFieldsValue(localStorageData?.companyForm);
            singleForm.setFieldsValue(localStorageData?.members?.[0]);
            setSelectedStructure(localStorageData?.selectedStructure || '');
            setMembers(localStorageData?.members || []);
            setSelectedServices(localStorageData?.selectedServices || []);
            setCurrentUser(localStorageData?.currentUser || null);
        }
    }


    useEffect(() => {
        fetchLocal();
    }, [])


    const convertToINR = (usdAmount) => {
        return (usdAmount * exchangeRate).toFixed(2);
    };


    const getHash = async () => {
        try {
            setLoading(true);
            const res = await post_data('payu/hash', { name: user_data?.first_name, email: user_data?.email, phone: user_data?.phone, amount: convertToINR(totalAmount), productinfo: "LLC formation" });

            if (res?.status === true) {
                setHash(res?.data?.hash)
                setTransactionId(res?.data?.txnid);
                setShowPaymentPage(true);

            } else {
                console.log('Failed to get hash');
                toast.error(res?.response?.data?.error || "Something went wrong");
            }
        } catch (e) {
            console.log('error while getting hash', e);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        if (hash && transactionId) {
            document.getElementById("payuForm").submit();
        }
    }, [showPaymentPage]);


    const styles = {
        container: {
            flex: 1,
            maxHeight: '100vh',
            overflow: isMobile ? 'auto' : 'hidden',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
        },
        sidebarContainer: {
            width: isMobile ? '100%' : isLarge ? '30%' : '25%',
            maxHeight: isMobile ? '' : '100vh',
            overflowY: isMobile ? '' : 'scroll',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            boxSizing: 'border-box',
        },
        contentContainer: {
            width: isMobile ? '100%' : isLarge ? '70%' : '75%',
            maxHeight: isMobile ? '' : '100vh',
            overflowY: isMobile ? '' : 'scroll',
            borderLeft: '1px solid #eee',
            boxSizing: 'border-box',

        },
        sidebar: {
            width: '100%',
            backgroundColor: 'white',
            boxSizing: 'border-box',
        },
        logo: {
            width: '80%',
            marginTop: '-120px',
        }
    }

    const handlePayment = async () => {

        const memberDetails = members?.map((member, index) => {
            return {
                id: member?.id,
                first_name: member?.firstName,
                last_name: member?.lastName,
                phone: member?.phone,
                role: member?.role,
                address: member?.address,
                responsible_member: member?.isResponsible,
                passport: member?.passport
            }
        })

        const selectedAddonsArray = selectedServices?.map((addon) => {
            return {
                name: addon?.text,
                amount: addon?.amt,
            }
        })

        localStorage.setItem('companyFormdata', JSON.stringify({
            company_name: companyForm?.companyName,
            designator: companyForm?.companyEnding,
            industry: companyForm?.industry,
            website: companyForm?.website || '',
            description: companyForm?.description || '',
            members: memberDetails,
            addons: selectedAddonsArray,
            addons_amount: selectedServices?.reduce((total, addon) => total + addon.amt, 0) || 0,
            discount_amount: discountValue || 0,
            services: selectedServices || [],
            total_amount: totalAmount,
            state: selectedState?.label,
            state_fee: selectedState?.fee,
            currentUser: user_data
        }))

        if (user_data?.is_super_admin === true) {
            handleCreateCompanyByAdmin()
        } else {
            await getHash();
        }
    }



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


    console.log('currentUser', currentUser)
    const handleCreateCompanyByAdmin = async () => {
        try {

            const formdata = new FormData();

            const memberDetails = members?.map((member, index) => {
                return {
                    id: member?.id,
                    first_name: member?.firstName,
                    last_name: member?.lastName,
                    phone: member?.phone,
                    role: member?.role,
                    address: member?.address,
                    responsible_member: member?.isResponsible,
                    passport: member?.passport
                }
            })

            const selectedAddonsArray = selectedServices?.map((addon) => {
                return {
                    name: addon?.text,
                    amount: addon?.amt,
                }
            })

            localStorage.setItem('companyFormdata', JSON.stringify({
                company_name: companyForm?.companyName,
                designator: companyForm?.companyEnding,
                industry: companyForm?.industry,
                website: companyForm?.website || '',
                description: companyForm?.description || '',
                members: memberDetails,
                addons: selectedAddonsArray,
                addons_amount: selectedServices?.reduce((total, addon) => total + addon.amt, 0) || 0,
                discount_amount: discountValue || 0,
                services: selectedServices || [],
                total_amount: totalAmount,
                state: selectedState?.label,
                state_fee: selectedState?.fee,
                currentUser: user_data?.is_super_admin === true ? currentUser : user_data
            }))



            formdata.append('user_id', user_data?.is_super_admin === true ? currentUser?._id : user_data?._id);
            formdata.append('name', user_data?.is_super_admin === true ? `${currentUser?.first_name} ${currentUser?.last_name}` : `${user_data?.first_name} ${user_data?.last_name}`);
            formdata.append('email', currentUser?.email || '');
            formdata.append('phone', currentUser?.phone || '');
            formdata.append('company_name', companyForm?.companyName);
            formdata.append('state', selectedState?.label);
            formdata.append('state_fee', selectedState?.fee);
            formdata.append('designator', companyForm?.companyEnding);
            formdata.append('industry', companyForm?.industry);
            formdata.append('website', companyForm?.website || '');
            formdata.append('description', companyForm?.description || '');
            formdata.append('members', JSON.stringify(memberDetails) || []);
            formdata.append('addons', JSON.stringify(selectedAddonsArray));
            formdata.append('addons_amount', selectedServices?.reduce((total, addon) => total + addon.amt, 0) || 0);
            formdata.append('discount_amount', discountValue || 0);
            formdata.append('plan_amount', JSON.parse(localStorage?.getItem("selectedPlanAmount")));
            formdata.append('selected_plan', localStorage?.getItem("selectedPlan"));
            formdata.append('total_amount', totalAmount);
            formdata.append('paid_amount', totalAmount);
            formdata.append('services', JSON.stringify(selectedServices));
            formdata.append('is_super_admin', user_data?.is_super_admin);

            // members?.forEach((member, index) => {
            //     formdata.append(`passport${index + 1}`, member?.passport);
            // });

            // for (const [index, member] of members?.entries()) {
            //     console.log("Member:", member, 'index:', index);
            //     if (member) {
            //         console.log("Member Passport:", member?.passport);
            //         const file = await getFileFromIndexedDB(member?.id);
            //         console.log("File fomr IndexedDB:", file);
            //         if (file) {
            //             formdata.append(`passport${index + 1}`, file);
            //         }
            //     }
            // }

            members?.forEach((member, index) => {
                formdata.append(`passport${index + 1}`, member?.passport);
            });

            setLoading(true);

            const result = await post_data("company/create-company", formdata);
            if (result?.status === true) {
                let payload2 = {
                    user_id: user_data?.is_super_admin === true ? currentUser?._id : user_data?._id,
                    company_id: result?.data?._id,
                    transaction_id: `TID${Date.now()}${Math?.floor(Math?.random() * 1000)}`,
                    service_purchased: selectedServices?.reduce((total, addon) => total + addon.amt, 0) > 0 ? `LLC Formation + Addons Services` : 'LLC Formation',
                    amount: totalAmount,
                };
                const response2 = await post_data('user-transaction/create-user-transaction', payload2)
                if (response2?.status === true) {
                    localStorage.removeItem('companyFormdata');
                    localStorage.removeItem('businessFormdata');
                    sessionStorage.removeItem('members');
                    toast.success('Company created successfully');
                    navigate('/admin/dashboard/company');
                } else {
                    toast.error(response2?.response?.data?.message || 'Something went wrong');
                }
            } else {
                toast.error(result?.response?.data?.message || 'Something went wrong');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast.error('Something wrong');
            console.log("Error while creating company by admin", error)
        }
    }


    const steps = [
        { title: 'Business Structure', description: 'Choose Your Business Structure' },
        { title: 'State of Incorporation', description: 'Select Your State of Incorporation' },
        { title: 'Package', description: 'Unlock Advanced Tools & Premium Features' },
        { title: 'Business Info', description: 'Peace of Mind From Formation to Filing.' },
        { title: 'Company Structure', description: 'Choose Your Company Structure' },
        { title: 'Owners/Shareholders Info', description: "Who's Behind the Business?" },
        { title: 'Addons Info', description: "Add Extra Services" },
        { title: 'Review Order', description: 'Safe Review & Edit' },
        { title: 'Secure Checkout', description: 'Complete Your Purchase Securely' },
    ];

    const handleClickProceed = () => {
        const obj = {};

        if (currentStep === 0) {
            if (selectedEntity === '') {
                toast.error('Please select a business entity.');
                return;
            } else if (!currentUser && user_data?.is_super_admin === true) {
                toast.error('Please select a user.');
                return
            } else {
                obj.selectedEntity = selectedEntity;
                obj.currentUser = currentUser;
                setCurrentStep(currentStep + 1);
            }
        }

        if (currentStep === 1) {
            if (selectedState === null) {
                toast.error('Please select a state.');
                return;
            } else {
                obj.selectedState = selectedState;
                setCurrentStep(currentStep + 1);
            }
        }

        if (currentStep === 2) {
            setCurrentStep(currentStep + 1);
        }

        if (currentStep === 3) {
            form.submit();
            return
        }

        if (currentStep === 4) {
            if (selectedStructure === null) {
                toast.error('Please select a company structure.');
                return;
            } else {
                obj.selectedStructure = selectedStructure;
                setCurrentStep(currentStep + 1);
            }
        }

        if (currentStep === 5) {
            if (selectedStructure === "single") {
                singleForm.submit();
                return
            } else if (members.length === 0) {
                toast.error('Please add at least one member.');
                return;
            } else if (members?.length > 1) {
                const isResponsible = members?.some((member) => member?.isResponsible === true);
                if (!isResponsible) {
                    toast.error('Please select one member as responsible member');
                    return
                }

                obj.members = members;
                setCurrentStep(currentStep + 1);

            } else {
                obj.members = members;
                setCurrentStep(currentStep + 1);
            }
        }

        {
            if (currentStep === 6) {
                obj.selectedServices = selectedServices;
                setCurrentStep(currentStep + 1);
            }
        }


        const existingData = JSON.parse(localStorage.getItem("businessFormdata"));

        if (existingData) {
            localStorage.setItem("businessFormdata", JSON.stringify({ ...existingData, ...obj, ...localData }));
        } else {
            localStorage.setItem("businessFormdata", JSON.stringify({ ...localData, ...obj }));
        }

        if (currentStep === steps.length - 2) {
            handlePayment()
        }
    };


    const onFinish = (values) => {
        setLocalData({ ...localData, companyForm: values });

        const existingData = JSON.parse(localStorage.getItem("businessFormdata"));
        if (existingData) {
            localStorage.setItem("businessFormdata", JSON.stringify({ ...existingData, companyForm: values }));
        }

        setCompanyForm(values);
        setCurrentStep(currentStep + 1);
    };

    const singleFormFinish = async (values) => {
        if (values?.isResponsible === false) {
            values.isResponsible = true
            singleForm.setFieldsValue({ isResponsible: true });
        }

        console.log('typeof values?.passport', typeof values?.passport)

        if (values?.passport && typeof values?.passport !== 'string') {
            try {
                const formData = new FormData();
                formData.append('file', values?.passport);
                formData.append('member_id', values?.id);

                const result = await post_data('passport/upload-passport', formData);
                if (result?.status === true) {
                    values.passport = result?.data?.passport
                }
            } catch (error) {
                console.log('error while saving passport', error);
            }
        }

        const existingData = JSON.parse(localStorage.getItem("businessFormdata"));

        if (existingData) {
            localStorage.setItem("businessFormdata", JSON.stringify({ ...existingData, members: [values] }));
        }
        setMembers([values]);
        setLocalData({ ...localData, members: [values] });
        setCurrentStep(currentStep + 1);
    };


    return (
        <div style={styles.container} id='container'>
            {showPaymentPage && transactionId && hash && <form style={{ display: 'none' }} id="payuForm" action="https://secure.payu.in/_payment" method="post">
                <input type="hidden" name="key" value="HVTs54" />
                <input type="hidden" name="txnid" value={transactionId} />
                <input type="hidden" name="productinfo" value="LLC formation" />
                <input type="hidden" name="amount" value={convertToINR(totalAmount)} />
                <input type="hidden" name="email" value={user_data?.email} />
                <input type="hidden" name="firstname" value={user_data?.first_name} />
                <input type="hidden" name="lastname" value="" />
                <input type="hidden" name="surl" value="https://api.leegal.co/api/payu/success" />
                <input type="hidden" name="furl" value="https://api.leegal.co/api/payu/failure" />
                <input type="hidden" name="phone" value={user_data?.phone} />
                <input type="hidden" name="hash" value={hash} />
                <input type="submit" value="Submit" />
            </form>
            }



            {loading &&
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={loading}
                // onClick={setLoading(false)}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }


            <div style={styles.sidebarContainer}>
                <div style={styles.sidebar}>
                    <div>
                        <Title level={3}>
                            <img loading="lazy" src="/images/logo.png" alt="LOGO" style={styles.logo} />
                        </Title>
                        {/* <div style={{ textAlign: 'center', fontSize: '12px', fontWeight: 'bold' }} >
                            Business Formation Made Simple
                        </div> */}
                    </div>

                    <Divider />

                    {isMobile ? (
                        <div style={{ display: 'flex', alignItems: 'center', padding: 16 }}>
                            <Progress
                                type="circle"
                                percent={Math.round(((currentStep + 1) / 9) * 100)}
                                width={50}
                                format={() => `${currentStep + 1} / 9`}
                                strokeColor="#fa541c"
                            />
                            <div style={{ marginLeft: 12 }}>
                                <div style={{ fontWeight: 'bold', fontSize: 16 }}>
                                    {steps[currentStep].title}
                                </div>
                                <div style={{ color: '#666' }}>{steps[currentStep].description}</div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ padding: '20px', boxSizing: 'border-box' }}>
                            <Steps
                                className="custom-step-gap"
                                direction="vertical"
                                current={currentStep}
                                // onChange={setCurrentStep}
                                size="large"
                                items={steps.map(step => ({
                                    title: step.title,
                                    description: step.description,
                                }))}
                            />
                        </div>
                    )}


                </div>
            </div>


            {/* Right Side - Content */}
            <div style={styles.contentContainer} id="content-container" >
                <div>

                    {
                        currentStep === 0 &&
                        <BusinessEntitySelection currentUser={currentUser} setCurrentUser={setCurrentUser} user_data={user_data} selectedEntity={selectedEntity} setSelectedEntity={setSelectedEntity} />
                    }

                    {
                        currentStep === 1 &&
                        <StateSelection selectedState={selectedState} setSelectedState={setSelectedState} />
                    }

                    {
                        currentStep === 2 &&
                        <FeaturesSection selectedState={selectedState} selectedEntity={selectedEntity} />
                    }

                    {
                        currentStep === 3 &&
                        <BusinessInformationForm selectedEntity={selectedEntity} setSelectedServices={setSelectedServices} selectedServices={selectedServices} form={form} onFinish={onFinish} />
                    }

                    {
                        currentStep === 4 &&
                        <MemberSelection selectedStructure={selectedStructure} setSelectedStructure={setSelectedStructure} />
                    }

                    {
                        currentStep === 5 ?
                            selectedStructure === 'single' ?
                                <AddSingleMember setSelectedServices={setSelectedServices} selectedServices={selectedServices} form={singleForm} onFinish={singleFormFinish} />
                                :
                                <AddMultipleMember setSelectedServices={setSelectedServices} selectedServices={selectedServices} members={members} setMembers={setMembers} />
                            :
                            null
                    }

                    {
                        currentStep === 6 &&
                        <AddonServicesSelection
                            selectedServices={selectedServices}
                            setSelectedServices={setSelectedServices}
                        />
                    }


                    {
                        currentStep === 7 &&
                        <Review
                            selectedEntity={selectedEntity}
                            selectedState={selectedState}
                            selectedStructure={selectedStructure}
                            companyForm={companyForm}
                            members={members}
                            setCurrentStep={setCurrentStep}
                            selectedServices={selectedServices}
                            convertToINR={convertToINR}
                            couponApplied={couponApplied}
                            setCouponApplied={setCouponApplied}
                            totalAmount={totalAmount}
                            setTotalAmount={setTotalAmount}
                            setDiscountValue={setDiscountValue}
                        />
                    }


                    <div style={{ height: '120px' }}></div>

                    <div style={{ position: 'sticky', bottom: 0, zIndex: 10, padding: '20px', display: 'flex', gap: 10, justifyContent: 'end', backgroundColor: 'white', borderTop: '1px solid #eee' }}>
                        <Button
                            size="large"
                            disabled={currentStep === 0}
                            onClick={() => setCurrentStep(currentStep - 1)}
                            style={{
                                backgroundColor: 'white',
                                borderColor: '#EA580C',
                                color: '#EA580C',
                                padding: '10px 50px',
                            }}
                        >
                            <LeftOutlined /> Previous
                        </Button>

                        <Button
                            type="primary"
                            size="large"
                            onClick={() => handleClickProceed()}
                            style={{
                                backgroundColor: '#EA580C',
                                borderColor: '#EA580C',
                                color: 'white',
                                padding: '10px 50px',
                            }}
                        >
                            {currentStep === steps.length - 2 ? 'Pay Now' : 'Next'} <RightOutlined />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessFormation;