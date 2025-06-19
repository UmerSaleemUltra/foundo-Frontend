import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { Autocomplete, Avatar, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { industryList, states } from '../../constant';
import { useNavigate } from 'react-router-dom';

export default function EditCompanyDetails({
    open,
    setOpen,
    company
}) {

    const { user_data } = useSelector(state => state.user);
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
        height: '80%',
        overflowY: 'auto',
        p: 5,
        borderRadius: 6
    };

    const [name, setName] = React.useState(company?.company_name)
    const [designator, setDesignator] = React.useState(company?.designator)
    const [ein, setEin] = React.useState(company?.ein)
    const [itin, setItin] = React.useState(company?.itin)
    const [state, setState] = React.useState(company?.state)
    const [stateFee, setStateFee] = React.useState(company?.state_fee)
    const [industry, setIndustry] = React.useState(company?.industry)
    const [website, setWebsite] = React.useState(company?.website)
    const [description, setDescription] = React.useState(company?.description)
    const [loading, setLoading] = React.useState(false)
    const [selectedState, setSelectedState] = React.useState(null);


    const handleClose = () => setOpen(false);

    const handleSave = async () => {
        setLoading(true)
        let payload = {
            company_name: name,
            ein: ein,
            itin: itin,
            designator: designator,
            website: website,
            description: description,
            industry: industry,
            state: state,
        }
        const response = await post_data(`company/update-company/${company?._id}`, payload)
        if (response?.status === true) {
            setLoading(false)
            toast.success('Company updated successfully')
            setOpen(false)
            navigate("/admin/dashboard/company")
            window.scrollTo(0, 0)
        }
        else {
            setLoading(false)
            toast.error('Something went wrong')
            setOpen(false)
        }
    }

    const designatorList = ['LLC', 'L.L.C', 'Limited Liability', 'Inc', 'Co', 'Corp']

    const handleStateSelect = (event, newValue) => {
        setState(newValue?.label)
        setStateFee(newValue?.fee);
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info" style={{ marginBottom: '8%' }}>
                        <div className="user-details">
                            <h4 className="user-name">Company Details</h4>
                        </div>
                    </div>

                    <div className="company-selector-container">

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setName(e.target.value)} value={name}
                                id="outlined-basic" label="Company Name" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Designator</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={designator}
                                    label="Designator"
                                    onChange={(e) => setDesignator(e.target.value)}
                                >
                                    {designatorList?.map((item, index) => {
                                        return (<MenuItem value={item}>{item}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setEin(e.target.value)} value={ein}
                                id="outlined-basic" label="EIN" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setItin(e.target.value)} value={itin}
                                id="outlined-basic" label="ITIN" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setWebsite(e.target.value)} value={website}
                                id="outlined-basic" label="Website" variant="outlined" />
                        </div>

                        <div style={{ marginBottom: '3%' }}>
                            <TextField fullWidth
                                onChange={(e) => setDescription(e.target.value)} value={description}
                                id="outlined-basic" label="Description" variant="outlined" />
                        </div>


                        <div style={{ marginBottom: '3%' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"> Company Industry </InputLabel>
                                <Select
                                    value={industry}
                                    label="Company Industry "
                                    onChange={(e) => setIndustry(e.target.value)}
                                >
                                    {industryList?.map((item) => {
                                        return (<MenuItem value={item}>{item}</MenuItem>)
                                    })}
                                </Select>
                            </FormControl>
                        </div>

                        <div>
                            <Autocomplete
                                disablePortal
                                options={states}
                                // value={state}
                                onChange={handleStateSelect}
                                getOptionLabel={(option) => option?.label}
                                renderInput={(params) => <TextField {...params} label="Select state" />}
                            />
                        </div>


                        <button className="add-company-btn" onClick={handleSave} style={{ marginTop: '3%' }}>
                            {loading ? 'Save...' : 'Save'}
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}