import React, { useEffect, useState } from 'react';
import CompanyDetails from '../components/CompanyDetails';
import { Grid } from '@mui/material';
import AssocMember from '../components/AssocMember';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import MembersDetails from '../components/MembersDetails';
import AddonsDetails from '../components/AddonsDetails';
import CompanyStatus from '../../admin-dashboard/components/CompanyStatus';
import RegAgent from '../components/RegAgent';
import MailingAddress from '../components/MailingAddress';
import EinProceeded from '../../admin-dashboard/components/EinProceeded';

const AdminCompany = ({ isAdmin, company, isCompany }) => {

    const [loading, setLoading] = useState(true)
    const { user_data } = useSelector(state => state.user);

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
                        <p style={{ opacity: '60%', fontSize: 13 }}>COMPANY UNIQUE ID- {company?.company_id}</p>
                        <Grid container spacing={3}>
                            <Grid item md={8}>
                                {/* <AssocMember isAdmin={isAdmin} company={company} /> */}
                                <CompanyDetails isAdmin={isAdmin} company={company} />
                            </Grid>
                            <Grid item md={4}>
                                <CompanyStatus company={company} />

                                {
                                    !company?.is_ein_proceeded && (
                                        <div style={{ marginTop: '5%' }}>
                                            <EinProceeded company={company} />
                                        </div>
                                    )
                                }
                            </Grid>
                        </Grid>


                        {/* <Grid container spacing={3} style={{ marginTop: '1%' }}>
                             <Grid item md={8}>
                                <CompanyDetails isAdmin={isAdmin} company={company} />
                            </Grid>
                            <Grid item md={4}>
                                {
                                    !company?.is_ein_proceeded && (
                                        <EinProceeded company={company} />
                                    )
                                }
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
                )
            }
        </>
    );
};

export default AdminCompany;