import React, { useState, useEffect } from 'react';
import {
    Row,
    Col,
    Input,
    Select,
    Button,
    Typography,
    Upload,
    Card,
    Divider,
    List,
    Popconfirm,
    Form,
    message,
    Checkbox,
    Tag,
} from 'antd';
import {
    UploadOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { GiPassport } from 'react-icons/gi';
import { primaryColor } from '../../constant';
import { CheckBox } from '@mui/icons-material';
import { FormControlLabel, FormGroup } from '@mui/material';
import { get_data, post_data, serverURL } from '../../api';

const { Title, Text } = Typography;
const { Option } = Select;

const defaultValues = {
    id: Date.now(),
    firstName: '',
    lastName: '',
    phoneCode: '+91',
    phone: '',
    role: undefined,
    address: '',
    ssn: '',
    isResponsible: false,
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


const roles = [
    'Owner', 'Manager', 'Employee', 'CEO', 'CRO', 'Head of Partnership', 'Shareholder', 'Ops Manager', 'Director', 'Supervisor',
    'Coordinator', 'Team Lead', 'Analyst', 'Consultant', 'Engineer',
    'Designer', 'Developer', 'Marketing Specialist', 'Sales Representative',
    'Customer Support', 'Human Resources', 'Finance', 'IT Administrator',
    'Quality Assurance', 'Operations',
];

const AddMultipleMember = ({ members, setMembers, itinSelected, setItinSelected, setSelectedServices, selectedServices }) => {
    const [form] = Form.useForm();
    const [editingIndex, setEditingIndex] = useState(null);
    const [documentFile, setDocumentFile] = useState(null);


    const resetForm = () => {
        form.resetFields();
        setDocumentFile(null);
        setEditingIndex(null);
    };


    useEffect(() => {
        const fetchFiles = async () => {
            const updatedMembers = await Promise.all(
                members.map(async (member) => {
                    // const file = await getFileFromIndexedDB(member?.id);
                    try {
                        const result = await get_data(`passport/get-passport/${member?.id}`);
                        if (result?.status === true) {
                            const file = result?.data?.passport;
                            return { ...member, document: file };
                        } else {
                            return { ...member, document: null };
                        }
                    } catch (error) {
                        console.log(error);
                        return { ...member, document: null };
                    }

                    // return { ...member, document: file };
                })
            );
            setMembers(updatedMembers);
        };

        fetchFiles();
    }, []);

    console.log('members fetch files', members);


    const styles = {
        upsellCard: {
            marginTop: 24,
            marginBottom: 24,
            border: itinSelected === true ? `2px solid ${primaryColor}` : '1px solid #e5e5e5',
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

    const addOrUpdateMember = async () => {
        try {
            const values = await form.validateFields();

            if (values.isResponsible) {
                members.forEach((member) => {
                    if (member?.isResponsible) {
                        member.isResponsible = false;
                    }
                });
            }

            const newEntry = {
                ...values,
                id: editingIndex !== null ? members[editingIndex].id : Date.now(),
                passport: documentFile,
            };

            if (documentFile && typeof documentFile !== 'string') {
                const formData = new FormData();
                formData.append('file', documentFile);
                formData.append('member_id', newEntry.id);

                try {
                    const result = await post_data('passport/upload-passport', formData);
                    if (result?.status === true) {
                        newEntry.passport = result?.data?.passport
                    }
                } catch (error) {
                    console.log('error while saving passport', error);
                }
                // storeFileInIndexedDB(newEntry.id, documentFile);
            }

            if (editingIndex !== null) {
                const updated = [...members];
                updated[editingIndex] = newEntry;
                setMembers(updated);
            } else {
                setMembers([...members, newEntry]);
            }
            resetForm();
        } catch (err) {
            // antd automatically highlights the invalid fields
        }
    };


    const editMember = (index) => {
        const m = members[index];
        form.setFieldsValue(m);
        setDocumentFile(m?.passport);
        setEditingIndex(index);
    };

    const deleteMember = (index) => {
        const filtered = members.filter((_, i) => i !== index);
        setMembers(filtered);
        if (editingIndex === index) resetForm();
    };

    // -------------------------------------------------------------------------
    return (
        <div style={{ width: '100%', padding: 24, boxSizing: 'border-box' }}>
            <Title level={3}>Owners / Shareholders Info</Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                Who&apos;s Behind the Business?
            </Text>

            <Row gutter={32}>
                {/* -------------------- LEFT: form -------------------------------- */}
                <Col xs={24} lg={16}>
                    <Card>
                        <Form form={form} layout="vertical" initialValues={defaultValues}>
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

                                <Col span={24}>
                                    <Form.Item
                                        label="Phone Number"
                                        name="phone"
                                        rules={[{ required: true, message: 'Phone number is required' }]}
                                    >
                                        <Input
                                            size="large"
                                            addonBefore={
                                                <Form.Item name="phoneCode" noStyle>
                                                    <Select style={{ width: 90 }}
                                                        defaultValue="+91">
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
                                <Col xs={24} md={12}>
                                    <Form.Item
                                        label="Residency Address"
                                        name="address"
                                        rules={[{ required: true, message: 'Address is required' }]}
                                    >
                                        <Input size="large" placeholder="Enter Address" />
                                    </Form.Item>
                                </Col>

                                {/* ---------- Passport upload (custom field) ------------- */}
                                <Col span={24} >
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
                                                        <GiPassport size={120} color="#ff4d00" />}                                            </Col>
                                            <Col xs={24} md={18}>
                                                <Text strong>Passport</Text>
                                                <Text type="secondary" style={{ display: 'block', marginBottom: 8 }}>
                                                    Passport is needed for identity verification and FinCIN filings.
                                                </Text>
                                                <Upload
                                                    beforeUpload={(file) => {
                                                        setDocumentFile(file);
                                                        if (editingIndex !== null) {
                                                            const memberId = members[editingIndex].id;
                                                            // storeFileInIndexedDB(memberId, file);
                                                        }
                                                        return false;
                                                    }}
                                                    onRemove={() => setDocumentFile(null)}
                                                    maxCount={1}
                                                    fileList={documentFile ? [{
                                                        uid: '-1',
                                                        name: documentFile.name,
                                                        status: 'done',
                                                    }] : []}
                                                >
                                                    <Button icon={<UploadOutlined />} type="dashed" danger>
                                                        {documentFile ? 'Change File' : 'Upload'}
                                                    </Button>
                                                </Upload>
                                                {documentFile && (
                                                    <Text type="secondary" style={{ display: 'block', marginTop: 4 }}>
                                                        {documentFile?.name}
                                                    </Text>
                                                )}
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>


                                <Col xs={24} md={12} style={{ marginTop: 16 }}>
                                    <Form.Item label="ITIN / SSN" name="ssn">
                                        <Input size="large" placeholder="Enter ITIN or SSN (Optional)" />
                                    </Form.Item>
                                </Col>


                                <Col xs={24} md={12} style={{ marginTop: 50 }}>
                                    <Form.Item name="isResponsible" valuePropName="checked">
                                        <Checkbox>
                                            Responsible Member
                                        </Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>

                        <Button
                            block
                            onClick={addOrUpdateMember}
                            icon={<PlusOutlined />}
                            style={{
                                backgroundColor: primaryColor,
                                borderColor: primaryColor,
                                color: '#fff',
                                width: '30%',
                                padding: '10px 20px',
                            }}
                        >
                            {editingIndex !== null ? 'Update Member' : 'Add Member'}
                        </Button>
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Members Added" style={{ height: '100%' }}>
                        {members.length === 0 ? (
                            <Text type="secondary">No members added yet.</Text>
                        ) : (
                            <List
                                dataSource={members}
                                renderItem={(item, index) => (
                                    <List.Item
                                        actions={[
                                            <Button
                                                key="edit"
                                                icon={<EditOutlined />}
                                                size="small"
                                                onClick={() => editMember(index)}
                                            />,
                                            <Popconfirm
                                                key="del"
                                                title="Delete this member?"
                                                okText="Yes"
                                                cancelText="No"
                                                onConfirm={() => deleteMember(index)}
                                            >
                                                <Button icon={<DeleteOutlined />} danger size="small" />
                                            </Popconfirm>,
                                        ]}
                                    >
                                        {/* <List.Item.Meta
                                            title={`${item.firstName || '—'} ${item.lastName || ''}`}
                                            description={item.role || '—'}
                                        /> */}
                                        <List.Item.Meta
                                            title={<>
                                                {item.firstName || '—'} {item.lastName || ''}
                                                {item.isResponsible && <Tag color="green" style={{ marginLeft: 8 }}>Responsible</Tag>}
                                            </>}
                                            description={item.role || '—'}
                                        />
                                    </List.Item>
                                )}
                            />
                        )}
                    </Card>
                </Col>
            </Row>

            <Card style={styles.upsellCard}>
                <span style={styles.upsellBgLetter}>S</span>
                <Row align="middle" wrap={false}>
                    <Col flex="auto">
                        <Row gutter={[12, 8]}>
                            <Col span={24}>
                                <Text strong>Don't have SSN? Get your ITIN Number</Text>
                            </Col>
                            <Col span={24}>
                                Add ITIN application service to your company formation package for a special discounted price. Don't wait, ensure you have the proper documentation in place to run your US business smoothly.
                            </Col>

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
                            Regular Fee $399
                        </Text>
                        <Title level={3} style={{ margin: 0 }}>
                            $349
                        </Title>
                        <Text type="secondary">With Company Formation</Text>
                        <Button
                            onClick={() => {
                                const isExists = selectedServices.map(item => item.text).includes('ITIN Application');

                                if (isExists) {
                                    setSelectedServices(selectedServices.filter(item => item.text !== 'ITIN Application'))
                                } else {
                                    setSelectedServices([...selectedServices, {
                                        text: 'ITIN Application',
                                        amt: 350,
                                        category: 'Bookkeeping',
                                        isPurchased: null,
                                        duration: 'One Time',
                                        description: "An ITIN is vital for non-residents to access financial services like PayPal, Stripe, banking, and credit, empowering seamless U.S.-based business operations and transactions.",
                                        image: '/images/insight.svg'
                                    }])
                                }
                            }}
                            block
                            style={{
                                background: selectedServices.map(item => item.text).includes('ITIN Application') ? "white" : primaryColor,
                                borderColor: primaryColor,
                                marginTop: 12,
                                color: selectedServices.map(item => item.text).includes('ITIN Application') ? primaryColor : '#fff',
                            }}
                        >
                            {selectedServices.map(item => item.text).includes('ITIN Application') ? 'Remove ITIN' : "Get your ITIN"}
                        </Button>

                    </Col>
                </Row>
            </Card>
        </div>
    );


};


export default AddMultipleMember;