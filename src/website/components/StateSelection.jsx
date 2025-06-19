import React, { useEffect, useState } from 'react';
import { Card, Radio, Typography, Divider, Badge, Row, Col, Button } from 'antd';
import { primaryColor } from '../../constant';
import { FaRegCheckCircle } from "react-icons/fa";
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Autocomplete, TextField } from '@mui/material';
import { states as statesList } from '../../constant';

const { Title, Text } = Typography;

const StateSelection = ({ selectedState, setSelectedState }) => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])

    const states = [
        {
            label: 'Wyoming',
            value: 'Wyoming',
            fee: 102,
            features: [
                'No State Income Tax',
                'Low Maintenance Costs',
                'Business-Friendly Courts',
                'Strong Privacy Protections',
                'No Franchise Tax'
            ],
            image: '/images/wyoming.png',
            popular: true,
        },
        {
            label: 'Delaware',
            value: 'Delaware',
            fee: 140,
            features: [
                'Investor Confidence (Startup hub all around the world)',
                'Flexible Corporate Structure',
                'Business Friendly Legislation with Established Precedences',
                'Privacy Protection',
                'No Sales Tax'
            ],
            image: '/images/delware.png'
        },
        {
            label: 'Florida',
            value: 'Florida',
            fee: 125,
            features: [
                'No State Income Tax',
                'Fast & Affordable Formation',
                'Business-Friendly Environment',
                'Flexible Corporate Structures',
                'Strategic Location'
            ],
            image: '/images/florida.png'
        },
        {
            label: 'Texas',
            value: 'Texas',
            fee: 300,
            features: [
                'No State Income Tax',
                'No Annual Report Filing Fee',
                'Large and Diverse Economy',
                'Lower Cost of Living',
                'Limited Regulations'
            ],
            image: '/images/texas.png'
        },
        {
            label: 'Montana',
            value: 'Montana',
            fee: 35,
            features: [
                'No State Sales Tax',
                'Affordable Real Estate and Operating Costs',
                'Access to Natural Resource Industries',
                'Pro-Business Regulatory Environment',
                'Thriving Outdoor Recreation Economy'
            ],
            image: '/images/montana.png'
        },
        {
            label: 'New Jersey',
            value: 'New Jersey',
            fee: 129,
            features: [
                'No State Sales Tax',
                'Affordable Real Estate and Operating Costs',
                'Access to Natural Resource Industries',
                'Pro-Business Regulatory Environment',
                'Thriving Outdoor Recreation Economy'
            ],
            image: '/images/new-jersey.jpg'
        }
    ];


    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>
            <Title level={3} style={{ marginBottom: '8px' }}>Choose a state</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Please select the state you want to form your company.
            </Text>

            <Radio.Group
                onChange={(e) => setSelectedState(e.target.value)}
                value={selectedState?.label}
                style={{ width: '100%' }}
            >
                <Row gutter={[16, 16]}>
                    {states.map((state) => (
                        <Col
                            key={state.value}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                        >
                            <Card
                                onClick={() => setSelectedState(state)}
                                style={{
                                    border: selectedState?.label === state.value ? `2px solid ${primaryColor}` : '1px solid #d9d9d9',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    height: '100%',
                                    paddingBottom: '20px'
                                }}
                                hoverable
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px', justifyContent: 'space-between' }}>
                                    <div>
                                        <Radio
                                            value={state.label}
                                            className="custom-radio"
                                            style={{
                                                marginRight: '12px',
                                            }}
                                        />
                                        <Text strong style={{ fontSize: '18px' }}>{state.label}</Text>
                                        {state.popular && (
                                            <Badge
                                                count="POPULAR"
                                                style={{
                                                    backgroundColor: primaryColor,
                                                    color: '#fff',
                                                    marginLeft: '12px',
                                                    fontSize: '12px',
                                                    padding: '0 8px',
                                                    borderRadius: '4px',
                                                    fontWeight: 'bold'
                                                }}
                                            />
                                        )}
                                    </div>

                                    {
                                        state?.image && (
                                            <img
                                                loading="lazy"
                                                src={state.image}
                                                alt={state.label}
                                                style={{ width: state?.label === 'New Jersey' ? '6%' : '10%', marginLeft: '12px' }}
                                            />
                                        )
                                    }
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <Text strong>${249 + state.fee}/year</Text> 
                                </div>

                                <div style={{ margin: 0, paddingLeft: '15px' }}>
                                    {state.features.map((feature, index) => (
                                        <div key={index} style={{ marginBottom: '8px', color: '#666', fontSize: '16px' }}>
                                            <FaRegCheckCircle style={{ color: '#52c41a', marginRight: '8px' }} />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                            </Card>
                        </Col>
                    ))}
                </Row>


            </Radio.Group>


            <div style={{ width: '50%' }}>
                <div style={{ marginTop: '24px', marginBottom: '12px', color: '#666' }}>
                    Launch Your Business in Other State
                </div>

                <Autocomplete
                    disablePortal
                    options={statesList}
                    value={selectedState}
                    onChange={(e, newValue) => setSelectedState(newValue)}
                    getOptionLabel={(option) => option.label}
                    renderOption={(props, option) => (
                        <li {...props}>
                            <div>
                                {option.label} <em>{option.tagline}</em>
                            </div>
                        </li>
                    )}
                    renderInput={(params) => <TextField {...params} label="Select state" />}
                />
            </div>

        </div>
    );
};

export default StateSelection;