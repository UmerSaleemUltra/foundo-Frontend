import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaRegBuilding } from 'react-icons/fa';
import { get_data } from '../../api';
import { useNavigate } from 'react-router-dom';
import LastMonthStats from './LastMonthStats';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboardComp = () => {

    const [stats, setStats] = useState([])
    const navigate = useNavigate()

    const getStats = async () => {
        const response = await get_data(`super-admin/get-dashboard-stats`)
        if (response?.status) {
            setStats(response?.data)
        }
    }

    useEffect(() => {
        getStats()
    }, [])

    const statsOption = () => {
        return (
            <div className="service-options-container">
                <div className="service-option" onClick={() => handleNavigate('/admin/dashboard/company')}>
                    <span className="service-icon" style={{ fontWeight: 600 }}>{stats?.companies || 0}</span>
                    <p>Company</p>
                </div>
                <div className="service-option" onClick={() => handleNavigate('/admin/dashboard/users')}>
                    <span className="service-icon" style={{ fontWeight: 600 }}>{stats?.users || 0}</span>
                    <p>Users</p>
                </div>
                <div className="service-option">
                    <span className="service-icon" style={{ fontWeight: 600 }}>{stats?.documents || 0}</span>
                    <p>Documents</p>
                </div>
                <div className="service-option">
                    <span className="service-icon" style={{ fontWeight: 600 }}>{stats?.testimonials}</span>
                    <p>Feedback</p>
                </div>
            </div>
        );
    };

    const getLastSevenMonths = () => {
        const months = [];
        const now = new Date();
    
        for (let i = 0; i < 7; i++) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleString('default', { month: 'long' });
            months.push(monthName);
        }
    
        return months.reverse(); 
    };
    

    const lineChartData = {
        labels: getLastSevenMonths(),
        datasets: [
            {
                label: 'Revenue',
                data: stats.lastSevenMonths,
                borderColor: '#EA1F23',
                backgroundColor: 'rgba(234, 31, 35, 0.2)',
            },
        ],
    };

    const lineChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Revenue Over the Last 7 Months',
            },
        },
    };


    const handleNavigate = (path) => {
        navigate(path)
        window.scrollTo(0, 0)
    }


    return (
        <>
            <div className="tax-card-container" style={{ marginTop: '3%' }}>
                <div className="tax-card-left" style={{ width: '60%', height: 350 }}>
                    <Line data={lineChartData} options={lineChartOptions} />
                </div>
                <div className="tax-card-right" style={{ background: 'white', padding: 5 }}>
                    {statsOption()}
                </div>
            </div>

            <div className="tax-card-container" style={{ marginTop: '3%' }}>

                <div className="tax-card-left">
                    <LastMonthStats stats={stats} />
                </div>

                <div className="tax-card-right">
                    <h3 style={{ marginBottom: '8%' }}>Recent Orders</h3>
                    <ul className="membership-info">
                        {
                            stats?.lastFiveCompanies?.map((company, index) => (
                                <li key={index}>
                                    <span className="icon"><FaRegBuilding /></span> {company?.company_name} {company?.designator}
                                </li>
                            ))
                        }
                    </ul>
                    <button className="my-company-btn" onClick={() => handleNavigate('/admin/dashboard/company')}>View All</button>
                </div>

            </div>
        </>
    );
};

export default AdminDashboardComp;
