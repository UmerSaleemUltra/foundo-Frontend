import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import TransactionsTable from "../components/TransactionsTable";
import { get_data } from "../../api";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Empty from "../components/Empty";
import AddIcon from "@mui/icons-material/Add";

export default function Transactions() {

    const page = { width: '100%', marginBottom: '2%' };
    const { user_data } = useSelector((state) => state.user);

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
            const response = await get_data(`user-transaction/get-all-user-transactions-by-user/${user_data?._id}?pageNumber=${currentPage}`);
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
        "S No.", "Transaction ID", "User Name", "Company", "Service", "Amount", "Date"
    ]

    return (
        <>
            <Grid container spacing={0} style={{ ...page, display: "flex", alignItems: 'center', gap: '1%' }}>

                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            {
                                data?.length == 0 ? (
                                    <Empty title={'No Transactions to show!'} />
                                ) : (
                                    <TransactionsTable
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
                                        getTransactions={getTransactions}
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