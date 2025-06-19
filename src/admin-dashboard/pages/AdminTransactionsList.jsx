import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import AdminTransactionsTable from "../../admin-dashboard/components/AdminTransactionsTable"
import { get_data } from "../../api";
import Loader from "../../user-dashboard/components/Loader";
import Empty from "../../user-dashboard/components/Empty";
import AddIcon from "@mui/icons-material/Add";
import AddTransaction from "../components/AddTransaction";

export default function AdminTransactionsList() {

    const page = { width: '100%', marginBottom: '2%' };

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalData, setTotalData] = useState(null);
    const [open, setOpen] = useState(false)
    const itemsPerPage = 15;
    const count = data?.length;

    const getTransactions = async () => {
        try {
            const response = await get_data(`user-transaction/get-all-user-transactions?pageNumber=${currentPage}`);
            if (response?.status === true) {
                setData(response?.data?.userTransactions)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalUserTransactions)
                // setLoading(false);
            }
            else {
                // setLoading(false);
            }
        } catch (error) {
            // setLoading(false);
        }
    }

    useEffect(() => {
        if (currentPage) {
            getTransactions(currentPage);
        }
    }, [currentPage])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    const tableHeader = [
        "S No.", "Transaction ID", "User name", "Company", "Service", "Amount", "Date"
    ]

    return (
        <>
            <AddTransaction open={open} setOpen={setOpen} getAllTransactions={getTransactions} />
            <Grid container spacing={0} style={{ ...page, display: "flex", alignItems: 'center', gap: '1%' }}>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: '#000', color: '#fff', display: 'flex', gap: 5, boxShadow: 'none', marginBottom: '2%' }}
                                onClick={() => setOpen(true)}
                            >
                                <AddIcon sx={{ fontSize: 18 }} /> New
                            </Button>
                            {
                                data?.length == 0 ? (
                                    <Empty title={'No Transactions to show!'} />
                                ) : (
                                    <AdminTransactionsTable
                                        data={data}
                                        tableHeader={tableHeader}
                                        itemsPerPage={itemsPerPage}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        count={count}
                                        totalData={totalData}
                                        totalPages={totalPages}
                                        loading={loading}
                                        setLoading={setLoading}
                                        getAllTransactions={getTransactions}
                                    />
                                )
                            }
                        </>
                    )
                }
            </Grid>
        </>
    )
}