

import React from 'react';
import { Card, Radio, Typography, Divider, Row, Col } from 'antd';
import { primaryColor } from '../../constant';   // keep using your theme constant
import { FaRegCheckCircle } from 'react-icons/fa';
import { FiUsers } from "react-icons/fi";
import { FiUser } from "react-icons/fi";

const { Title, Text } = Typography;

const MemberSelection = ({ selectedStructure, setSelectedStructure }) => {

    const memberOptions = [
        {
            name: 'Add Single Member',
            value: 'single',
            icon: <FiUser />,
            features: [
                'Owned by one person',
                'Simplified management',
                'Pass-through taxation',
            ],
        },
        {
            name: 'Add Multiple Members',
            value: 'multi',
            icon: <FiUsers />,
            features: [
                'Owned by two or more members',
                'Flexible profit distribution',
                'Ideal for partnerships',
            ],
        },
    ];

    const styles = {
        wrapper: {
            width: '100%',
            margin: '0 auto',
            padding: '0 16px',
            boxSizing: 'border-box',
        },
        card: {
            border: '1px solid #d9d9d9',
            borderRadius: 8,
            cursor: 'pointer',
            height: '100%',
            paddingBottom: 20,
            transition: 'border-color .25s',
        },
        selectedCard: {
            border: `2px solid ${primaryColor}`,
        },
        icon: {
            fontSize: 40,
            marginRight: 12,
            lineHeight: 1,
        },
        radio: {
            marginRight: 12,
        },
        feature: {
            marginBottom: 8,
            color: '#666',
            fontSize: 16,
        },
    };

    return (
        <div style={styles.wrapper}>
            <Title level={3} style={{ marginBottom: 8 }}>
                Company Structure
            </Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                Please select your company structure
            </Text>

            {/* Radio group wraps the entire grid so arrow-keys work */}
            <Radio.Group
                value={selectedStructure}
                onChange={(e) => setSelectedStructure(e.target.value)}
                style={{ width: '100%' }}
            >
                <Row gutter={[16, 16]}>
                    {memberOptions.map((opt) => (
                        <Col key={opt.value} xs={24} sm={24} md={12} lg={12}>
                            <Card
                                hoverable
                                onClick={() => setSelectedStructure(opt.value)}
                                style={{
                                    ...styles.card,
                                    ...(selectedStructure === opt.value ? styles.selectedCard : {}),
                                }}
                            >
                                {/* Header row: radio + title (+ badge) */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <Radio
                                            className="custom-radio"
                                            value={opt.value} style={styles.radio} />
                                        <Text strong style={{ fontSize: 18 }}>
                                            {opt.name}
                                        </Text>
                                    </div>
                                    <span style={styles.icon}>{opt.icon}</span>
                                </div>

                                <Divider style={{ margin: '12px 0' }} />

                                {/* Feature bullets */}
                                <div style={{ margin: 0, paddingLeft: 15 }}>
                                    {opt.features.map((feat) => (
                                        <div key={feat} style={styles.feature}>
                                            <FaRegCheckCircle style={{ color: '#52c41a', marginRight: 8 }} />
                                            {feat}
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Radio.Group>

            <div style={{ height: '35vh'}}></div>
        </div>
    );
};

export default MemberSelection;
