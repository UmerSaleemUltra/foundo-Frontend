import { primaryColor } from "../../constant";

export default function CompanyStatus({ company }) {
    return (
        <>
            <div style={{
                background: primaryColor,
                padding: '6%',
                color: 'white',
                borderRadius: 25
            }}>
                <h3 style={{ marginBottom: '7%', fontSize: 18, fontWeight: 500 }}>Company Status</h3>
                <p style={{ fontSize: 13, opacity: '60%' }}>
                    {
                        company?.status === 'completed' ? (
                            <>Your company has been successfully formed in {company?.state} state of U.S.A and now you can professionally run your Business as a U.S. LLC.</>
                        ) : (
                            <>Your company formation request is being processed by our team, we will let you know when your company is formed successfully.</>
                        )
                    }
                </p>
                {
                    company?.status === 'completed' ? (
                        <div className="my-company-btn" style={{ marginTop: '6%', background: '#e8f5e9', color: "#43a047", width: 'fit-content', fontSize: 14, padding: '4% 7%', cursor: 'default' }}>Completed</div>
                    ) : (
                        <div className="my-company-btn" style={{ marginTop: '6%', background: '#fff3e0', color: "#fb8c00", width: 'fit-content', fontSize: 14, padding: '4% 7%', cursor: 'default' }}>Processing</div>
                    )
                }
            </div>
        </>
    )
}