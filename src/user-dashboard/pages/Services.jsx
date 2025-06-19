import React, { useEffect, useState } from 'react';
import ServieCartModal from '../components/ServieCartModal';
import { addonServicesList, formatDollar } from '../../constant';
import { get_data, post_data } from '../../api';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import RegisterLLC from '../components/RegisterLLC';

const Services = ({ company, isCompany }) => {

    const [open, setOpen] = useState(false)
    const [service, setService] = useState({})
    const [activeCategory, setActiveCategory] = useState('View all');
    const [currentPage, setCurrentPage] = useState(1)
    const { user_data } = useSelector(state => state.user);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const categories = ['View all', 'Registered Agent', 'Tax', 'Bookkeeping', 'Business', 'Company'];

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
        updateServices()
    }, [company])


    const filteredServices = activeCategory === 'View all' ? addonServicesList : addonServicesList?.filter(service => service.category === activeCategory);

    function updateServices() {
        return filteredServices?.map(service => {
            if (data?.includes(service?.text)) {
                return { ...service, isPurchased: true };
            } else {
                return { ...service, isPurchased: false };
            }
        });
    }

    const updatedServices = updateServices();

    const handleOpen = (service) => {
        setService(service)
        setOpen(true)
    }

    return (
        <>
            {
                isCompany ? (
                    <>
                        <ServieCartModal open={open} setOpen={setOpen} service={service} company={company} />
                        <div className="services-container">
                            <div className="category-filter">
                                {categories?.map((category) => (
                                    <button
                                        key={category}
                                        className={`category-button ${activeCategory === category ? 'active' : ''}`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            {/* <h3>Founders like you also purchased...</h3> */}
                            {
                                loading ? (
                                    <Loader />
                                ) : (
                                    <>
                                        <div className="services-list" style={{ marginTop: '4%' }}>
                                            {updatedServices?.map((service, index) => (
                                                <div key={index} className="service-card">
                                                    <h4 style={{ marginTop: 0 }}>{service.text}</h4>
                                                    <p>{service.description}</p>
                                                    <div className="service-price">{formatDollar(service.amt)} / {service?.duration}</div>
                                                    <div className="service-actions">
                                                        {/* <button className="learn-more-btn">Learn more</button> */}
                                                        {
                                                            !service?.isPurchased && (
                                                                <button className="buy-now-btn" onClick={() => handleOpen(service)}>Buy Now</button>
                                                            )
                                                        }
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

export default Services;