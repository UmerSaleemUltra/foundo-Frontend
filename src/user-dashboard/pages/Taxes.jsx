import React from 'react';

const Tax = () => {
    return (
        <div className="tax-services-container">
            <div className="row">
                <div className="tax-season-card">
                    <div className="tax-season-header">
                        <span role="img" aria-label="alarm clock">⏰</span> Tax Season
                    </div>
                    <div className="tax-season-date">
                        📅 Starting January 15th, 2025
                    </div>
                    <div className="tax-season-countdown">
                        <div className="countdown-item">
                            <div className="countdown-value">2</div>
                            <div className="countdown-label">months</div>
                        </div>
                        <div className="countdown-item">
                            <div className="countdown-value">24</div>
                            <div className="countdown-label">days</div>
                        </div>
                        <div className="countdown-item">
                            <div className="countdown-value">10</div>
                            <div className="countdown-label">hours</div>
                        </div>
                    </div>
                </div>
                <div className="tax-filing-card">
                    <div className="tax-filing-header">
                        <span role="img" aria-label="tax icon">%</span> Tax filings
                    </div>
                    <h3>Tax Filings made easy</h3>
                    <p>
                        Our tax experts can prepare your business’ annual tax return for submission to the Internal Revenue Service (IRS). Let doola handle this important business requirement on your behalf and avoid costly fines and penalties related to late or improper filings.
                    </p>
                    <div className="tax-filing-price">$1,500 /yr</div>
                    <button className="purchase-btn">Purchase</button>
                </div>
            </div>
            <div className="row">
                <div className="cpa-consultation-card">
                    <div className="cpa-consultation-header">
                        <span role="img" aria-label="consultation icon">🎥</span> CPA consultation
                        <span role="img" aria-label="time icon">⏱️</span> 30-min
                    </div>
                    <h3>Tax Questions answered in minutes</h3>
                    <p>
                        US business taxes are complicated. Schedule a 30-minute call with our tax team to have all your questions answered. Our experienced tax team is prepared to demystify US taxation, provide customized support, and maximize your company's tax efficiency.
                    </p>
                    <div className="cpa-consultation-price">$150 One-time</div>
                    <button className="purchase-btn">Purchase</button>
                </div>
            </div>
        </div>
    );
};

export default Tax;