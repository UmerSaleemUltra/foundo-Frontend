import React, { useState } from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { primaryColor } from "../../constant"
import { FaUser, FaLifeRing, FaBell } from 'react-icons/fa';
import AdminProfileModal from "./AdminProfileModal";

export default function AdminSidebar({
    dashboard_items,
}) {

    const navigate = useNavigate();
    const { user_data } = useSelector(state => state.user);
    const [open, setOpen] = useState(false)
    const [notiOpen, setNotiOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const [supportOpen, setSupportOpen] = useState(false)

    const user_dashboard_sidebar = {
        background: "white",
        width: '100%',
        height: '100vh',
        position: 'relative',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
    };

    const logo_section = {
        padding: '4% 5% 0',
        display: "flex",
        gap: 10,
        alignItems: 'center',
    };

    const sidebar_items_div = {
        padding: '2% 8%',
    };

    const handleListItem = (item, i) => {
        if (item?.link) {
            navigate(item.link);
            window.scrollTo(0, 0);
        }
    };

    let current_path = window.location.pathname;

    const display_sidebar_items = () => {
        return (
            <List sx={{ width: '100%', maxWidth: 360 }} component="nav">
                {dashboard_items?.map((item, i) => {
                    return (
                        <div key={i}>
                            <ListItemButton
                                onClick={() => handleListItem(item, i)}
                                style={{
                                    padding: '6% 8%',
                                    borderRadius: 10,
                                    margin: '7% 0',
                                    background: item?.type !== 'dropdown' ? current_path === item.link ? '#F6F6F6' : 'transparent' : ''
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    gap: '8%',
                                    width: '100%',
                                    fontSize: 19,
                                    color: current_path === item?.link ? primaryColor : '#757575',
                                    alignItems: item?.type !== 'dropdown' ? "center" : 'center'
                                }}>
                                    {item.icon}
                                    <p style={{ color: current_path === item?.link ? primaryColor : '#757575', fontWeight: 400, fontSize: 16, margin: 0, padding: 0 }}>
                                        {item?.type !== 'dropdown' ? item?.title : ''}
                                    </p>
                                </div>
                            </ListItemButton>
                        </div>
                    );
                })}
            </List>
        );
    };

    return (
        <>
            <AdminProfileModal open={profileOpen} setOpen={setProfileOpen} user_data={user_data} />
            <div style={user_dashboard_sidebar} className="sidebar-container">
                <div style={logo_section}>
                    <img src='/images/logo.svg'
                        style={{ width: 140, cursor: 'pointer', margin: '3% 0' }}
                    />
                </div>
                <div style={sidebar_items_div}>
                    {display_sidebar_items()}

                    <div className="icons-container">
                        <button className="icon-button" onClick={() => setProfileOpen(true)}>
                            <FaUser />
                        </button>
                        <button className="icon-button" onClick={() => setSupportOpen(true)}>
                            <FaLifeRing />
                        </button>
                        <button className="icon-button" onClick={() => setNotiOpen(true)}>
                            <FaBell />
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}
