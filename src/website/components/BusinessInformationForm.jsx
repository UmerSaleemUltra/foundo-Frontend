import React, { useEffect, useState } from 'react';
import {
    Form,
    Input,
    Select,
    Typography,
    Row,
    Col,
    Button,
    Alert,
    Card,
    Divider,
} from 'antd';
import {
    LeftOutlined,
    ArrowRightOutlined,
    InfoCircleOutlined,
    GlobalOutlined,
} from '@ant-design/icons';
import { industryList, primaryColor } from '../../constant';

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;




const BusinessInformationForm = ({ selectedEntity, form, onFinish, setSelectedServices, selectedServices }) => {
    const [ending, setEnding] = useState([]);

    useEffect(() => {
        if (selectedEntity === "LLC") {
            setEnding(['LLC', 'L.L.C', 'Limited Liability'])
        } else if (selectedEntity === "SCorp") {
            setEnding(['S-corp'])
        } else if (selectedEntity === "CCorp") {
            setEnding(['Co.', 'Corporation', 'Corp', 'Incorporated', 'C-corp', "Inc.", 'Co', "Inc"])
        }else if(selectedEntity === "Ltd"){
            setEnding(['Ltd'])
        }
    }, [selectedEntity])


    const styles = {
        wrapper: {
            width: '100%',
            margin: '0 auto',
            padding: '24px 16px 64px',
            boxSizing: 'border-box',
        },
        heading: { marginBottom: 4 },
        subheading: { marginBottom: 32, color: '#595959' },
        navRow: { marginBottom: 24 },
        proceedBtn: {
            background: selectedServices.map(item => item?.text).includes('Business Website Setup') ? 'white' : primaryColor,
            borderColor: '#fa541c',
            color: selectedServices.map(item => item?.text).includes('Business Website Setup') ? '#fa541c' : 'white',
        },
        inlineAlert: {
            background: '#fff1f0',
            border: 'none',
            marginBottom: 24,
            padding: '16px 24px',
        },
        upsellCard: {
            marginBottom: 24,
            border: selectedServices.map(item => item?.text).includes('Business Website Setup') ? '2px solid #fa541c' : '1px solid #e5e5e5',
            position: 'relative',
            overflow: 'hidden',
        },
        upsellBgLetter: {
            position: 'absolute',
            left: 40,
            top: '20%',
            fontSize: 260,
            fontWeight: 700,
            opacity: 0.04,
            color: '#fa541c',
            lineHeight: 1,
            pointerEvents: 'none',
        },
    };

    const [description, setDescription] = useState('');

    const wordCount = description.trim().split(/\s+/).filter(Boolean).length;


    return (
        <div style={styles.wrapper}>
            <Title level={3} style={{ marginBottom: '8px' }}>Business Information</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: '24px' }}>
                Services included in this package.
            </Text>

            {/* FORM */}
            <Form
                form={form}
                layout="vertical"
                colon={false}
                onFinish={onFinish}
            >
                {/* Company Name */}
                <Form.Item
                    name="companyName"
                    label="Company Name"
                    rules={[{ required: true, message: 'Please enter company name' }]}
                >
                    <Input placeholder="Choose Your Company Name" size="large" />
                </Form.Item>

                {/* Company Ending */}
                <Form.Item
                    name="companyEnding"
                    label="Company Ending"
                    rules={[{ required: true, message: 'Please select company ending' }]}
                >
                    <Select placeholder="Select Company Ending" size="large">
                        {
                            ending?.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                {/* inline alert */}
                <div style={styles.inlineAlert} >
                    <InfoCircleOutlined style={{ marginRight: 8 }} />
                    <Text>
                        “LLC” is the commonly used abbreviation for limited liability
                        companies.
                    </Text>
                </div>

                {/* Industry */}
                <Form.Item
                    name="industry"
                    label="Industry"
                    rules={[{ required: true, message: 'Please select industry' }]}
                >
                    <Select placeholder="Select Industry" size="large">
                        {
                            industryList?.map((item, index) => (
                                <Option key={index} value={item}>{item}</Option>
                            ))
                        }
                    </Select>
                </Form.Item>

                {/* Company Website */}
                <Form.Item name="website" label="Company Website">
                    <Input
                        placeholder="Enter Company Website"
                        size="large"
                        prefix={<GlobalOutlined />}
                    />

                </Form.Item>

                {/* upsell card */}
                <Card bodyStyle={{ padding: 24 }} style={styles.upsellCard}>
                    <span style={styles.upsellBgLetter}>S</span>
                    <Row align="middle" wrap={false}>
                        <Col flex="auto">
                            <Row gutter={[12, 8]}>
                                <Col span={24}>
                                    <Text strong>Don’t Have a business website yet?</Text>
                                </Col>
                                <Col span={24}>
                                    Transform your business’s online presence with our all-in-one
                                    solution for WordPress and Shopify stores! Our package
                                    includes a professionally designed and branded website of up
                                    to 10 pages, tailored to showcase your products and services.
                                </Col>
                                {/* <Col>
                                    <Button>Check Domain Name Availability</Button>
                                </Col> */}
                            </Row>
                        </Col>

                        <Divider type="vertical" style={{ height: '100%' }} />

                        <Col
                            flex="160px"
                            style={{
                                textAlign: 'center',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Text delete type="secondary">
                                Regular Fee $999
                            </Text>
                            <Title level={3} style={{ margin: 0 }}>
                                $799
                            </Title>
                            <Text type="secondary">With Company Formation</Text>
                            <Button
                                block
                                style={{ ...styles.proceedBtn, marginTop: 12 }}
                                onClick={() => {
                                    const isExists = selectedServices.map(item => item?.text).includes('Business Website Setup');

                                    if (isExists) {
                                        setSelectedServices(selectedServices.filter(item => item?.text !== 'Business Website Setup'))
                                    } else {
                                        setSelectedServices([...selectedServices,
                                        {
                                            text: 'Business Website Setup',
                                            amt: 250,
                                            duration: 'One Time',
                                            category: 'Business',
                                            isPurchased: null,
                                            description: "We design tailored, user-friendly websites to establish your online presence, attract customers, build trust, and grow your business effectively in today’s digital marketplace.",
                                            image: '/images/insight.svg'
                                        }])
                                    }
                                }}
                            >
                                {selectedServices.map(item => item?.text).includes('Business Website Setup') ? 'Cancel' : 'Develop My Website'}
                            </Button>
                        </Col>
                    </Row>
                </Card>

                {/* Description */}
                <Form.Item
                    name="description"
                    label="Description (20-50 words)"
                    extra={<Text type="secondary">{wordCount}/100 words</Text>}
                >
                    <Input.TextArea
                        autoSize={{ minRows: 4 }}
                        placeholder="Enter Company Description (optional)"
                        onChange={(e) => {
                            if (wordCount <= 100)
                                setDescription(e.target.value)
                        }}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};

export default BusinessInformationForm;
