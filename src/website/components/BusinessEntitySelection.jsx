import React, { useEffect, useState } from 'react';
import { Card, Radio, Typography, Divider, Badge, Row, Col } from 'antd';
import { primaryColor } from '../../constant';
import { FaRegCheckCircle } from "react-icons/fa";
import { Autocomplete, TextField } from '@mui/material';
import { get_data } from '../../api';

const { Title, Text } = Typography;

const BusinessEntitySelection = ({ selectedEntity, setSelectedEntity, user_data, currentUser, setCurrentUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await get_data('user/get-all-users-for-options');
        if (response?.status === true)
            setUsers(response?.data);
    }


    const businessEntities = [
        {
            name: 'LLC - Limited Liability Company',
            value: 'LLC',
            features: [
                'Pass-through taxation',
                'Limited liability protection',
                'Flexible ownership',
                'Tax savings, enhanced credibility.'
            ],
            popular: true
        },
        {
            name: 'S Corp',
            value: 'SCorp',
            features: [
                'Pass-through taxation',
                'Limited liability protection',
                'Flexible ownership',
                'Tax savings, enhanced credibility.'
            ]
        },
        {
            name: 'C Corporation (General Corporation)',
            value: 'CCorp',
            features: [
                'Access to venture capital',
                'Potential for initial public offering',
                'Great for fundraising startups and complex company structures'
            ]
        },
        {
            name: 'Ltd',
            value: 'Ltd',
            features: [
                'Empowers decentralized organizations.',
                'Facilitates transparent decision-making.',
                'Streamlines operations with smart contract automation.'
            ]
        }
    ];

    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>
            <Title level={3} style={{ marginBottom: '8px' }}>Select your company formation entity</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Choose the legal entity that's right for your business. We'll guide you through the process.
            </Text>

            {
                user_data?.is_super_admin === true &&
                <div style={{ marginBottom: '1%' }}>
                    <Autocomplete
                        disablePortal
                        options={users}
                        value={currentUser || null}
                        onChange={(e, newValue) => setCurrentUser(newValue)}
                        getOptionLabel={(option) => option.first_name + ' ' + option.last_name}
                        isOptionEqualToValue={(option, value) => option?._id === value?._id}
                        renderInput={(params) => <TextField {...params} label="Select User" />}
                    />
                </div>
            }


            <Radio.Group
                onChange={(e) => setSelectedEntity(e.target.value)}
                value={selectedEntity}
                style={{ width: '100%' }}
            >
                <Row gutter={[16, 16]}>
                    {businessEntities.map((entity) => (
                        <Col
                            key={entity.value}
                            xs={24}
                            sm={24}
                            md={12}
                            lg={12}
                        >
                            <Card
                                onClick={() => setSelectedEntity(entity.value)}
                                style={{
                                    border: selectedEntity === entity.value ? `2px solid ${primaryColor}` : '1px solid #d9d9d9',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    height: '100%',
                                    paddingBottom: '20px',
                                }}
                                hoverable
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                    <Radio value={entity.value}
                                        className="custom-radio"
                                        style={{
                                            marginRight: '12px',
                                        }}
                                    />
                                    <Text strong style={{ fontSize: '18px' }}>{entity.name}</Text>
                                    {entity.popular && (
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

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ margin: 0, paddingLeft: '15px' }}>
                                    {entity.features.map((feature, index) => (
                                        // <li key={index} style={{ marginBottom: '8px', color: '#666' }}>
                                        <div style={{ marginBottom: '8px', color: '#666', fontSize: '16px' }}>
                                            <FaRegCheckCircle style={{ color: '#52c41a', marginRight: '8px' }} />
                                            {feature}
                                        </div>
                                        // </li>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Radio.Group>
        </div>
    );
};

export default BusinessEntitySelection;