import { Box, Button, CircularProgress, Divider, FormControl, FormHelperText, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React from "react";
import { post_data } from "../../api";
import toast from "react-hot-toast";

const AddDocument = ({ open, setOpen, categories, company, getAllDocs }) => {
    console.log('add doc', company);

    const [documentName, setDocumentName] = React.useState('');
    const [file, setFile] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [category, setCategory] = React.useState('');
    const [error, setError] = React.useState({});

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 5,
        borderRadius: 6,
    };

    const handleClose = () => {
        setOpen(false);
        setDocumentName('');
        setFile('');
        setCategory('');
        setError({});
    }

    const validation = () => {
        let error = {};
        if (!documentName.trim()) {
            error = { ...error, documentName: 'Please input document name' };
        }
        if (!file) {
            error = { ...error, file: 'Please upload file' };
        }
        if (!category) {
            error = { ...error, category: 'Please select category' };
        }

        setError(error);
        return Object.keys(error).length === 0;
    }

    const handleSubmit = async () => {
        if (validation()) {
            setLoading(true);

            const formData = new FormData();
            formData.append('user_id', company?.user_id?._id);
            formData.append('company_id', company?._id);
            formData.append('name', documentName);
            formData.append('category', category);
            formData.append('file', file);

            const result = await post_data('document/create-document', formData);

            if (result?.status === true) {
                getAllDocs();
                toast.success('Document added successfully');
            }
            else {
                toast.error(result?.response?.data?.message || 'Something went wrong');
            }

            setLoading(false);
            handleClose();
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
            >
                <Typography id="modal-modal-title" variant="h6" component="h2" style={{ marginBottom: '7%' }}>
                    Add Document
                </Typography>

                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Document Name"
                        variant="outlined"
                        value={documentName}
                        error={error?.documentName}
                        helperText={error?.documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        onFocus={(e) => setError({ ...error, documentName: '' })}
                    />

                    <FormControl fullWidth sx={{ mt: 2 }} error={error?.category}>
                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Category"
                            onChange={(e) => setCategory(e.target.value)}
                            onFocus={() => setError({ ...error, category: '' })}
                        >
                            {
                                categories?.map((item, index) => {
                                    if (index === 0) return '';
                                    return <MenuItem key={index} value={item?.name}>{item?.name}</MenuItem>
                                })
                            }
                        </Select>
                        <FormHelperText sx={{ color: "#EA2024" }}>{error?.category}</FormHelperText>
                    </FormControl>

                    <div style={{ display: 'flex', marginTop: 10 }}>
                        <Button
                            component="label"
                            role={undefined}
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            style={{ textTransform: 'capitalize', padding: '5px 15px', border: '1px dashed', color: 'black', boxShadow: 'none', marginTop: 10 }}
                            onFocus={() => setError({ ...error, file: '' })}
                        >
                            Upload
                            <input type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
                        </Button>
                        {
                            file && (
                                <span style={{ alignSelf: 'center', marginLeft: 10 }}>{file?.name}</span>
                            )
                        }
                    </div>
                    <FormHelperText sx={{ color: "#EA2024" }}>{error?.file}</FormHelperText>

                    <Button
                        variant="contained"
                        style={{
                            textTransform: 'capitalize', background: '#EA2024',
                            color: 'white', boxShadow: 'none', marginTop: 20,
                            borderRadius: 12, padding: 12, marginLeft: 'auto', display: 'flex'
                        }}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Add Document"}
                    </Button>


                </Typography>
            </Box>
        </Modal>
    )
}

export default AddDocument;