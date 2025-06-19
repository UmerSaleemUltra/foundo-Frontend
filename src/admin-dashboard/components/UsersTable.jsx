import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    Pagination,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { formatDate } from '../../constant';
import EditProfileModal from '../../user-dashboard/components/EditProfileModal';
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

export default function UsersTable({ data, tableHeader, setCurrentPage, currentPage, itemsPerPage, totalData, totalPages, getAllUsers }) {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);

    const [selectedRow, setSelectedRow] = useState({})
    const [open, setOpen] = useState(false)
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

    const handleEdit = (row) => {
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
                type='user' open={deleteOpen}
                setOpen={setDeleteOpen} id={selectedRow?._id}
                title={selectedRow?.first_name + ' ' + selectedRow?.last_name}
                getAllUsers={getAllUsers}
            />
            <EditProfileModal open={open} setOpen={setOpen} user_data={selectedRow} getAllUsers={getAllUsers} type='admin' />
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
                                <TableCell style={{ borderRight: '1px solid gainsboro', textAlign: 'center', width: 60 }}>{index + 1}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.user_id}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.first_name + ' ' + row?.last_name}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.phone || '-'}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.email || '-'}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.country || '-'}</TableCell>
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
                                            handleEdit(row)
                                        }}>Edit</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleMenuClose()
                                            handleDelete(row)
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
            </TableContainer>
        </>
    );
};