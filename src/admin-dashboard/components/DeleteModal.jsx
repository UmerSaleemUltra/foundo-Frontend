import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { post_data } from '../../api';
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';

export default function DeleteModal({
    open,
    setOpen,
    title,
    id,
    type,
    getAllUsers,
    getCompanyList,
    getAllDocs,
    getAllCoupons,
    getAllTransactions
}) {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'white',
        border: 'none',
        boxShadow: 24,
        p: 3,
        borderRadius: 5
    };

    const [loading, setLoading] = React.useState(false)

    const handleClose = () => setOpen(false);

    const handleDelete = async () => {
        setLoading(true)

        if (type === 'user') {
            const response = await post_data(`user/delete-user/${id}`)
            if (response?.status) {
                getAllUsers()
                setLoading(false)
                toast.success('User deleted successfully')
                setOpen(false)
            }
            else {
                getAllUsers()
                setLoading(false)
                toast.error('Something went wrong')
                setOpen(false)
            }
        }

        if (type === 'docs') {
            const response = await post_data(`document/delete-document/${id}`)
            if (response?.status) {
                getAllDocs()
                setLoading(false)
                toast.success('Document deleted successfully')
                setOpen(false)
            }
            else {
                getAllDocs()
                setLoading(false)
                toast.error('Something went wrong')
                setOpen(false)
            }
        }

        if (type === 'coupon') {
            const response = await post_data(`coupon/delete-coupon/${id}`)
            if (response?.status) {
                getAllCoupons()
                setLoading(false)
                toast.success('Coupon deleted successfully')
                setOpen(false)
            }
            else {
                getAllCoupons()
                setLoading(false)
                toast.error('Something went wrong')
                setOpen(false)
            }
        }

        if (type === 'company') {
            const response = await post_data(`company/delete-company/${id}`)
            if (response?.status) {
                getCompanyList()
                setLoading(false)
                toast.success('Company deleted successfully')
                setOpen(false)
            }
            else {
                getCompanyList()
                setLoading(false)
                toast.error('Something went wrong')
                setOpen(false)
            }
        }

        if (type === 'transaction') {
            const response = await post_data(`user-transaction/delete-user-transaction/${id}`)
            if (response?.status) {
                getAllTransactions()
                setLoading(false)
                toast.success('Transaction deleted successfully')
                setOpen(false)
            }
            else {
                getAllTransactions()
                setLoading(false)
                toast.error('Something went wrong')
                setOpen(false)
            }
        }
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>

                    <div className="user-info" style={{ marginBottom: '8%' }}>
                        <div className="user-details">
                            <h4 className="user-name" style={{ fontSize: 18 }}>Delete '{title}'</h4>
                        </div>
                    </div>

                    <div style={{ display: 'flex' }}>
                        <Button
                            onClick={() => setOpen(false)}
                            style={{ fontSize: 13, color: 'black', marginLeft: 'auto', display: 'flex' }}>
                            Cancel
                        </Button>
                        <button
                            onClick={handleDelete}
                            className="add-company-btn" style={{ background: 'red', marginLeft: 'auto', display: 'flex' }}>
                            {loading ? 'Delete...' : 'Delete'}
                        </button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}