import React from 'react';

const AddonsDetails = ({ isAdmin, company }) => {

    return (
        <div className="company-details-container">

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
                <h3 style={{ margin: 0, marginBottom: '3%' }}>Addons Services</h3>
            </div>

            <div className="company-details">
                <div className="company-details">
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        {
                            company?.addons?.[0] && (
                                <>
                                    {company?.addons?.map((addon, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                padding: "8px 12px",
                                                borderRadius: "16px",
                                                backgroundColor: "#e0e0e0",
                                                display: "inline-block",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {addon?.name}
                                        </div>
                                    ))}
                                </>
                            )
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddonsDetails;