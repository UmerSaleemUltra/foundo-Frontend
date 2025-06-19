import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillThunderbolt, AiOutlineDollar } from 'react-icons/ai';
import { FaRegFileLines } from 'react-icons/fa6';
import { MdHistory, MdMiscellaneousServices, MdOutlineOndemandVideo } from 'react-icons/md';
import { VscFeedback } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import FeedbackModal from './FeedbackModal';
import { get_data } from '../../api';
import { useSelector } from 'react-redux';
import RegisterLLC from './RegisterLLC';
import CompanyProgress from '../../admin-dashboard/components/CompanyProgress';

const TaxFilingCard = ({ company, isCompany, stats }) => {

  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const { user_data } = useSelector(state => state.user);
  const [isFeedback, setIsFeedback] = useState(false)

  var settings = {
    dots: false,
    infinite: true,
    speed: 150,
    slidesToShow: 1,
    autoplay: true,
    slidesToScroll: 1
  };

  const images = [
    "/images/mercury-banner.svg",
    "/images/mercury-banner.svg",
  ]

  const getUserFeedback = async () => {
    const response = await get_data(`testimonial/get-testimonial-by-user/${user_data?._id}`)
    if (response?.status) {
      if (response?.data?.length > 0) {
        setIsFeedback(true)
      }
    }
  }

  useEffect(() => {
    getUserFeedback()
  }, [user_data])


  const imagesSlider = () => {
    return (
      <>
        <Slider {...settings}>
          {
            images?.map((item) => {
              return (
                <>
                  <img src={item} style={{ width: '100%' }} />
                </>
              )
            })
          }
        </Slider>
      </>
    )
  }

  const handleNavigate = (path) => {
    navigate(path)
    window.scrollTo(0, 0)
  }

  const serviceOptions = () => {
    return (
      <div className="service-options-container">
        <div style={{ background: '#fff' }} className="service-option" onClick={() => handleNavigate('/dashboard/documents')}>
          <span className="service-icon"><FaRegFileLines /></span>
          <p>Documents</p>
        </div>
        <div style={{ background: '#fff' }} className="service-option" onClick={() => handleNavigate('/dashboard/transactions')}>
          <span className="service-icon"><MdHistory /></span>
          <p>Transactions</p>
        </div>
        <div style={{ background: '#fff' }} className="service-option" onClick={() => handleNavigate('/dashboard/services')}>
          <span className="service-icon"><MdMiscellaneousServices /></span>
          <p>Addon Services</p>
        </div>
        <div style={{ background: '#fff' }} className="service-option" onClick={() => setOpen(true)}>
          <span className="service-icon"><VscFeedback /></span>
          <p>Feedback</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <FeedbackModal open={open} setOpen={setOpen} isFeedback={isFeedback} />

      <div className="tax-card-container">

        <div className="tax-card-left">
          <CompanyProgress company={company} isCompany={isCompany} />
          {/* <div className="tax-card-percentage">%</div>
          <div className="tax-card-details">
            <div className="tax-card-price">$1,500/yr</div>
            <h3>Worry-free tax filings</h3>
            <p style={{ fontSize: 14, opacity: '60%' }}>All tax and compliance needs covered, with expert answers. Have a question? Ask our experts about business matters, your account, our products, and more. All tax and compliance needs covered, with expert answers.
            </p>
            <button className="upgrade-btn">Upgrade</button>
          </div> */}
        </div>

        <div className="tax-card-right" style={{ height: '100%' }}>

          {
            isCompany ? (
              <>
                <h3 style={{ marginBottom: '8%' }}>{company?.company_name} {company?.designator}</h3>
                <ul className="membership-info">
                  <li>
                    <span className="icon"><AiFillThunderbolt /></span> One-Stop Plan
                  </li>
                  <li>
                    <span className="icon"><MdMiscellaneousServices /></span> {stats?.servicePurchased} Addon services
                  </li>
                  <li>
                    <span className="icon"><FaRegFileLines /></span> {stats?.documents} Documents
                  </li>
                </ul>
                <button className="my-company-btn" onClick={() => handleNavigate('/dashboard/company')}>My company</button>

                {
                  isCompany && (
                    <div style={{ marginTop: '15%' }}>
                      {serviceOptions()}
                    </div>
                  )
                }

              </>
            ) : (
              <>
                <RegisterLLC type={'dashboard'} />
              </>
            )
          }

        </div>

      </div>


      <div className="tax-card-container" style={{ marginTop: '3%' }}>

        {/* <div className="tax-card-left" style={{ background: 'white', padding: 0 }}>
          {imagesSlider()}
        </div> */}

        {/* <div className="tax-card-right" style={{ background: '#EEF3FE' }}>
          <h3 style={{ marginBottom: '8%', fontSize: 18, fontWeight: 500 }}>Get Addon Services for your Company</h3>
          <p style={{ fontSize: 13, opacity: '60%' }}>
            Enhance your company’s capabilities with our exclusive Addon Services. Whether it’s optimizing your workflow, upgrading your tools, or accessing specialized solutions, our services are designed to help your business thrive.
          </p>
          <button onClick={() => handleNavigate('/dashboard/services')}
            className="my-company-btn" style={{ marginTop: '4%', background: 'black' }}>
            Explore
          </button>
        </div> */}
      </div>

    </>
  );
};

export default TaxFilingCard;