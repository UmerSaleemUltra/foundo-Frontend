import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { get_data, post_data } from "../../api";
import Loader from "../../user-dashboard/components/Loader";
import Empty from "../../user-dashboard/components/Empty";
import SearchComponent from "../components/SearchComponent";
import { primaryColor } from "../../constant";
import AddCoupon from "../components/AddCoupon";
import NewslettersTable from "../components/NewslettersTable";

export default function Newsletters() {

    const page = { width: '100%', marginBottom: '2%' };

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalData, setTotalData] = useState(null);
    const [open, setOpen] = useState(false)

    const itemsPerPage = 15;
    const count = data?.length;

    const getAllNewsletters = async () => {
        try {
            const response = await get_data(`newsletter/get-all-newsletters?pageNumber=${currentPage}`);
            if (response?.status) {
                setData(response?.data?.newsletters)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalNewsletters)
            }
            setLoading(false);
        } catch (error) {
        }
    }

    useEffect(() => {
        if (currentPage) {
            getAllNewsletters(currentPage);
        }
    }, [currentPage])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    const tableHeader = [
        "S No.", "Email", "Created"
    ]


    return (
        <>
            <AddCoupon open={open} setOpen={setOpen} getAllNewsletters={getAllNewsletters} />
            <Grid container spacing={0} style={{ ...page, display: "flex", flexDirection: 'column', justifyContent: 'start' }}>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            {
                                data?.length === 0 ? (
                                    <Empty title={'No Newsletter to show!'} />
                                ) : (
                                    <>
                                        <NewslettersTable
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
                                            getAllNewsletters={getAllNewsletters}
                                        />
                                    </>
                                )
                            }
                        </>
                    )
                }
            </Grid>
        </>
    )
}