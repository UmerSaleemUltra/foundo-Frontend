import { useNavigate } from "react-router-dom";

export default function RegisterLLC({ type }) {

    const navigate = useNavigate()

    return (
        <>
            <div className="services-container">
                <div className="services-list">

                    <center><img src={'/images/start-llc.svg'} style={{ width: 400 }} /></center>

                    <div className="service-card" style={{ padding: type === 'dashboard' ? 2 : '' }}>
                        <h4 style={{ marginTop: 0 }}>Register Your First U.S. LLC Now!</h4>
                        <p>
                            We specialize in LLC Formation in any state of the United States. Whether you’re looking to grow your startup or expand globally, we’ve got you covered!
                        </p>
                        <div className="service-price">
                            $249 + State Fees
                        </div>
                        <div className="service-actions">
                            <button onClick={() => { navigate('/pricing'); window.scrollTo() }} className="buy-now-btn">Start Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}