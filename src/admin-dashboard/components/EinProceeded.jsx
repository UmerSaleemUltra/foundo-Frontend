import toast from "react-hot-toast";
import { post_data } from "../../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EinProceeded({ company }) {
    console.log("company", company);
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        setIsModalOpen(false);
        let payload = {
            first_name: company?.user_id?.first_name,
            last_name: company?.user_id?.last_name,
            email: company?.user_id?.email,
            designator: company?.designator,
            company_name: company?.company_name,
            company_id: company?._id
        };

        const response = await post_data("super-admin/send-ein-proceeded-mail", payload);
        if (response?.status === true) {
            toast.success("Mail sent successfully");
            navigate("/admin/dashboard/company")
        } else {
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <>
            <div
                style={{
                    background: "#F6F6F6",
                    padding: "6%",
                    color: "black",
                    borderRadius: 25,
                }}
            >
                <h3 style={{ marginBottom: "7%", fontSize: 18, fontWeight: 500 }}>
                    EIN Proceeded
                </h3>
                <p style={{ fontSize: 13, opacity: "60%" }}>
                    If EIN is proceeded, please click on the button below.
                </p>
                <div
                    onClick={() => setIsModalOpen(true)}
                    className="my-company-btn"
                    style={{
                        marginTop: "6%",
                        background: "#000",
                        color: "white",
                        width: "fit-content",
                        fontSize: 14,
                        padding: "4% 7%",
                        cursor: "pointer",
                    }}
                >
                    {loading ? "Proceeded..." : "Proceeded"}
                </div>
            </div>

            {isModalOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "rgba(0,0,0,0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "20px",
                            borderRadius: "10px",
                            textAlign: "center",
                        }}
                    >
                        <p>Are you sure you want to proceed?</p>
                        <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
                            <button onClick={() => setIsModalOpen(false)} style={{ padding: "10px 15px", background: "#ccc", border: "none", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                            <button onClick={handleClick} style={{ padding: "10px 15px", background: "#000", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
