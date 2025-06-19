import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { FaRegCalendarAlt, FaRegCreditCard } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import EditProfileModal from './EditProfileModal';
import { getInitials } from '../../constant';
import { logout } from '../../redux/slices/user-slice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa6';


export default function UserProfileModal({ open, setOpen, user_data, company }) {


    const [editOpen, setEditOpen] = React.useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        maxHeight: '80%',
        overflowY: 'auto',
        p: 4,
        borderRadius: 6,
    };

    const handleClose = () => setOpen(false);

    const handleLogout = () => {
        localStorage.removeItem('authToken')
        dispatch(logout());
        navigate('/login')
        toast.success('Logout successfully')
    }

    const userProfileMenu = () => {
        return (
            <div className="user-profile-menu-container">
                <div className="user-info">
                    <Avatar className="user-avatar">{getInitials(user_data?.first_name + ' ' + user_data?.last_name)}</Avatar>
                    <div className="user-details">
                        <h4 className="user-name">{user_data?.first_name + ' ' + user_data?.last_name}</h4>
                        <p className="user-company">{company?.company_name} {company?.designator}</p>
                    </div>
                </div>
                <div className="user-menu">
                    <div className="menu-item" onClick={() => {
                        setEditOpen(true)
                        setOpen(false)
                    }}>
                        <div className="menu-icon"><IoSettingsOutline /></div>
                        <div className="menu-label">Settings</div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-icon"><FaWhatsapp /></div>
                        <a target='_blank' style={{ textDecoration: 'none', color: 'black' }} href='https://api.whatsapp.com/send?phone=919770015304&text=Hi%20Leegal%20team!%20I%27m%20interested%20in%20registering%20my%20business%20in%20the%20United%20States.%20Could%20you%20please%20share%20more%20details%20on%20how%20I%20can%20get%20started%3F%0A'>
                            <div className="menu-label">Chat us on WhatsApp</div>
                        </a>
                    </div>
                    <div className="menu-item" onClick={handleLogout}>
                        <div className="menu-icon"><RiLogoutCircleLine /></div>
                        <div className="menu-label">Logout</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <EditProfileModal open={editOpen} setOpen={setEditOpen} user_data={user_data} />
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {userProfileMenu()}
                </Box>
            </Modal>
        </div>
    );
}
