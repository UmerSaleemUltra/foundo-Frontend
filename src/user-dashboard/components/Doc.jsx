import React, { useEffect, useState } from 'react';
import { FaRegFileLines } from 'react-icons/fa6';
import { get_data, serverURL } from '../../api';
import Empty from './Empty';
import Loader from './Loader';
import { Pagination, Typography } from '@mui/material';
import { AiOutlineDelete } from "react-icons/ai";
import DeleteModal from '../../admin-dashboard/components/DeleteModal';
import { BsDownload } from "react-icons/bs";


const Doc = ({ company, getAllDocs, docs, setDocs, totalPages, setTotalPages, totalData, setTotalData, currentPage, setCurrentPage, isAdmin }) => {

    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState({})

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    const handleDocClick = (file) => {
        if (!isAdmin) {
            window.open(`${serverURL}/uploads/documents/${file}`, '_blank');
        }
    }

    const handleDownload = (file) => {
        window.open(`${serverURL}/uploads/documents/${file}`, '_blank');
    }

    const ProjectCard = ({ title, type, file, id }) => {
        return (
            <>
                <div className="project-card" onClick={() => handleDocClick(file)}>
                    {
                        isAdmin && (
                            <div style={{ display: 'flex', gap: 15, marginLeft: '70%' }}>
                                <AiOutlineDelete style={{ fontSize: 25 }} onClick={() => { setSelectedId(id); setOpen(true) }} />
                                <BsDownload style={{ fontSize: 25 }} onClick={() => handleDownload(file)} />
                            </div>
                        )
                    }
                    <div className="project-card-header">
                        <div className="folder-icon"><FaRegFileLines /></div>
                    </div>
                    <h4 className="project-title">{title}</h4>
                    <p className="project-folder">Type: {type}</p>
                </div>
            </>
        );
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const itemsPerPage = 15

    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalData);

    return (
        <>
            <DeleteModal open={open} setOpen={setOpen} title={selectedId?.name} id={selectedId?._id} getAllDocs={getAllDocs} type='docs' />
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        {
                            docs?.length === 0 ? (
                                <Empty title='No Documents to show!' />
                            ) : (
                                <>
                                    <div className="projects-grid">
                                        {docs?.map((doc, index) => (
                                            <ProjectCard key={index} title={doc?.name} type={doc?.type} file={doc?.file} id={doc} />
                                        ))}
                                    </div>
                                    {docs?.length > 0 && (
                                        <div
                                            style={{
                                                borderTop: "1px solid gainsboro",
                                                padding: "2%",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                marginTop: "3%",
                                            }}
                                        >
                                            <Typography
                                                style={{
                                                    fontWeight: 500,
                                                    fontSize: 15,
                                                    color: "black",
                                                }}
                                            >{`Showing ${startEntry} to ${endEntry} of ${totalData} Records`}</Typography>
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={handlePageChange}
                                                color="primary"
                                            />
                                        </div>
                                    )}
                                </>
                            )
                        }
                    </>
                )
            }
        </>
    );
};

export default Doc;