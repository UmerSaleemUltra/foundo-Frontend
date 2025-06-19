import React, { useEffect, useState } from 'react';
import {
    Card,
    Row,
    Col,
    Typography,
    Input,
    Checkbox,
    Divider,
    Button
} from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { formatPrice, primaryColor } from '../../constant';
import { BiSolidCoupon } from "react-icons/bi";
import toast from 'react-hot-toast';
import { post_data } from '../../api';

const { Title, Text } = Typography;

const Review = ({ selectedEntity, selectedState, selectedStructure, companyForm, setCurrentStep, selectedServices, convertToINR, couponApplied, setCouponApplied, totalAmount, setTotalAmount, setDiscountValue }) => {
    const [couponCode, setCouponCode] = useState('');
    const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

    const handleApplyCoupon = async () => {
        if (couponCode === '') {
            toast.error('Please enter a coupon code');
            return;
        }
        setIsApplyingCoupon(true);

        const response = await post_data(`coupon/get-coupon`, { coupon_code: couponCode })
        if (response?.status === true) {
            setCouponApplied(true);
            setDiscountValue(response?.data?.discount_value)
            toast.success('Coupon applied successfully');
            setTotalAmount(totalAmount - response?.data?.discount_value);
        } else {
            toast.error('Invalid coupon code');
        }
        setIsApplyingCoupon(false);
    };

    const getTotalAmount = () => {
        const serviceAmt = selectedServices.reduce((total, service) => total + service?.amt, 0);
        const totalAmt = serviceAmt + selectedState?.fee + 249;

        setTotalAmount(totalAmt);
    }

    useEffect(() => {
        getTotalAmount();
    }, []);

    return (
        <div style={{ padding: 32, minHeight: '100vh', color: '#374151' }}>
            <Row style={{ marginBottom: 24 }}>
                <Col span={24}>
                    <Title level={3}>Review Your Business Details</Title>
                    <Text type="secondary">
                        Please take a moment to carefully review your company formation order to ensure all details are accurate.
                    </Text>
                </Col>
            </Row>

            {/* General Info */}
            <Card>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Text style={{ fontSize: '20px', color: '#000', marginBottom: 16 }}>General Information</Text>
                    </Col>

                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type="text"
                            style={{ color: primaryColor, fontSize: '14px' }}
                            icon={<EditOutlined style={{ color: primaryColor }} />}
                            onClick={() => setCurrentStep(0)}
                        >
                            Edit
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>State</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            {/* <img
                src="https://flagcdn.com/us.svg"
                alt="Texas"
                width={20}
                height={14}
                style={{ marginRight: 8 }}
              /> */}
                            <span style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{selectedState?.label}</span>
                        </div>
                    </Col>

                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Entity Type</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{selectedEntity}</div>
                    </Col>

                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Members</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{selectedStructure}</div>
                    </Col>
                </Row>
            </Card>

            {/* Company Info */}
            <Card style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Text style={{ fontSize: '20px', color: '#000', marginBottom: 16 }}>Company Information</Text>
                    </Col>

                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button
                            type="text"
                            style={{ color: primaryColor, fontSize: '14px' }}
                            icon={<EditOutlined style={{ color: primaryColor }} />}
                            onClick={() => setCurrentStep(3)}
                        >
                            Edit
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Company Name</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{companyForm?.companyName}</div>
                    </Col>

                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Company Ending</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{companyForm?.companyEnding}</div>
                    </Col>

                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Company Industry</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{companyForm?.industry}</div>
                    </Col>

                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Company Website</Text>
                    </Col>
                    <Col span={12}>
                        <div style={{ textAlign: 'right', color: '#374151', fontSize: '18px' }}>{companyForm?.website || '-'}</div>
                    </Col>

                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151', textAlign: 'right' }}>Description</Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <div style={{ textAlign: 'right', fontSize: '18px' }}>{companyForm?.description || '-'}</div>
                    </Col>
                </Row>
            </Card>

            {/* Addons */}
            <Card style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Text style={{ fontSize: '20px', color: '#000', marginBottom: 16 }}>Addons</Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button
                            type="text"
                            style={{ color: primaryColor, fontSize: '14px' }}
                            icon={<EditOutlined style={{ color: primaryColor }} />}
                            onClick={() => setCurrentStep(6)}
                        >
                            Edit
                        </Button>
                    </Col>
                    {
                        selectedServices.map((service, index) => (
                            <>
                                <Col span={12}>
                                    <Text style={{ fontSize: '18px', color: '#374151' }}>{service?.text}</Text>
                                </Col>
                                <Col span={12} style={{ textAlign: 'right' }}>
                                    <Text style={{ fontSize: '18px', color: '#374151' }}>${service?.amt}</Text>
                                </Col>
                            </>
                        ))
                    }
                </Row>
            </Card>

            {/* Package */}
            {/* <Card
                style={{ marginTop: 16 }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Text style={{ fontSize: '20px', color: '#000', marginBottom: 16 }}>Package</Text>
                    </Col>

                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Button type="text" style={{ color: primaryColor, fontSize: '14px' }} icon={<EditOutlined style={{ color: primaryColor }} />} >Edit</Button>
                    </Col>
                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Package Type</Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Company Formation</Text>
                    </Col>
                    <Col span={12}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Billing</Text>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>$300</Text>
                    </Col>
                </Row>
            </Card> */}

            {/* Totals */}
            <Card style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]} align="middle">
                    <Col span={16} style={{ display: 'flex', flexDirection: 'column' }}>
                        <Text style={{ fontSize: '18px', color: '#374151' }}>Total Amount</Text>
                        <Text type="secondary">
                            Your Total Cost for the First Year (Includes one-time fees + 1 year of subscription costs)
                        </Text>
                    </Col>
                    <Col span={8}>
                        <Title level={3} style={{ textAlign: 'right' }}>${totalAmount} ({formatPrice(convertToINR(totalAmount))})</Title>
                    </Col>
                </Row>
            </Card>

            {/* Coupon */}
            <Card title="Coupon" style={{ marginTop: 16 }}>
                <Row gutter={[16, 16]}>
                    {/* <Col span={8} style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src="/images/Save50.png" style={{ width: "200px" }} />
                    </Col> */}
                    <Col xs={24} md={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <Text>Enter your promo code for a discount.</Text>
                        <Input.Group compact style={{ display: 'flex' }}>
                            <Input style={{ flex: 1 }}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="Enter coupon code"
                            />
                            <Button
                                size='large'
                                style={{
                                    background: primaryColor,
                                    borderColor: primaryColor,
                                    color: 'white'
                                }}
                                onClick={handleApplyCoupon}
                                loading={isApplyingCoupon}
                                disabled={couponApplied}
                            >
                                {couponApplied ? 'Applied' : "Apply"}
                            </Button>
                        </Input.Group>
                    </Col>
                </Row>
            </Card>

            {/* Agreement */}
            {/* <Row align="middle" style={{ marginTop: 12 }}>
                <Col>
                    <Checkbox />
                </Col>
                <Col style={{ marginLeft: 8 }}>
                    <Text>
                        I have read and accept all <a href="#" style={{ color: primaryColor }}>Terms of Service</a> and <a style={{ color: primaryColor }} href="#">Privacy Policy</a> of MichaGuru services.
                    </Text>
                </Col>
            </Row> */}
        </div>
    );
};

export default Review;