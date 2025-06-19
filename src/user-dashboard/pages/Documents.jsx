import React, { useEffect, useState } from 'react';
import { FaPercent, FaRegBuilding } from 'react-icons/fa';
import { FaRegFileLines } from 'react-icons/fa6';
import { LuBook, LuMail, LuUserCircle2 } from 'react-icons/lu';
import { MdBusinessCenter } from 'react-icons/md';
import Doc from '../components/Doc';
import { Button } from '@mui/material';
import AddDocument from '../components/AddDocument';
import { get_data, post_data } from '../../api';
import { primaryColor } from '../../constant';

const Documents = ({ company, isAdmin }) => {

    const [docs, setDocs] = useState([])
    const [totalPages, setTotalPages] = useState(null);
    const [totalData, setTotalData] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All Documents');
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchState, setSearchState] = useState(false);

    const categories = [
        { name: 'All Documents', icon: <FaRegFileLines /> },
        { name: 'Company Documents', icon: <FaRegBuilding /> },
        { name: 'Business Compliance', icon: <MdBusinessCenter /> },
        { name: 'Bookkeeping', icon: <LuBook /> },
        { name: 'Tax', icon: <FaPercent /> },
        { name: 'Business Mail', icon: <LuMail /> },
        { name: 'Registered Agent', icon: <LuUserCircle2 /> },
        { name: 'Uncategorised', icon: <FaRegFileLines /> },
    ];

    const getAllDocs = async () => {
        const response = await post_data(`document/get-documents-by-company/${company?._id}?pageNumber=${currentPage}`, { category: activeCategory })
        if (response?.status === true) {
            setDocs(response?.data?.documents)
            setTotalPages(response?.data?.totalPages)
            setTotalData(response?.data?.totalDocuments)
        }
    }


    useEffect(() => {
        if (currentPage) {
            if (searchState) {
                searchData();
            } else {
                getAllDocs();
            }
        }
    }, [company, currentPage, activeCategory]);

    const handleSearch = (event) => {
        if (event.key === 'Enter') {
            if (searchTerm !== '') {
                searchData();
                setSearchState(true);
            } else {
                getAllDocs();
                setSearchState(false);
            }
        }
    }

    const searchData = async () => {
        const result = await post_data(`document/search-documents/${searchTerm}?pageNumber=${currentPage}`, { category: activeCategory, company_id: company?._id })
        if (result?.status) {
            setDocs(result?.data?.documents)
            setTotalPages(result?.data?.totalPages)
            setTotalData(result?.data?.totalDocuments)
        }
    }

    return (
        <div className="document-viewer-container">

            <AddDocument open={open} setOpen={setOpen} categories={categories} company={company} getAllDocs={getAllDocs} />

            {
                !isAdmin && (
                    <div className="sidebar">
                        <ul className="category-list">
                            {categories.map((category) => (
                                <li
                                    key={category.name}
                                    className={`category-item ${activeCategory === category.name ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category.name)}
                                >
                                    <span className="category-icon">{category.icon}</span>
                                    {category.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )
            }
            <div className="document-content">
                <div className="search-bar">
                    <input type="text" placeholder="Search for a document..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch} />
                </div>
                {
                    isAdmin &&
                    <div style={{ display: 'flex', justifyContent: 'right', marginBottom: 20 }}>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: primaryColor, color: 'white',
                                textTransform: 'none', boxShadow: 'none',
                                borderRadius: 12, padding: 12,
                            }}
                            onClick={() => setOpen(true)}
                        >
                            Add Document</Button>
                    </div>}

                <Doc
                    company={company} getAllDocs={getAllDocs} docs={docs} setDocs={setDocs}
                    totalPages={totalPages} totalData={totalData} currentPage={currentPage}
                    setCurrentPage={setCurrentPage} isAdmin={isAdmin}
                />

            </div>
        </div>
    );
};

export default Documents;