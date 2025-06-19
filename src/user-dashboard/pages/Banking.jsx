import React, { useEffect, useState } from 'react';
import ServieCartModal from '../components/ServieCartModal';
import { addonServicesList, formatDollar } from '../../constant';
import { get_data, post_data } from '../../api';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import RegisterLLC from '../components/RegisterLLC';

const Banking = ({ company, isCompany }) => {

    const [open, setOpen] = useState(false)
    const [service, setService] = useState({})
    const [activeCategory, setActiveCategory] = useState('View all');
    const [currentPage, setCurrentPage] = useState(1)
    const { user_data } = useSelector(state => state.user);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const getAllServicePurchased = async () => {
        const response = await get_data(`service-purchased/get-all-service-purchased-by-company/${company?._id}?pageNumber=${currentPage}`)
        if (response?.status === true) {
            setData(response?.data?.servicePurchased?.map(item => item?.service_name))
        }
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    useEffect(() => {
        getAllServicePurchased()
    }, [company])


    const perks = [
        {
            name: 'Mercury',
            logo: "/images/mercury1.jpg",
            description: "Mercury is a U.S.-based financial platform offering digital banking services for startups and small businesses. It provides checking accounts, virtual and physical debit cards, ACH payments, wire transfers, API integrations, and FDIC-insured accounts with no monthly fees.",
            amount: 599,
            link: 'https://www.mercury.com'
        },
        {
            name: 'Payoneer',
            logo: "/images/payoneer.png",
            description: "Payoneer is a global payment platform for freelancers, e-commerce sellers, and businesses. It offers receiving accounts in multiple currencies, cross-border payments, prepaid Mastercards, and integration with marketplaces like Amazon and Fiverr, simplifying international transactions efficiently and securely.",
            amount: 149,
            link: 'https://www.payoneer.com'
        },
        {
            name: 'Wise',
            logo: "/images/wise.png",
            description: "Wise (formerly TransferWise) is a global financial service offering multi-currency accounts for individuals and businesses. It enables low-cost international transfers, real-time exchange rates, and multi-currency holding, with a focus on transparency and affordability for global transactions.",
            amount: 299,
            link: 'https://www.wise.com'
        },
    ]


    return (
        <>
            {
                isCompany ? (
                    <>
                        <ServieCartModal open={open} setOpen={setOpen} service={service} company={company} />
                        <div className="services-container">

                            <h3 style={{ margin: 0, fontSize: 25 }}>Rewards and Perks for you!</h3>
                            {
                                loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <div className="services-list" style={{ marginTop: '4%' }}>
                                            {perks?.map((service, index) => (
                                                <div key={index} className="service-card">
                                                    {/* <h4 style={{ marginTop: 0 }}>{service.name}</h4> */}
                                                    <img
                                                        loading='lazy'
                                                        className="workhyImg"
                                                        src={service.logo}
                                                        alt={`Brand ${index}`}
                                                        style={{
                                                            height: service.name === 'Mercury' ? '70px' : '50px',
                                                            width: 'auto',
                                                            objectFit: 'contain',
                                                            transition: 'height 0.3s ease',
                                                        }}
                                                    />
                                                    <p>{service.description}</p>
                                                    {/* <div className="service-price">{formatDollar(service.amount)}</div> */}
                                                    <div className="service-actions">
                                                        <a href={service.link} target='_blank'>
                                                            <button className="buy-now-btn" style={{ background: '#000' }} >Get It Now</button>
                                                        </a>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <RegisterLLC />
                )
            }
        </>
    );
};

export default Banking;