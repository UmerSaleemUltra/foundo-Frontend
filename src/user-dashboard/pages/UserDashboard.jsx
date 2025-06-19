import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { MdDashboard, MdHistory, MdMiscellaneousServices, MdPeople, MdSettings } from "react-icons/md";
import { useSelector } from "react-redux";
import DashboardComponent from "../components/DashboardComponent";
import UserSidebar from "../components/UserSidebar";
import { primaryColor } from "../../constant";
import UserTopBar from "../components/UserTopBar";
import Company from "./Company";
import Documents from "./Documents";
import Services from "./Services";
import Tax from "./Taxes";
import { FaPercent, FaRegBuilding, FaRegCreditCard } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import Billing from "./Billing";
import Transactions from "./Transactions";
import { get_data } from "../../api";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from "@mui/material";
import { PiBank } from "react-icons/pi";
import Banking from "./Banking";


export default function UserDashboard() {
    const location = useLocation();
    const { user_data } = useSelector(state => state.user);
    const [company, setCompany] = useState({})
    const [isCompany, setIsCompany] = useState(false)
    const [stats, setStats] = useState([])
    const theme = useTheme();
    const isDesktop = useMediaQuery('(min-width: 768px)');

    const dashboard_items = [
        {
            title: 'Dashboard',
            link: '/dashboard',
            icon: <MdDashboard style={{ color: location.pathname === '/dashboard' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Company',
            link: '/dashboard/company',
            icon: <FaRegBuilding style={{ color: location.pathname === '/dashboard/company' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Documents',
            link: '/dashboard/documents',
            icon: <FiFileText style={{ color: location.pathname === '/dashboard/documents' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Services',
            link: '/dashboard/services',
            icon: <MdMiscellaneousServices style={{ color: location.pathname === '/dashboard/services' ? primaryColor : '#757575' }} />,
        },
        // {
        //     title: 'Taxes',
        //     link: '/dashboard/taxes',
        //     icon: <FaPercent style={{ color: location.pathname === '/dashboard/taxes' ? primaryColor : '#757575' }} />,
        // },
        // {
        //     title: 'Banking',
        //     link: '/dashboard/banking',
        //     icon: <PiBank style={{ color: location.pathname === '/dashboard/banking' ? primaryColor : '#757575' }} />,
        // },
        {
            title: 'Billing',
            link: '/dashboard/billing',
            icon: <FaRegCreditCard style={{ color: location.pathname === '/dashboard/billing' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Transactions',
            link: '/dashboard/transactions',
            icon: <MdHistory style={{ color: location.pathname === '/dashboard/transactions' ? primaryColor : '#757575' }} />,
        }
    ];

    const getCompany = async () => {
        const response = await get_data(`company/get-company-by-user/${user_data?._id}`)
        if (response?.status) {
            setCompany(response?.data?.[0])
            if (response?.data?.length > 0) {
                setIsCompany(true)
            }
        }
        else {
        }
    }

    const getCompanyStats = async () => {
        const response = await get_data(`company/get-company-stats/${company?._id}`)
        if (response?.status) {
            setStats(response?.data)
        }
    }

    useEffect(() => {
        getCompanyStats()
    }, [company])


    useEffect(() => {
        getCompany()
    }, [])

    return (
        <>
            {
                isDesktop ? (
                    <div className="layout-container">
                        <div className="sidebar-container">
                            <UserSidebar dashboard_items={dashboard_items} company={company} isCompany={isCompany} />
                        </div>
                        <div className="content-container" style={{ paddingTop: '1%' }}>
                            <div style={{ padding: 0 }}>
                                <UserTopBar />
                            </div>
                            <div style={{ padding: '0 1% 1%' }}>
                                <Routes>
                                    <Route element={<DashboardComponent company={company} isCompany={isCompany} stats={stats} />} path="/" />
                                    <Route element={<Company company={company} isCompany={isCompany} stats={stats} />} path="/company" />
                                    <Route element={<Documents company={company} />} path="/documents" />
                                    <Route element={<Services company={company} isCompany={isCompany} />} path="/services" />
                                    {/* <Route element={<Banking company={company} isCompany={isCompany} />} path="/banking" /> */}
                                    {/* <Route element={<Tax />} path="/taxes" /> */}
                                    <Route element={<Billing company={company} isCompany={isCompany} />} path="/billing" />
                                    <Route element={<Transactions />} path="/transactions" />
                                </Routes>
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        This App is not supported in small screen devices.
                    </>
                )
            }
        </>
    );
}
