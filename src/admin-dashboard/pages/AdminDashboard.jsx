import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import { MdDashboard, MdHistory, MdMiscellaneousServices, MdOutlineLocalOffer, MdPeople, MdSettings } from "react-icons/md";
import { TbCreditCardRefund, TbFileInvoice } from "react-icons/tb";
import { useSelector } from "react-redux";
import { primaryColor } from "../../constant";
import { FaPercent, FaRegBuilding, FaRegCreditCard } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import AdminSidebar from "../components/AdminSidebar";
import AdminTopBar from "../components/AdminTopBar";
import { FaCircleUser } from "react-icons/fa6";
import CompanyList from "./CompanyList";
import UsersList from "./UsersList";
import AdminTransactionsList from "./AdminTransactionsList";
import CompanyDetails from "../components/CompanyDetails"
import AdminDashboardComp from "../components/AdminDashboardComp";
import CouponsList from "./CouponsList";
import { HiOutlineMail } from "react-icons/hi";
import Newsletters from "./Newsletters";

export default function AdminDashboard() {

    const { user_data } = useSelector(state => state.user);
    const location = useLocation(); // Hook to get the current route

    const dashboard_items = [
        {
            title: 'Dashboard',
            link: '/admin/dashboard',
            icon: <MdDashboard style={{ color: location.pathname === '/admin/dashboard' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Company',
            link: '/admin/dashboard/company',
            icon: <FaRegBuilding style={{ color: location.pathname === '/admin/dashboard/company' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Users',
            link: '/admin/dashboard/users',
            icon: <FaCircleUser style={{ color: location.pathname === '/admin/dashboard/users' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Transactions',
            link: '/admin/dashboard/transactions',
            icon: <MdHistory style={{ color: location.pathname === '/admin/dashboard/transactions' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Coupon',
            link: '/admin/dashboard/coupons',
            icon: <MdOutlineLocalOffer style={{ color: location.pathname === '/admin/dashboard/coupons' ? primaryColor : '#757575' }} />,
        },
        {
            title: 'Newsletters',
            link: '/admin/dashboard/newsletters',
            icon: <HiOutlineMail style={{ color: location.pathname === '/admin/dashboard/newsletters' ? primaryColor : '#757575' }} />,
        }
    ];

    return (
        <div className="layout-container">
            <div className="sidebar-container">
                <AdminSidebar dashboard_items={dashboard_items} />
            </div>
            <div className="content-container" style={{ paddingTop: '1%' }}>
                <div style={{ padding: 0 }}>
                    <AdminTopBar />
                </div>
                <div style={{ padding: '0 1% 1%' }}>
                    <Routes>
                        <Route element={<AdminDashboardComp />} path="/" />
                        <Route element={<CompanyList />} path="/company" />
                        <Route element={<UsersList />} path="/users" />
                        <Route element={<AdminTransactionsList />} path="/transactions" />
                        <Route element={<CouponsList />} path="/coupons" />
                        <Route element={<CompanyDetails isAdmin={true} />} path="/company/details" />
                        <Route element={<Newsletters isAdmin={true} />} path="/newsletters" />
                    </Routes>
                </div>
            </div>
        </div>
    );
}