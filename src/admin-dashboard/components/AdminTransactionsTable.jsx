import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    Avatar,
    Button,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Pagination,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDate, formatDollar } from '../../constant';
import InvoiceModal from './InvoiceModal';
import AddTransaction from './AddTransaction';
import DeleteModal from './DeleteModal';

const useStyles = makeStyles({
    root: {
        '& .MuiTableCell-root': {
            borderBottom: 'none',
            padding: '7px 10px',
        },
        '& .MuiTableRow-root': {
            borderBottom: '1px solid gainsboro',
        },
        '& .MuiCheckbox-root': {
            color: '#a3a3a3',
        },
    },
    statusButton: {
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 'bold',
        '&.closedOwn': {
            backgroundColor: '#e8f5e9',
            color: '#43a047',
        },
        '&.unpaid': {
            backgroundColor: '#fff3e0',
            color: '#fb8c00',
        },
        '&.paid': {
            backgroundColor: '#e3f2fd',
            color: '#1e88e5',
        },
        '&.closedLost': {
            backgroundColor: '#ffebee',
            color: '#e53935',
        },
    },
    avatarGroup: {
        display: 'flex',
        alignItems: 'center',
    },
    avatarName: {
        marginLeft: '8px',
        fontSize: 14
    },
    moreIcon: {
        color: '#a3a3a3',
    },
});

export default function AdminTransactionsTable({
    data, tableHeader,
    setCurrentPage, totalData,
    itemsPerPage, currentPage,
    totalPages, getAllTransactions
}) {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);
    const [editOpen, setEditOpen] = useState(false)
    const [open, setOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false)

    const handleMenuOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setCurrentRow(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentRow(null);
    };

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalData);

    const handleDownload = (row) => {
        setSelectedRow(row)
        setOpen(true)
    }

    const handleDelete = (row) => {
        setSelectedRow(row)
        setDeleteOpen(true)
    }

    return (
        <>
            <DeleteModal
                type={'transaction'}
                open={deleteOpen}
                setOpen={setDeleteOpen}
                id={selectedRow?._id}
                title={'Are you sure want to delete this transaction history'}
                getAllTransactions={getAllTransactions}
            />
            <AddTransaction open={editOpen} setOpen={setEditOpen} isUpdate={true} selectedRow={selectedRow} getAllTransactions={getAllTransactions} />
            <InvoiceModal open={open} setOpen={setOpen} currentInvoice={selectedRow} />
            <TableContainer style={{ background: 'white', borderRadius: 5, border: '1px solid gainsboro' }}>
                <Table className={classes.root}>
                    <TableHead>
                        <TableRow>
                            {
                                tableHeader?.map((item) => {
                                    return (
                                        <TableCell style={{ borderRight: '1px solid gainsboro', padding: '16px 10px' }}>{item}</TableCell>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell style={{ borderRight: '1px solid gainsboro', textAlign: 'center' }}>{index + 1}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.transaction_id}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.user_id?.first_name + ' ' + row?.user_id?.last_name}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.company_id?.company_name + ' ' + row?.company_id?.designator}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.service_purchased}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>
                                    <Button style={{
                                        fontSize: 13, fontWeight: 600,
                                        padding: '4px 15px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        backgroundColor: '#e8f5e9',
                                        color: '#43a047'
                                    }}>
                                        {formatDollar(row?.amount)}
                                    </Button>
                                </TableCell>

                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{formatDate(row?.created_at)}</TableCell>

                                <TableCell style={{ borderRight: '1px solid gainsboro', width: 60 }}>
                                    <IconButton
                                        className={classes.moreIcon}
                                        onClick={(event) => handleMenuOpen(event, index)}
                                    >
                                        <MoreVertIcon />
                                    </IconButton>

                                    {/* Options menu */}
                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl) && currentRow === index}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => {
                                            handleMenuClose()
                                            handleDownload(row)
                                        }}>Download</MenuItem>

                                        <MenuItem onClick={() => {
                                            handleMenuClose()
                                            setEditOpen(true)
                                            setSelectedRow(row)
                                        }}>Update</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleDelete(row)
                                            handleMenuClose()
                                        }}>Delete</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {data?.length >= 0 && (
                    <div
                        style={{
                            borderTop: "1px solid gainsboro",
                            padding: "2%",
                            display: "flex",
                            justifyContent: "space-between",
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
            </TableContainer >
        </>
    );
};