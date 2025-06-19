import React from 'react';
import { Card, Typography, Row, Col, Tooltip } from 'antd';
import { InfoCircleOutlined, CheckOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const { Title, Text } = Typography;

const FeatureCard = styled(Card)`
  border-radius: 8px;
  margin-bottom: 24px;
  margin-top: 24px;
  background-color: #F6F6F6;
  .ant-card-body {
    padding: 24px;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  
  .anticon-check {
    color: #52c41a;
    margin-right: 12px;
    font-size: 16px;
  }
  
  .feature-text {
    flex: 1;
  }
  
  .feature-banks {
    display: flex;
    gap: 8px;
    align-items: center;
    margin-top: 4px;
    
    img {
      height: 24px;
    }
  }
`;

const BankLogo = styled.div`
  font-weight: 700;
  font-size: 16px;
`;

const FeaturesSection = ({ selectedState, selectedEntity }) => {
  const features = [
    {
      text: 'Company Formation',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'Operating Agreement',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'Registered Agent for 365 Days',
      checked: false,
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'US Business Bank Account Application Guide',
      // banks: ['MERCURY', '7WISE', 'Payoneer'],
      tooltip: 'Step-by-step guide to open accounts with these providers'
    },
    {
      text: 'Payment Solutions Application Guide',
      // banks: ['stripe', 'PayPal'],
      tooltip: 'Help setting up payment processors for your business'
    },
    {
      text: 'Compliance Calendar and Reminders',
      tooltip: 'Never miss important filing deadlines'
    },
    {
      text: 'Digital Document Access',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'FinCEN BOI Report',
      tooltip: 'Beneficial Ownership Information reporting compliance'
    },
    {
      text: 'EIN Business Tax ID Number',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'Unlimited Phone & Email Support',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'Exclusive Rewards $50,000+',
      tooltip: 'Access to special discounts and offers'
    },
    {
      text: 'Registered Agent Address',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'Online Access Dashboard',
      tooltip: 'We act as your registered agent to receive legal documents'
    },
    {
      text: 'Banking Resolution Template',
      tooltip: 'Ready-to-use template for bank account authorization'
    }
  ];

  return (
    <div style={{ width: '95%', margin: '0 auto', padding: '0 16px', color: '#1f2937', boxSizing: 'border-box' }}>
      <Title level={3} style={{ marginBottom: '8px' }}>Package and Services</Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
        Services included in this package.
      </Text>

      <FeatureCard>
        <Title level={3} >
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={12} md={12}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#1f2937" }}>
              Company Type
            </div>

            <div style={{ marginBottom: 10, fontWeight: 500 }}>
              {selectedEntity}
            </div>
          </Col>

          <Col xs={12} md={12}>
            <div style={{ fontSize: 20, fontWeight: 500, color: "#1f2937" }}>
              State
            </div>

            <div style={{ marginBottom: 10, fontWeight: 500 }}>
              {selectedState?.label}
            </div>
          </Col>
        </Row>
      </FeatureCard>

      <FeatureCard>
        <Title level={3} style={{ marginBottom: 24 }}>
          Features and Services Included in Subscription Package
        </Title>
        <Row gutter={[16, 16]}>
          <Col xs={24} md={12}>
            {features.slice(0, 7).map((feature, index) => (
              <FeatureItem key={index} >
                <CheckOutlined />
                <div className="feature-text">
                  <Text style={{ fontSize: 18, fontWeight: 500, color: "#1f2937" }}>{feature.text}</Text>
                </div>
                {feature.tooltip && (
                  <Tooltip title={feature.tooltip}>
                    <InfoCircleOutlined style={{ color: '#1890ff', marginLeft: 8 }} />
                  </Tooltip>
                )}
              </FeatureItem>
            ))}
          </Col>

          <Col xs={24} md={12}>
            {features.slice(7).map((feature, index) => (
              <FeatureItem key={index} >
                <CheckOutlined />
                <div className="feature-text">
                  <Text style={{ fontSize: 18, fontWeight: 500, color: "#1f2937" }}>{feature.text}</Text>
                </div>
                {feature.tooltip && (
                  <Tooltip title={feature.tooltip}>
                    <InfoCircleOutlined style={{ color: '#1890ff', marginLeft: 8 }} />
                  </Tooltip>
                )}
              </FeatureItem>
            ))}
          </Col>
        </Row>
      </FeatureCard>
    </div >
  );
};

export default FeaturesSection;