import { Grid, useMediaQuery } from "@mui/material";
import { IoCheckmarkCircle } from "react-icons/io5"
import { MdOutlineAccessTime } from "react-icons/md"
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { get_data } from "../../api";
import { useEffect, useState } from "react";



export default function CompanyProgress({ company, isCompany }) {

    const [data, setData] = useState([])

    const getDocsName = async () => {
        const response = await get_data(`document/get-documents-name-by-company/${company?._id}`)
        if (response?.status) {
            setData(response.data?.map((item) => item?.name))
        }
    }

    useEffect(() => {
        getDocsName()
    }, [company])

    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate()

    const statusItems = [
        {
            icon: isCompany ? <IoCheckmarkCircle style={{ color: '#00b009' }} /> : <MdOutlineAccessTime style={{ color: '#000' }} />,
            title: "Order Successfully Processed"
        },
        {
            icon: isCompany && company?.reg_agent_name !== '' ? <IoCheckmarkCircle style={{ color: '#00b009' }} /> : <MdOutlineAccessTime style={{ color: '#000' }} />,
            title: "Registered Agent Assigned"
        },
        {
            icon: isCompany && company?.reg_agent_address !== '' ? <IoCheckmarkCircle style={{ color: '#00b009' }} /> : <MdOutlineAccessTime style={{ color: '#000' }} />,
            title: "Business Mailing Address Issued"
        },
        {
            icon: isCompany && company?.status === 'completed' ? <IoCheckmarkCircle style={{ color: '#00b009' }} /> : <MdOutlineAccessTime style={{ color: '#000' }} />,
            title: "Company Formation Completed"
        },
        {
            icon: isCompany && data?.includes('EIN') ? <IoCheckmarkCircle style={{ color: '#00b009' }} /> : <MdOutlineAccessTime style={{ color: '#000' }} />,
            title: "EIN Successfully Processed"
        },
        {
            icon: isCompany && data?.includes('BOI Report') ? <IoCheckmarkCircle style={{ color: '#00b009' }} /> : <MdOutlineAccessTime style={{ color: '#000' }} />,
            title: "BOI Report Filed"
        }
    ]

    const companyProgress = () => {
        return (
            <div>
                <Grid container spacing={0}>
                    <Grid item md={12} style={{ width: '100%', height: matches_md ? '' : '100%' }}>
                        <Grid container spacing={0} style={{ width: '100%', height: matches_md ? '' : '100%', borderRadius: 10, background: 'transparent', padding: '2%' }}>

                            <Grid item md={12} style={{ width: '100%', display: "flex", justifyContent: 'left', textAlign: "left", margin: 0, flexDirection: "column" }}>
                                <h3 style={{ margin: '0 0 7%', fontWeight: 600, fontSize: 23 }}>Your Company Status</h3>
                                {
                                    statusItems?.map((item, i) => {
                                        return (
                                            <div>
                                                <div style={{ display: "flex", gap: '2%', alignItems: "center", width: '100%', margin: '1% 0', fontSize: 30 }}>
                                                    {item?.icon}
                                                    <p style={{ margin: 0, fontWeight: 500, fontSize: 18 }}>{item?.title}</p>
                                                </div>
                                                {
                                                    statusItems?.length - 1 == i ?
                                                        <></>
                                                        :
                                                        <>
                                                            <div style={{ borderRight: '2px solid gainsboro', width: 14.5, height: 50 }}></div>
                                                        </>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </Grid>

                            <div className="service-actions">
                                {
                                    isCompany ? (
                                        <button onClick={() => { navigate('/dashboard/company'); window.scrollTo() }} className="buy-now-btn" style={{ borderRadius: 50 }}>View Details</button>
                                    ) : (
                                        <button onClick={() => { navigate('/pricing'); window.scrollTo() }} className="buy-now-btn" style={{ borderRadius: 50 }}>Start Now</button>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    return (
        <>
            <div>
                {companyProgress()}
            </div>
        </>
    )
}