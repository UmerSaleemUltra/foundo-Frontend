import React, { useState } from 'react';
import EditAssocMember from './EditAssocMember';

const AssocMember = ({ isAdmin, company }) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <EditAssocMember open={open} setOpen={setOpen} company={company} />

            <div className="company-details-container">

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
                    <h3 style={{ margin: 0, marginBottom: '3%' }}>Associated Member</h3>
                    {
                        isAdmin && (
                            <div
                                onClick={() => setOpen(true)}
                                style={{
                                    background: 'black',
                                    color: "white",
                                    boxShadow: "none",
                                    marginLeft: "auto",
                                    fontSize: 13,
                                    padding: "2% 4%",
                                    border: "none",
                                    borderRadius: 13,
                                    fontWeight: 600,
                                    cursor: "pointer",
                                }}
                            >
                                Edit
                            </div>
                        )
                    }
                </div>

                <div className="company-details">
                    {[
                        { label: "Full Name", value: company?.name },
                        { label: "Phone", value: company?.phone },
                        { label: "Email", value: company?.email },
                        { label: "Gender", value: company?.gender },
                    ].map((detail, index) => (
                        <div className="company-detail-item" key={index}>
                            <div className="company-detail-label">{detail.label}</div>
                            <div className="company-detail-value">{detail.value || "N/A"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AssocMember;