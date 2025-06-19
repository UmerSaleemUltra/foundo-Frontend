import React from 'react';
import { Card, Typography, Row, Col, Checkbox, Divider } from 'antd';
import { FaRegCheckCircle } from 'react-icons/fa';
import { primaryColor } from '../../constant';
import { addonServicesList } from '../../constant';

const { Title, Text } = Typography;

const AddonServicesSelection = ({ selectedServices, setSelectedServices }) => {
    const toggleService = (value) => {
        console.log('value', value);
        const exists = selectedServices.map(item => item?.text).includes(value?.text);

        console.log('exists', exists);

        if (exists) {
            setSelectedServices(selectedServices.filter(item => item?.text !== value?.text));
        } else {
            setSelectedServices([...selectedServices, value]);
        }
    };

    console.log('selectedServices', selectedServices);

    return (
        <div style={{ width: '100%', margin: '0 auto', padding: '0 16px', boxSizing: 'border-box' }}>
            <Title level={3} style={{ marginBottom: '8px' }}>Select Add-on Services</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Boost your company formation with these professional services. Choose as many as you'd like.
            </Text>

            <Row gutter={[16, 16]}>
                {addonServicesList.map((service, index) => {
                    const isSelected = selectedServices.map(item => item?.text).includes(service.text);
                    return (
                        <Col key={index} xs={24} sm={24} md={12} lg={12}>
                            <Card
                                onClick={() => toggleService(service)}
                                style={{
                                    border: isSelected ? `2px solid ${primaryColor}` : '1px solid #d9d9d9',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    height: '100%',
                                    paddingBottom: '20px',
                                }}
                                hoverable
                            >
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                                    <Checkbox
                                        checked={isSelected}
                                        onChange={() => toggleService(service.text)}
                                        style={{ marginRight: '12px' }}
                                    />
                                    <div>
                                        <Text strong style={{ fontSize: '16px' }}>{service.text}</Text>
                                        <div style={{ fontSize: '14px', color: '#999' }}>
                                            {service.duration} • ${service.amt}
                                        </div>
                                    </div>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                <div style={{ paddingLeft: '4px' }}>
                                    <div style={{ marginBottom: '8px', color: '#666', fontSize: '15px' }}>
                                        <FaRegCheckCircle style={{ color: '#52c41a', marginRight: '8px' }} />
                                        {service.description}
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
        </div>
    );
};

export default AddonServicesSelection;
