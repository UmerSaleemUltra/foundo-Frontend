import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Avatar, Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from '@mui/material';
import { post_data, serverURL } from '../../api';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Camera, CameraAlt } from '@mui/icons-material';

export default function EditMember({
    open,
    setOpen,
    company,
    selectedMember,
    isUpdate,
    setIsUpdate
}) {
    const navigate = useNavigate();
    const { user_data } = useSelector(state => state.user);


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 5,
        borderRadius: 6
    };

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [address, setAddress] = React.useState('')
    const [role, setRole] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const [file, setFile] = React.useState(null);
    const [hover, setHover] = React.useState(false);
    const [responsibleMember, setResponsibleMember] = React.useState(false);

    React.useEffect(() => {
        if (isUpdate) {
            setFirstName(selectedMember?.first_name)
            setLastName(selectedMember?.last_name)
            setPhone(selectedMember?.phone)
            setAddress(selectedMember?.address)
            setRole(selectedMember?.role || '')
            setResponsibleMember(selectedMember?.responsible_member)
        }
    }, [selectedMember])

    const handleClose = () => {
        setOpen(false)
        setFirstName('')
        setLastName('')
        setPhone('')
        setAddress('')
        setRole('')
        setIsUpdate(false);
        setResponsibleMember(false);
        setFile(null)
    };


    const handleAdd = async () => {
        setLoading(true)
        let response;

        const formData = new FormData();

        formData.append('passport', file);
        formData.append('first_name', firstName);
        formData.append('last_name', lastName);
        formData.append('phone', phone);
        formData.append('address', address);
        formData.append('role', role);
        formData.append('responsible_member', responsibleMember);

        response = await post_data(`company/create-member/${company?._id}`, formData)

        if (response?.status === true) {
            setLoading(false)
            toast.success('Member added successfully');
            navigate("/admin/dashboard/company")
            window.scrollTo(0, 0)
            setOpen(false)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }

    const handleSave = async () => {
        setLoading(true)
        let response;

        if (file) {
            const formData = new FormData();

            formData.append('memberId', selectedMember?._id);
            formData.append('passport', file);
            formData.append('first_name', firstName);
            formData.append('last_name', lastName);
            formData.append('phone', phone);
            formData.append('address', address);
            formData.append('role', role);
            formData.append('responsible_member', responsibleMember);

            response = await post_data(`company/update-member-with-passport/${company?._id}`, formData)

        } else {
            let payload = {
                first_name: firstName,
                last_name: lastName,
                phone: phone,
                address: address,
                role: role,
                memberId: selectedMember?._id,
                passport: selectedMember?.passport,
                responsible_member: responsibleMember
            }
            response = await post_data(`company/update-member/${company?._id}`, payload)
        }
        if (response?.status === true) {
            setLoading(false)
            toast.success('Company updated successfully');
            navigate("/admin/dashboard/company")
            window.scrollTo(0, 0)
            setOpen(false)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }

    const roles = [
        'Owner', 'Manager', 'Employee', 'CEO', 'CRO', 'Head of Partnership', 'Shareholder', 'Ops Manager', 'Director', 'Supervisor',
        'Coordinator', 'Team Lead', 'Analyst', 'Consultant', 'Engineer',
        'Designer', 'Developer', 'Marketing Specialist', 'Sales Representative',
        'Customer Support', 'Human Resources', 'Finance', 'IT Administrator',
        'Quality Assurance', 'Operations',
    ];

    const handleFile = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info" style={{ marginBottom: '8%' }}>
                        <div className="user-details">
                            <h4 className="user-name">Member</h4>
                        </div>
                    </div>

                    <div className="company-selector-container" >

                        <div style={{
                            marginBottom: '3%', display: 'flex', justifyContent: 'center', position: 'relative',
                            cursor: hover ? 'pointer' : 'default'
                        }}>
                            <img
                                src={file ? URL.createObjectURL(file) : !isUpdate ? '' : `${serverURL}/uploads/passports/${selectedMember?.passport}`}
                                style={{ width: 100, height: 100, borderRadius: 50 }}
                                alt=""
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                onClick={() => document.getElementById('fileInput').click()}
                            />
                            <input type="file" id="fileInput" onChange={handleFile} style={{ display: 'none' }} />
                            <CameraAlt fontSize='small' style={{ position: 'absolute', bottom: "1%", left: "53%", color: '#000', backgroundColor: '#fff', borderRadius: 50, padding: 5 }} />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setFirstName(e.target.value)} value={firstName}
                                id="outlined-basic" label="First Name" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setLastName(e.target.value)} value={lastName}
                                id="outlined-basic" label="Last Name" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setPhone(e.target.value)} value={phone}
                                id="outlined-basic" label="Phone" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setAddress(e.target.value)} value={address}
                                id="outlined-basic" label="Address" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                <Select
                                    value={role}
                                    label="Role"
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    {roles.map((item, idx) => (
                                        <MenuItem key={idx} value={item}>{item}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <FormControlLabel control={
                                <Checkbox checked={responsibleMember} onChange={(e) => setResponsibleMember(e.target.checked)} />} label="Responsible Member" />

                        </div>

                        <button className="add-company-btn" onClick={isUpdate ? handleSave : handleAdd} style={{ marginTop: '3%' }} disabled={loading}>
                            {loading ? 'Save...' : 'Save'}
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}