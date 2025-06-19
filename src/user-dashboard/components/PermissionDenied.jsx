import React from "react"

export default function PermissionDenied({
    title,
}) {

    const empty_page_div = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2% 0',
        height: '100%',
        flexDirection: 'column'
    }

    return (
        <>
            <div style={empty_page_div}>
                <img src={'/images/security.svg'} style={{ width: 400 }} />
                <h3 className="global-h3" style={{ margin: 0, color: 'black', fontSize: 23, fontWeight: 500 }}>{title}</h3>
            </div>
        </>
    )
}