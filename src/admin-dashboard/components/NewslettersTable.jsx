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

export default function NewslettersTable({ data, tableHeader, setCurrentPage, currentPage, itemsPerPage, totalData, totalPages, getAllNewsletters }) {

    const classes = useStyles();

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const startEntry = (currentPage - 1) * itemsPerPage + 1;
    const endEntry = Math.min(currentPage * itemsPerPage, totalData);

    return (
        <>
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
                            <TableRow key={index} >
                                <TableCell style={{ borderRight: '1px solid gainsboro', textAlign: 'center', width: 60, padding: '1.5% 0' }}>{index + 1}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{row?.email}</TableCell>
                                <TableCell style={{ borderRight: '1px solid gainsboro' }}>{formatDate(row?.created_at)}</TableCell>
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