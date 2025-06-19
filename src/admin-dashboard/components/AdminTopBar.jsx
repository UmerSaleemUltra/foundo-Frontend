import React, { useState } from "react";
import { useSelector } from "react-redux";
import { LuShoppingCart } from "react-icons/lu";

export default function AdminTopBar() {

    const { user_data } = useSelector(state => state.user);
    const [open, setOpen] = useState(false)

    const top_section = {
        display: 'flex',
        alignItems: 'center',
        height: 65,
        padding: '2%',
        margin: 0,
        background: 'white',
    };

    return (
        <>
            <div style={top_section}>
                <div style={{ width: '30%', position: "relative" }}>
                    <p style={{ padding: 0, margin: 0, fontSize: 13, opacity: '60%' }}>Welcome back,</p>
                    <h2 style={{ marginTop: '2%', fontSize: 20 }}>{user_data?.name}</h2>
                </div>
                <div style={{ width: '70%', display: "flex", justifyContent: "right", alignItems: "start" }}>
                </div>
            </div>
        </>
    );
}