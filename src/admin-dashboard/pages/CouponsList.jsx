import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { get_data, post_data } from "../../api";
import Loader from "../../user-dashboard/components/Loader";
import Empty from "../../user-dashboard/components/Empty";
import SearchComponent from "../components/SearchComponent";
import CouponsTable from "../components/CouponsTable";
import { primaryColor } from "../../constant";
import AddCoupon from "../components/AddCoupon";

export default function CouponsList() {

    const page = { width: '100%', marginBottom: '2%' };

    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalData, setTotalData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchState, setSearchState] = useState(false);
    const [open, setOpen] = useState(false)

    const itemsPerPage = 15;
    const count = data?.length;

    const getAllCoupons = async () => {
        try {
            const response = await get_data(`coupon/get-all-coupons?pageNumber=${currentPage}`);
            if (response?.status) {
                setData(response?.data?.coupons)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalCoupons)
            }
            setLoading(false);
        } catch (error) {
        }
    }

    useEffect(() => {
        if (currentPage) {
            if (searchState) {
                searchData();
            } else {
                getAllCoupons(currentPage);
            }
        }
    }, [currentPage, searchState])

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);


    const tableHeader = [
        "S No.", "Coupon Code", "Discount", "Created"
    ]


    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            if (searchTerm !== '') {
                searchData();
                setSearchState(true);
            } else {
                getAllCoupons();
                setSearchState(false);
            }
        }, 500);
    };

    const searchData = async () => {
        try {
            const response = await post_data(`coupon/search-coupons/${searchTerm}?pageNumber=${currentPage}`);
            setLoading(false);
            if (response.status) {
                setData(response?.data?.coupons)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalCoupons)
            } else {
                setData([]);
            }
        } catch (error) {
            setLoading(false);
        }
    };


    return (
        <>
            <AddCoupon open={open} setOpen={setOpen} getAllCoupons={getAllCoupons} />
            <Grid container spacing={0} style={{ ...page, display: "flex", flexDirection: 'column', justifyContent: 'start' }}>
                <div style={{ marginLeft: 'auto' }}>
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: primaryColor, color: 'white',
                            textTransform: 'none', boxShadow: 'none',
                            borderRadius: 12, padding: 12,
                        }}
                        onClick={() => setOpen(true)}
                    >
                        Create Coupon
                    </Button>
                </div>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            {
                                data?.length === 0 ? (
                                    <Empty title={'No Coupon to show!'} />
                                ) : (
                                    <>
                                        <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

                                        <CouponsTable
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
                                            getAllCoupons={getAllCoupons}
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