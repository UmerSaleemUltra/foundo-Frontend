import React, { useState } from 'react';
import EditRegAgent from './EditRegAgent';

const RegAgent = ({ isAdmin, company }) => {

    const [open, setOpen] = useState(false)

    return (
        <>
            <EditRegAgent open={open} setOpen={setOpen} company={company} />

            <div className="company-details-container">

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
                    <h3 style={{ margin: 0, marginBottom: '3%' }}>Registered Agent</h3>
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
                        { label: "Name", value: company?.reg_agent_name },
                        { label: "Address", value: company?.reg_agent_address },
                    ]?.map((detail, index) => (
                        <div className="company-detail-item" key={index}>
                            <div className="company-detail-label">{detail?.label}</div>
                            <div className="company-detail-value">{detail?.value || "N/A"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default RegAgent;