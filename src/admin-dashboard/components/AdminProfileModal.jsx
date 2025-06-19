import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { FaRegCalendarAlt, FaRegCreditCard } from 'react-icons/fa';
import { RiLogoutCircleLine } from 'react-icons/ri';
import { IoSettingsOutline } from 'react-icons/io5';
import { getInitials } from '../../constant';
import { logout } from '../../redux/slices/user-slice';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AdminEditProfileModal from './AdminEditProfileModal';


export default function AdminProfileModal({ open, setOpen, user_data }) {

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
                    <Avatar className="user-avatar">{getInitials(user_data?.name)}</Avatar>
                    <div className="user-details">
                        <h4 className="user-name">{user_data?.name}</h4>
                        <p className="user-company">Admin</p>
                    </div>
                </div>
                <div className="user-menu">
                    <div className="menu-item" onClick={() => {
                        setEditOpen(true)
                        setOpen(false)
                    }}>
                        <span className="menu-icon"><IoSettingsOutline /></span>
                        <span className="menu-label">Settings</span>
                    </div>
                    {/* <div className="menu-item">
                        <span className="menu-icon"><FaRegCalendarAlt /></span>
                        <span className="menu-label">Book a free consultation!</span>
                    </div> */}
                    <div className="menu-item" onClick={handleLogout}>
                        <span className="menu-icon"><RiLogoutCircleLine /></span>
                        <span className="menu-label">Logout</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminEditProfileModal open={editOpen} setOpen={setEditOpen} user_data={user_data} />
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    {userProfileMenu()}
                </Box>
            </Modal>
        </div>
    );
}