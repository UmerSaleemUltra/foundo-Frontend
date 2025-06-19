import React, { useEffect, useState } from 'react';
import {
    Row, Col, Input, Select, Button, Typography, Upload, Card, Form, Divider, message, Checkbox
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { GiPassport } from 'react-icons/gi';
import { primaryColor } from '../../constant';
import { get_data, serverURL } from '../../api';

const { Title, Text } = Typography;
const { Option } = Select;




const defaultValues = {
    firstName: '',
    lastName: '',
    phoneCode: '+91',
    phone: '',
    role: undefined,
    address: '',
    country: undefined,
    ssn: '',
    isResponsible: false,
};

const roles = [
    'Owner', 'Manager', 'Employee', 'CEO', 'CRO', 'Head of Partnership', 'Shareholder', 'Ops Manager', 'Director', 'Supervisor',
    'Coordinator', 'Team Lead', 'Analyst', 'Consultant', 'Engineer',
    'Designer', 'Developer', 'Marketing Specialist', 'Sales Representative',
    'Customer Support', 'Human Resources', 'Finance', 'IT Administrator',
    'Quality Assurance', 'Operations',
];

const AddSingleMember = ({ form, onFinish, setSelectedServices, selectedServices }) => {
    const [documentFile, setDocumentFile] = useState(null);
    const [memberId, setMemberId] = useState(() => Date.now());

    const handleFinish = (values) => {
        const formData = {
            ...values,
            id: memberId,
            passport: documentFile,
        };
        onFinish(formData);
    };

    const styles = {
        upsellCard: {
            marginTop: 24,
            marginBottom: 24,
            border: selectedServices.some(item => item.text === 'ITIN Application')
                ? `2px solid ${primaryColor}`
                : '1px solid #e5e5e5',
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


    // const storeFileInIndexedDB = (memberId, file) => {
    //     const dbName = 'tempFileDB';
    //     const request = indexedDB.open(dbName, 1);

    //     request.onupgradeneeded = (e) => {
    //         const db = e.target.result;
    //         if (!db.objectStoreNames.contains('files')) {
    //             db.createObjectStore('files', { keyPath: 'id' });
    //         }
    //     };

    //     request.onsuccess = (e) => {
    //         const db = e.target.result;
    //         const transaction = db.transaction('files', 'readwrite');
    //         const store = transaction.objectStore('files');
    //         store.put({ id: memberId, file });
    //     };
    // };

    // const getFileFromIndexedDB = (key) => {
    //     return new Promise((resolve, reject) => {
    //         if (!key) {
    //             reject("Invalid key for IndexedDB retrieval");
    //             return;
    //         }

    //         const request = indexedDB.open("tempFileDB", 1);

    //         request.onsuccess = (e) => {
    //             const db = e.target.result;
    //             const transaction = db.transaction("files", "readonly");
    //             const store = transaction.objectStore("files");
    //             const getRequest = store.get(key);

    //             getRequest.onsuccess = () => {
    //                 resolve(getRequest.result?.file || null);
    //             };

    //             getRequest.onerror = () => {
    //                 reject("Error retrieving file from IndexedDB");
    //             };
    //         };

    //         request.onerror = () => {
    //             reject("Error opening IndexedDB");
    //         };
    //     });
    // };

    const fetchPassport = async (mId) => {
        try {
            const passport = await get_data(`passport/get-passport/${mId}`);
            setDocumentFile(passport?.data?.passport);
        } catch (error) {
            console.error("Error fetching passport:", error);
        }
    };

    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem("businessFormdata"));

        if (localData && localData?.members?.length > 0) {
            setMemberId(localData?.members[0]?.id);

            fetchPassport(localData?.members[0]?.id)
        }


    }, []);

    console.log('documentFile', documentFile);

    return (
        <div style={{ width: '100%', padding: 24, boxSizing: 'border-box' }}>
            <Title level={3}>Owner / Shareholder Info</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                Who&apos;s Behind the Business?
            </Text>

            <Card>
                <Form form={form} layout="vertical" initialValues={defaultValues} onFinish={handleFinish}>
                    <Row gutter={16}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="First Name"
                                name="firstName"
                                rules={[{ required: true, message: 'First name is required' }]}
                            >
                                <Input size="large" placeholder="Enter First Name" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Last Name"
                                name="lastName"
                                rules={[{ required: true, message: 'Last name is required' }]}
                            >
                                <Input size="large" placeholder="Enter Last Name" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Phone Number"
                                name="phone"
                                rules={[{ required: true, message: 'Phone number is required' }]}
                            >
                                <Input
                                    size="large"
                                    addonBefore={
                                        <Form.Item name="phoneCode" noStyle>
                                            <Select style={{ width: 80 }}>
                                                <Option value="+91">+91</Option>
                                                <Option value="+1">+1</Option>
                                            </Select>
                                        </Form.Item>
                                    }
                                    placeholder="Enter phone"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                label="Role in Company"
                                name="role"
                                rules={[{ required: true, message: 'Role is required' }]}
                            >
                                <Select size="large" placeholder="Select Role">
                                    {
                                        roles?.map((role, index) => (
                                            <Option key={index} value={role}>{role}</Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12} >
                            <Form.Item label="ITIN / SSN" name="ssn">
                                <Input size="large" placeholder="Enter ITIN or SSN (Optional)" />
                            </Form.Item>
                        </Col>


                        <Col xs={24} md={12} style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
                            <Form.Item name="isResponsible" valuePropName="checked">
                                <Checkbox>
                                    Responsible Member
                                </Checkbox>
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24}>
                            <Form.Item
                                label="Residency Address"
                                name="address"
                                rules={[{ required: true, message: 'Address is required' }]}
                            >
                                <Input.TextArea
                                    rows={4} // Change the number of rows as needed
                                    size="large"
                                    placeholder="Enter Address"
                                />
                                {/* <Input size="large" placeholder="Enter Address" /> */}
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Card bordered style={{ borderColor: '#ff4d00' }}>
                                <Row align="middle" gutter={16}>
                                    <Col xs={24} md={6}>
                                        {documentFile && typeof documentFile !== 'string' ?
                                            documentFile?.type?.includes('pdf') ?
                                                <embed src={URL.createObjectURL(documentFile)} type="application/pdf" width="120" />
                                                :
                                                <img src={URL.createObjectURL(documentFile)} alt="Document" width="120" />
                                            :
                                            typeof documentFile === 'string' ?
                                                documentFile?.includes('pdf') ?
                                                    <embed src={`${serverURL}/uploads/passports/${documentFile}`} type="application/pdf" width="120" />
                                                    :
                                                    <img src={`${serverURL}/uploads/passports/${documentFile}`} alt="Document" width="120" />
                                                :
                                                <GiPassport size={120} color="#ff4d00" />}
                                    </Col>
                                    <Col xs={24} md={18}>
                                        <Text strong>Passport</Text>
                                        <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                                            Passport is needed for identity verification and FinCIN filings.
                                        </Text>
                                        <Upload
                                            beforeUpload={(file) => {
                                                setDocumentFile(file);
                                                // storeFileInIndexedDB(memberId, file);
                                                return false;
                                            }}
                                            maxCount={1}
                                            onRemove={() => setDocumentFile(null)}
                                        >
                                            <Button icon={<UploadOutlined />} type="dashed" danger>
                                                {documentFile ? 'Change File' : 'Upload'}
                                            </Button>
                                        </Upload>
                                        {documentFile && (
                                            <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                                                {documentFile.name}
                                            </Text>
                                        )}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>


                    </Row>
                </Form>
            </Card>

            <Card style={styles.upsellCard}>
                <span style={styles.upsellBgLetter}>S</span>
                <Row align="middle" wrap={false}>
                    <Col flex="auto">
                        <Row gutter={[12, 8]}>
                            <Col span={24}>
                                <Text strong>Don't have SSN? Get your ITIN Number</Text>
                            </Col>
                            <Col span={24}>
                                Add ITIN application service to your company formation package for a special discounted price.
                            </Col>
                        </Row>
                    </Col>
                    <Divider type="vertical" style={{ height: '100%' }} />
                    <Col flex="160px" style={{ textAlign: 'center' }}>
                        <Text delete type="secondary">Regular Fee $399</Text>
                        <Title level={3} style={{ margin: 0 }}>$349</Title>
                        <Text type="secondary">With Company Formation</Text>
                        <Button
                            block
                            style={{
                                background: selectedServices.some(item => item.text === 'ITIN Application') ? "white" : primaryColor,
                                border: selectedServices.some(item => item.text === 'ITIN Application') ? "1px solid #fa541c" : `1px solid ${primaryColor}`,
                                marginTop: 12,
                                color: selectedServices.some(item => item.text === 'ITIN Application') ? primaryColor : '#fff',
                            }}
                            onClick={() => {
                                const exists = selectedServices.some(item => item.text === 'ITIN Application');
                                if (exists) {
                                    setSelectedServices(selectedServices.filter(item => item.text !== 'ITIN Application'));
                                } else {
                                    setSelectedServices([...selectedServices, {
                                        text: 'ITIN Application',
                                        amt: 350,
                                        category: 'Bookkeeping',
                                        isPurchased: null,
                                        duration: 'One Time',
                                        description: "An ITIN is vital for non-residents to access financial services like PayPal, Stripe, banking, and credit.",
                                        image: '/images/insight.svg'
                                    }]);
                                }
                            }}
                        >
                            {selectedServices.some(item => item.text === 'ITIN Application') ? 'Remove ITIN' : 'Get your ITIN'}
                        </Button>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default AddSingleMember;