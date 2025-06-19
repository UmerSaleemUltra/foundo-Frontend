import { Backdrop, CircularProgress, Grid, Paper } from "@mui/material";
import Steppers from "./Steppers";
import { useEffect, useRef, useState } from 'react';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { get_data, post_data } from "../../api";
import { useSelector } from "react-redux";
import { useRazorpay } from 'react-razorpay';
import { primaryColor } from "../../constant";
import SuccessModal from "./SuccessModal";
import toast from "react-hot-toast";
import { current } from "@reduxjs/toolkit";
import PayuPaymentPage from "../pages/PayuPaymentPage";


export default function MultiStepForm({ setStep, step }) {
    const navigate = useNavigate();
    const { user_data } = useSelector(state => state.user);
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'))
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentUser, setCurrentUser] = useState('');
    const [formData, setFormData] = useState({});
    const [successOpen, setSuccessOpen] = useState(false)
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('')
    const [companyName, setCompanyName] = useState('');
    const [companyIndustry, setCompanyIndustry] = useState('');
    const [website, setWebsite] = useState('');
    const [businessDescription, setBusinessDescription] = useState('');
    const [designator, setDesignator] = useState('')
    const [members, setMembers] = useState([{ id: Date.now(), firstName: '', lastName: '', roleInCompany: '', phoneNumber: '', address: '', ssn_Number: '', errors: {}, passport: '', responsible_member: false, file: '' }]);
    const [selectedAddons, setSelectedAddons] = useState([]);
    const [totalAddonPrice, setTotalAddonPrice] = useState(0);
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const planAmount = JSON.parse(localStorage?.getItem("selectedPlanAmount"));
    const [discount, setDiscount] = useState(0);
    const [couponApplied, setCouponApplied] = useState(false);
    const [isResponsible, setIsResponsible] = useState(false);
    const [hash, setHash] = useState(null);
    const [transactionId, setTransactionId] = useState(null);
    const [showPaymentPage, setShowPaymentPage] = useState(false);

    const getFileFromIndexedDB = (key) => {
        return new Promise((resolve, reject) => {
            if (!key) {
                reject("Invalid key for IndexedDB retrieval");
                return;
            }

            const request = indexedDB.open("tempFileDB", 1);

            request.onsuccess = (e) => {
                const db = e.target.result;
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

    const fetchLocal = async () => {

        const localData = JSON.parse(localStorage.getItem("companyFormdata"));


        let storedAddons = localStorage.getItem("selectedAddons");

        const selectedAddons = storedAddons ? JSON.parse(storedAddons) : [];


        if (localData && Object.keys(localData)?.length > 0) {
            setName(localData?.name || '');
            setEmail(localData?.email || '');
            setPhone((localData?.phone)?.slice(2));
            setGender(localData?.gender || '');
            setCompanyName(localData?.company_name || '');
            setCompanyIndustry(localData?.industry || '');
            setDesignator(localData?.designator || '');
            setWebsite(localData?.website || '');
            setBusinessDescription(localData?.description || '');
            setSelectedAddons(selectedAddons || []);
            setTotalAddonPrice(parseInt(localStorage?.getItem("totalAddonPrice") ? localStorage?.getItem("totalAddonPrice") : 0) || 0);
            setServices(localData?.services || []);
            setCurrentUser(localData?.currentUser || '');

            let membersArray = [];

            for (let i = 0; i < localData?.members?.length; i++) {
                let member = localData.members[i];
                let memberLocal = {
                    id: member?.id,
                    firstName: member?.first_name,
                    lastName: member?.last_name,
                    roleInCompany: member?.role,
                    phoneNumber: member?.phone,
                    address: member?.address,
                    ssn_Number: member?.ssn_Number,
                    passport: member?.passport,
                    responsible_member: member?.responsible_member,
                    file: await getFileFromIndexedDB(member.id),
                    passport: await getFileFromIndexedDB(member.id)
                };

                membersArray.push(memberLocal);
            }

            if (membersArray?.length > 0) {
                setMembers(membersArray);
            }
        }
    }


    useEffect(() => {
        fetchLocal();
    }, [])

    const handleNext = (data) => {

        let localData = JSON.parse(localStorage.getItem("companyFormdata"));

        if (data?.companyName) {
            data = { ...data, "company_name": data?.companyName };
        }

        if (data?.companyIndustry) {
            data = { ...data, "industry": data?.companyIndustry };
        }

        if (data?.businessDescription) {
            data = { ...data, "description": data?.businessDescription };
        }

        if (data?.services) {
            const selectedAddonsArray = data?.services?.map((addon) => {
                return {
                    name: addon?.text,
                    amount: addon?.amt,
                }
            })

            data = { ...data, "addons": selectedAddonsArray, services: data?.services, addons_amount: data?.totalAddonPrice };
        }

        if (data?.member) {

            const memberDetails = data?.members?.map((member, index) => {
                return {
                    id: member?.id,
                    first_name: member?.firstName,
                    last_name: member?.lastName,
                    phone: member?.phoneNumber,
                    role: member?.roleInCompany,
                    address: member?.address,
                    responsible_member: member?.responsible_member,
                    passport: member?.passport
                }
            })

            data = { ...data, "members": memberDetails };
        }


        if (localData) {
            localStorage.setItem("companyFormdata", JSON.stringify({ ...localData, ...data }));
        } else {
            localStorage.setItem("companyFormdata", JSON.stringify(data));
        }

        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    const handlePrev = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        let payload = { ...formData, ...data }
        // if (payload) {
        //     setFinalFormData(payload)
        // }
        setLoading(true)
        if (user_data?.is_super_admin === true) {
            handleCreateCompanyByAdmin(payload)
        } else {
            getHash(payload);
        }
    };


    const getHash = async (payload) => {
        try {

            const { name, email, phone, gender, companyName, designator, companyIndustry, website, businessDescription, selectedAddons } = formData;

            const memberDetails = members?.map((member, index) => {
                return {
                    id: member?.id,
                    first_name: member?.firstName,
                    last_name: member?.lastName,
                    phone: member?.phoneNumber,
                    role: member?.roleInCompany,
                    address: member?.address,
                    responsible_member: member?.responsible_member,
                    passport: member?.passport
                }
            })

            const selectedAddonsArray = services?.map((addon) => {
                return {
                    name: addon?.text,
                    amount: addon?.amt,
                }
            })

            localStorage.setItem('companyFormdata', JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                gender: gender,
                company_name: companyName,
                designator: designator,
                industry: companyIndustry,
                website: website,
                description: businessDescription,
                members: memberDetails,
                addons: selectedAddonsArray,
                addons_amount: localStorage?.getItem("totalAddonPrice") || 0,
                discount_amount: discount,
                services: services || [],
                currentUser: user_data?.is_super_admin === true ? currentUser : user_data
            }))



            const res = await post_data('payu/hash', { name: payload?.name, email: payload?.email, phone: payload?.phone, amount: payload?.finalPrice, productinfo: "LLC formation" });

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
        }
    }


    const handleCreateCompanyByAdmin = async (formData) => {
        try {
            
            const formdata = new FormData();

            const { name, email, phone, gender, companyName, designator, companyIndustry, website, businessDescription, selectedAddons } = formData;

            const memberDetails = members?.map((member, index) => {
                return {
                    id: member?.id,
                    first_name: member?.firstName,
                    last_name: member?.lastName,
                    phone: member?.phoneNumber,
                    role: member?.roleInCompany,
                    address: member?.address,
                    responsible_member: member?.responsible_member,
                    passport: member?.passport
                }
            })

            const selectedAddonsArray = services?.map((addon) => {
                return {
                    name: addon?.text,
                    amount: addon?.amt,
                }
            })

            localStorage.setItem('companyFormdata', JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                gender: gender,
                company_name: companyName,
                designator: designator,
                industry: companyIndustry,
                website: website,
                description: businessDescription,
                members: memberDetails,
                addons: selectedAddonsArray,
                addons_amount: localStorage?.getItem("totalAddonPrice") || 0,
                discount_amount: discount,
                services: services || [],
                currentUser: user_data?.is_super_admin === true ? currentUser : user_data
            }))

            formdata.append('user_id', user_data?.is_super_admin === true ? currentUser?._id : user_data?._id);
            formdata.append('name', name);
            formdata.append('email', email);
            formdata.append('phone', phone);
            formdata.append('gender', gender);
            formdata.append('company_name', companyName);
            formdata.append('state', JSON.parse(localStorage?.getItem("selectedState")))?.replace(/"/g, '');
            formdata.append('state_fee', JSON.parse(localStorage?.getItem("selectedStateFee")));
            formdata.append('designator', designator);
            formdata.append('industry', companyIndustry);
            formdata.append('website', website);
            formdata.append('description', businessDescription);
            formdata.append('members', JSON.stringify(memberDetails) || []);
            formdata.append('addons', JSON.stringify(selectedAddonsArray));
            formdata.append('addons_amount', localStorage?.getItem("totalAddonPrice") || 0);
            formdata.append('discount_amount', discount);
            formdata.append('plan_amount', JSON.parse(localStorage?.getItem("selectedPlanAmount")));
            formdata.append('selected_plan', localStorage?.getItem("selectedPlan"));
            formdata.append('total_amount', JSON.parse(localStorage?.getItem("selectedPlanAmount")) + - discount);
            formdata.append('paid_amount', parseInt(JSON.parse(localStorage?.getItem("selectedPlanAmount"))) + parseInt(localStorage?.getItem("totalAddonPrice")) - discount);
            formdata.append('services', JSON.stringify(services));
            formdata.append('is_responsible', isResponsible);
            formdata.append('is_super_admin', user_data?.is_super_admin);

            members?.forEach((member, index) => {
                formdata.append(`passport${index + 1}`, member?.passport);
            });

            const result = await post_data("company/create-company", formdata);
            if (result?.status === true) {
                let payload2 = {
                    user_id: user_data?.is_super_admin === true ? currentUser?._id : user_data?._id,
                    company_id: result?.data?._id,
                    transaction_id: `TID${Date.now()}${Math?.floor(Math?.random() * 1000)}`,
                    service_purchased: localStorage?.getItem("totalAddonPrice") > 0 ? `LLC Formation + Addons Services` : 'LLC Formation',
                    amount: JSON.parse(localStorage?.getItem("selectedPlanAmount")) + JSON.parse(localStorage?.getItem("totalAddonPrice")) - discount,
                };
                const response2 = await post_data('user-transaction/create-user-transaction', payload2)
                if (response2?.status === true) {
                    localStorage.removeItem('companyFormdata');
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

    const [exchangeRate, setExchangeRate] = useState(null);

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

    // useEffect(() => {
    //     if (hash && transactionId) {
    //         // Auto-submit the form once hash and txnid are set
    //         document.getElementById("payuForm").submit();
    //     }
    // }, [hash, transactionId]);

    const convertToINR = (usdAmount) => {
        return (usdAmount * exchangeRate).toFixed(2);
    };

    // const handlePhonePePayment = async (payload) => {

    //     handleCreateCompany(payload)

    //     let phonePePayload = {
    //         user_id: user_data?._id,
    //         name: user_data?.first_name + ' ' + user_data?.last_name,
    //         // amount: 1,
    //         amount: convertToINR(Math?.ceil(JSON.parse(localStorage?.getItem("selectedPlanAmount")) + parseInt(localStorage?.getItem(totalAddonPrice)) - discount)),
    //         number: user_data?.phone,
    //         transactionId: `TID${Date.now()}${Math?.floor(Math?.random() * 1000)}`,
    //     }
    //     const response = await post_data('company/make-payment', phonePePayload)

    //     if (response) {
    //         window.location.href = response?.data?.url;
    //         setLoading(false)

    //     } else {
    //         alert("Failed to initiate PhonePe payment.");
    //         setLoading(false)
    //     }
    // }

    // const handleCreateCompany = async (formData) => {
    //     try {

    //         const { name, email, phone, gender, companyName, designator, companyIndustry, website, businessDescription, selectedAddons } = formData;

    //         const memberDetails = members?.map((member, index) => {
    //             return {
    //                 id: member?.id,
    //                 first_name: member?.firstName,
    //                 last_name: member?.lastName,
    //                 phone: member?.phoneNumber,
    //                 role: member?.roleInCompany,
    //                 address: member?.address,
    //                 responsible_member: member?.responsible_member,
    //                 passport: member?.passport
    //             }
    //         })

    //         const selectedAddonsArray = services?.map((addon) => {
    //             return {
    //                 name: addon?.text,
    //                 amount: addon?.amt,
    //             }
    //         })

    //         localStorage.setItem('companyFormdata', JSON.stringify({
    //             name: name,
    //             email: email,
    //             phone: phone,
    //             gender: gender,
    //             company_name: companyName,
    //             designator: designator,
    //             industry: companyIndustry,
    //             website: website,
    //             description: businessDescription,
    //             members: memberDetails,
    //             addons: selectedAddonsArray,
    //             addons_amount: localStorage?.getItem("totalAddonPrice") || 0,
    //             discount_amount: discount,
    //             services: services || [],
    //             currentUser: user_data?.is_super_admin === true ? currentUser : user_data
    //         }))

    //         sessionStorage.setItem('members', JSON.stringify(members));


    //     } catch (e) {
    //         // console.log(e);
    //     }
    // };


    return (
        <>
            {
                showPaymentPage
                    ?
                    <form id="payuForm" action="https://secure.payu.in/_payment" method="post">
                        <input type="hidden" name="key" value="HVTs54" />
                        <input type="hidden" name="txnid" value={transactionId} />
                        <input type="hidden" name="productinfo" value="LLC formation" />
                        <input type="hidden" name="amount" value={formData?.finalPrice} />
                        <input type="hidden" name="email" value={formData?.email} />
                        <input type="hidden" name="firstname" value={formData?.name} />
                        <input type="hidden" name="lastname" value="" />
                        <input type="hidden" name="surl" value="https://api.leegal.co/api/payu/success" />
                        <input type="hidden" name="furl" value="https://api.leegal.co/api/payu/failure" />
                        <input type="hidden" name="phone" value={formData?.phone} />
                        <input type="hidden" name="hash" value={hash} />
                        <input type="submit" value="Submit" />
                    </form>
                    :
                    <>

                        {loading &&
                            <Backdrop
                                sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                                open={loading}
                            // onClick={setLoading(false)}
                            >
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        }
                        <SuccessModal open={successOpen} setOpen={setSuccessOpen} />
                        <div style={{ padding: matches_md ? '0 2%' : '0 10%', marginTop: '4%' }} >
                            <Grid container spcing={2} style={{ marginTop: '0' }} gap={2}>
                                {/* <Grid item xs={12} md={3.3}>
                        <div style={{ padding: 20 }}>
                            <Steppers step={step} />
                        </div>
                    </Grid> */}
                                <Grid item xs={12}>
                                    <div style={{ padding: matches_md ? 0 : 20 }}>
                                        {step === 0 &&
                                            <Step0 name={name} setName={setName} email={email} setEmail={setEmail} phone={phone} setPhone={setPhone} gender={gender} setGender={setGender} currentUser={currentUser} setCurrentUser={setCurrentUser} user_data={user_data} onNext={handleNext} />
                                        }
                                        {step === 1 && (
                                            <Step1 companyName={companyName} setCompanyName={setCompanyName} companyIndustry={companyIndustry} setCompanyIndustry={setCompanyIndustry} website={website} setWebsite={setWebsite} businessDescription={businessDescription} setBusinessDescription={setBusinessDescription} designator={designator} setDesignator={setDesignator} onNext={handleNext} onPrev={handlePrev} />
                                        )}
                                        {step === 2 && (
                                            <Step2 members={members} setMembers={setMembers} onPrev={handlePrev}
                                                onNext={handleNext}
                                                isResponsible={isResponsible}
                                                setIsResponsible={setIsResponsible}
                                            />
                                        )}
                                        {step === 3 && (
                                            <Step3 selectedAddons={selectedAddons} setSelectedAddons={setSelectedAddons} totalAddonPrice={totalAddonPrice} setTotalAddonPrice={setTotalAddonPrice} services={services} setServices={setServices} onNext={handleNext} onPrev={handlePrev} />
                                        )}
                                        {step === 4 && (
                                            <Step4 totalAddonPrice={totalAddonPrice} setSelectedAddons={setSelectedAddons} setTotalAddonPrice={setTotalAddonPrice} services={services} setServices={setServices} onSubmit={handleSubmit} onPrev={handlePrev} loading={loading} discount={discount} setDiscount={setDiscount} couponApplied={couponApplied} setCouponApplied={setCouponApplied} />
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </>
            }
        </>
    )
}
