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
import { useNavigate } from 'react-router-dom';
import { formatDate, formatDollar } from '../../constant';
import DeleteModal from './DeleteModal';
import UpdateStatusModal from './UpdateStatusModal';

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
        '&.completed': {
            backgroundColor: '#e8f5e9',
            color: '#43a047',
        },
        '&.processing': {
            backgroundColor: '#fff3e0',
            color: '#fb8c00',
        }
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



export default function CompanyTable({ data, tableHeader, setCurrentPage, currentPage, itemsPerPage, totalData, totalPages, getCompanyList }) {

    const classes = useStyles();
    const navigate = useNavigate()

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentRow, setCurrentRow] = useState(null);

    const [open, setOpen] = useState(false)
    const [updateOpen, setUpdateOpen] = useState(false)
    const [selectedRow, setSelectedRow] = useState(null);
    const [isPayment, setIsPayment] = useState(false)

    const handleMenuOpen = (event, index) => {
        setAnchorEl(event.currentTarget);
        setCurrentRow(index);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setCurrentRow(null);
    };

    const handleNavigate = (row) => {
        navigate('/admin/dashboard/company/details', { state: { company: row } })
        window.scrollTo(0, 0)
    }

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalData);

    const handleDelete = (row) => {
        setSelectedRow(row)
        setOpen(true)
    }

    const handleOpen = (row, status) => {
        setSelectedRow(row)
        setUpdateOpen(true)
        setIsPayment(status)
    }

    return (
        <>
            <DeleteModal
                type={'company'}
                open={open}
                setOpen={setOpen} id={selectedRow?._id}
                title={selectedRow?.companycompany_name + ' ' + selectedRow?.designator}
                getCompanyList={getCompanyList}
            />

            <UpdateStatusModal
                open={updateOpen}
                setOpen={setUpdateOpen}
                selectedRow={selectedRow}
                getCompanyList={getCompanyList}
                isPayment={isPayment}
            />

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
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.company_name} {row?.designator}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.name}</TableCell>
                                {/* <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.phone}</TableCell> */}
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.state}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>
                                    <Button style={{
                                        fontSize: 13, fontWeight: 600,
                                        padding: '4px 15px',
                                        borderRadius: '20px',
                                        fontSize: '12px',
                                        backgroundColor: '#e8f5e9',
                                        color: '#43a047'
                                    }}>
                                        {formatDollar(row?.paid_amount)}
                                    </Button>
                                </TableCell>

                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{formatDate(row?.created_at)}</TableCell>

                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>
                                    <Button style={{ fontSize: 11, fontWeight: 500 }}
                                        className={`${classes.statusButton} ${row?.status
                                            .toLowerCase()
                                            .replace(' ', '')}`}
                                    >
                                        {row?.status}
                                    </Button>
                                </TableCell>

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
                                        <MenuItem onClick={() => handleNavigate(row)}>View Details</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleOpen(row)
                                            handleMenuClose()
                                        }}
                                        >Update Status</MenuItem>
                                        <MenuItem onClick={() => {
                                            handleOpen(row, true)
                                            handleMenuClose()
                                        }}
                                        >
                                            Update Payment
                                        </MenuItem>
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
            </TableContainer>
        </>
    );
};