import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';

export default function CompaniesModal({
    open,
    setOpen,
    companyName,
    isCompany,
    designator
}) {

    const navigate = useNavigate()

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 4,
        borderRadius: 6
    };

    const [companies, setCompanies] = React.useState(['Incorz LLC']);
    const [currentCompany, setCurrentCompany] = React.useState('Incorz LLC');
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredCompanies = companies?.filter(company =>
        company?.toLowerCase().includes(searchTerm?.toLowerCase())
    );


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                >
                    <Box sx={style}>
                        <div className="company-selector-container">
                            <div className="company-header">
                                <h3>Your Companies</h3>
                                <div className="total-companies">Total - {isCompany ? '1' : '0'}</div>
                            </div>
                            <div className="current-company">Current Company - {companyName || '-'} {designator}</div>

                            {
                                isCompany && (
                                    <div className="company-list">
                                        <div
                                            className={`company-item selected`}
                                        >
                                            <div className="company-index">1</div>
                                            <div className="company-name">{companyName} {designator}</div>
                                        </div>
                                    </div>
                                )
                            }

                            {
                                !isCompany && (
                                    <button className="add-company-btn" onClick={() => {
                                        setOpen(false)
                                        navigate('/business-formation');
                                        window.scrollTo(0, 0)
                                    }}>Register your company ➕</button>
                                )
                            }
                        </div>

                    </Box>
                </Modal>
            </div>
        </>
    );
}