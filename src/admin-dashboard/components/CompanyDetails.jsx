import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { primaryColor } from '../../constant';
import Documents from "../../user-dashboard/pages/Documents"
import OwnerDetails from './OwnerDetails';
import AdminCompany from '../../user-dashboard/pages/AdminCompany';
import { useLocation } from 'react-router-dom';

export default function CompanyDetails({ isAdmin }) {

    const [value, setValue] = React.useState(0);
    const location = useLocation()
    const company = location?.state?.company

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function CustomTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    CustomTabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    return (
        <>
            <Box>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: primaryColor,
                                height: '3px',  // Set the height of the bottom border (indicator)
                            },
                        }}
                    >
                        <Tab
                            label="Details"
                            {...a11yProps(0)}
                            // Customize the Tab text color
                            sx={{
                                color: value === 0 ? primaryColor : 'inherit',
                                '&.Mui-selected': { color: primaryColor }, textTransform: 'capitalize'
                            }}
                        />
                        <Tab
                            label="Documents"
                            {...a11yProps(1)}
                            sx={{
                                color: value === 1 ? primaryColor : 'inherit',
                                '&.Mui-selected': { color: primaryColor }, textTransform: 'capitalize'
                            }}
                        />
                        <Tab
                            label="Owner"
                            {...a11yProps(2)}
                            sx={{
                                color: value === 2 ? primaryColor : 'inherit',
                                '&.Mui-selected': { color: primaryColor }, textTransform: 'capitalize'
                            }}
                        />
                    </Tabs>
                </Box>
            </Box>

            <div style={{ background: 'white' }}>
                <CustomTabPanel value={value} index={0}>
                    <AdminCompany isAdmin={isAdmin} company={company} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={1}>
                    <Documents isAdmin={isAdmin} company={company} />
                </CustomTabPanel>

                <CustomTabPanel value={value} index={2}>
                    <OwnerDetails isAdmin={isAdmin} company={company} />
                </CustomTabPanel>
            </div>
        </>
    );
}