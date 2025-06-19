import React, { useEffect, useState } from 'react';
import CompanyDetails from '../components/CompanyDetails';
import { Grid } from '@mui/material';
import AssocMember from '../components/AssocMember';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import MembersDetails from '../components/MembersDetails';
import AddonsDetails from '../components/AddonsDetails';
import { useNavigate } from 'react-router-dom';
import CompanyStatus from '../../admin-dashboard/components/CompanyStatus';
import RegAgent from '../components/RegAgent';
import RegisterLLC from '../components/RegisterLLC';
import MailingAddress from '../components/MailingAddress';

const Company = ({ isAdmin, company, isCompany, stats }) => {

    const [loading, setLoading] = useState(true)
    const { user_data } = useSelector(state => state.user);
    const navigate = useNavigate()

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 1000);
    }, [])

    return (
        <>
            {
                loading ? (
                    <Loader />
                ) : (
                    <>
                        {
                            !isCompany ?
                                <>
                                    <RegisterLLC />
                                </>
                                :
                                <>
                                    <p style={{ opacity: '60%', fontSize: 13 }}>COMPANY UNIQUE ID- {company?.company_id}</p>
                                    <Grid container spacing={3}>
                                        <Grid item md={8}>
                                            <CompanyDetails isAdmin={isAdmin} company={company} />
                                            {/* <AssocMember isAdmin={isAdmin} company={company} /> */}
                                        </Grid>
                                        <Grid item md={4}>
                                            <CompanyStatus company={company} />
                                            <Grid item md={12} style={{ marginTop: '5%' }}>
                                                <div style={{
                                                    background: '#F6F6F6',
                                                    padding: '6%',
                                                    borderRadius: 25
                                                }}>
                                                    <h3 style={{ marginBottom: '8%', fontSize: 18, fontWeight: 500 }}>Company Documents</h3>
                                                    <p style={{ fontSize: 13, opacity: '60%' }}>
                                                        {stats?.documents || 0} Documents
                                                    </p>
                                                    <button className="my-company-btn" style={{ marginTop: '4%', background: 'black' }} onClick={() => { navigate('/dashboard/documents'); window.scrollTo(0, 0) }}>View Now</button>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                    {/* <Grid container spacing={3} style={{ marginTop: '1%' }}>
                                        <Grid item md={8}>
                                            <CompanyDetails isAdmin={isAdmin} company={company} />
                                        </Grid>
                                        <Grid item md={4}>
                                            <div style={{
                                                background: '#F6F6F6',
                                                padding: '6%',
                                                borderRadius: 25
                                            }}>
                                                <h3 style={{ marginBottom: '8%', fontSize: 18, fontWeight: 500 }}>Company Documents</h3>
                                                <p style={{ fontSize: 13, opacity: '60%' }}>
                                                    {stats?.documents || 0} Documents
                                                </p>
                                                <button className="my-company-btn" style={{ marginTop: '4%', background: 'black' }} onClick={() => { navigate('/dashboard/documents'); window.scrollTo(0, 0) }}>View Now</button>
                                            </div>
                                        </Grid>
                                    </Grid> */}

                                    <Grid container spacing={3} style={{ marginTop: '1%' }}>
                                        <Grid item md={8}>
                                            <MembersDetails isAdmin={isAdmin} company={company} />
                                        </Grid>
                                        <Grid item md={4}>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} style={{ marginTop: '1%' }}>
                                        <Grid item md={8}>
                                            <RegAgent isAdmin={isAdmin} company={company} />
                                        </Grid>
                                        <Grid item md={4}>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} style={{ marginTop: '1%' }}>
                                        <Grid item md={8}>
                                            <MailingAddress isAdmin={isAdmin} company={company} />
                                        </Grid>
                                        <Grid item md={4}>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3} style={{ marginTop: '1%' }}>
                                        <Grid item md={8}>
                                            <AddonsDetails isAdmin={isAdmin} company={company} />
                                        </Grid>
                                        <Grid item md={4}>
                                        </Grid>
                                    </Grid>
                                </>
                        }
                    </>
                )
            }
        </>
    );
};

export default Company;