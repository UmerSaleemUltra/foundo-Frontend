import React, { useState } from 'react';
import { primaryColor } from '../../constant';
import { post_data, serverURL } from '../../api';
import EditMember from './EditMember';
import swal from 'sweetalert';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MembersDetails = ({ isAdmin, company }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const [selectedMember, setSelectedMember] = useState({})
    const [isUpdate, setIsUpdate] = useState(false);


    const handleDelete = (member) => {
        swal({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    const res = await post_data(`company/delete-member/${company?._id}`, { memberId: member?._id })
                    if (res?.status === true) {
                        toast.success('Member deleted successfully');
                        navigate("/admin/dashboard/company")
                        window.scrollTo(0, 0)
                    } else {
                        toast.error(res?.response?.data?.error || 'Something went wrong')
                    }
                } else {
                    swal("Your Member is safe!");
                }
            });

    }

    return (
        <>
            <EditMember selectedMember={selectedMember} open={open} setOpen={setOpen} company={company} isUpdate={isUpdate} setIsUpdate={setIsUpdate} />
            <div className="company-details-container">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2%' }}>
                    <h3 style={{ margin: 0, marginBottom: '3%' }}>Members Details</h3>
                    <div
                        onClick={() => {
                            setOpen(true)
                        }}
                        style={{
                            background: 'black',
                            color: 'white',
                            boxShadow: 'none',
                            fontSize: 13,
                            padding: '2% 4%',
                            border: 'none',
                            borderRadius: 13,
                            fontWeight: 600,
                            cursor: 'pointer',
                            marginLeft: 'auto'
                        }}
                    >
                        Add Member
                    </div>
                </div>

                <div className="company-details">
                    {company?.members?.map((member, i) => {
                        const isLastMember = i === company?.members?.length - 1;
                        return (
                            <>
                                {isAdmin && (
                                    <div style={{ display: 'flex', justifyContent: 'right', gap: '10px' }}>
                                        <div
                                            onClick={() => {
                                                setSelectedMember(member)
                                                setIsUpdate(true)
                                                setOpen(true)
                                            }}
                                            style={{
                                                background: 'black',
                                                color: 'white',
                                                boxShadow: 'none',
                                                fontSize: 13,
                                                padding: '2% 4%',
                                                border: 'none',
                                                borderRadius: 13,
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Edit
                                        </div>
                                        <div
                                            onClick={() => {
                                                setSelectedMember(member)
                                                handleDelete(member)
                                            }}
                                            style={{
                                                background: 'black',
                                                color: 'white',
                                                boxShadow: 'none',
                                                fontSize: 13,
                                                padding: '2% 4%',
                                                border: 'none',
                                                borderRadius: 13,
                                                fontWeight: 600,
                                                cursor: 'pointer',
                                            }}
                                        >
                                            Delete
                                        </div>
                                    </div>

                                )}
                                <div className="company-details" key={i}>
                                    {[
                                        { label: 'Name', value: `${member?.first_name} ${member?.last_name}` },
                                        { label: 'Phone', value: member?.phone },
                                        { label: 'Address', value: member?.address },
                                        { label: 'Role', value: member?.role },
                                        { label: 'Passport', value: member?.passport },
                                        { label: 'Responsible Member', value: member?.responsible_member ? 'Yes' : 'No' },
                                    ]?.map((detail, index, detailsArray) => {
                                        const isLastDetail = index === detailsArray.length - 1;
                                        return (
                                            <div
                                                className="company-detail-item"
                                                key={index}
                                                style={{
                                                    marginBottom: isLastDetail && isLastMember ? '5%' : '0',
                                                }}
                                            >
                                                <div className="company-detail-label">{detail.label}</div>
                                                <div className="company-detail-value">
                                                    {detail.label === 'Passport' ? (
                                                        detail.value ? (
                                                            <a
                                                                href={`${serverURL}/uploads/passports/${detail.value}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                style={{ color: primaryColor, textDecoration: 'none' }}
                                                            >
                                                                View Passport
                                                            </a>
                                                        ) : (
                                                            'N/A'
                                                        )
                                                    ) : (
                                                        detail.value || 'N/A'
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {!isLastMember && <hr />}
                                </div>
                            </>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default MembersDetails;
