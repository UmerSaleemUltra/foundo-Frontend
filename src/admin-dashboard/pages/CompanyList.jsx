import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import CompanyTable from "../components/CompanyTable";
import { get_data, post_data } from "../../api";
import Loader from "../../user-dashboard/components/Loader";
import Empty from "../../user-dashboard/components/Empty";
import SearchComponent from "../components/SearchComponent";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";



export default function CompanyList() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(null);
    const [totalData, setTotalData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchState, setSearchState] = useState(false);


    const itemsPerPage = 15;
    const count = data?.length;

    const page = { width: '100%', marginBottom: '2%' };

    const getCompanyList = async () => {
        try {
            const response = await get_data(`company/get-all-company?pageNumber=${currentPage}`);
            if (response?.status) {
                setLoading(false);
                setData(response?.data?.companies)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalCompany)
            }
            else {
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (currentPage) {
            if (searchState) {
                searchData();
            } else {
                getCompanyList(currentPage);
            }
        }
    }, [currentPage, searchState])


    const tableHeader = [
        "S No.", "Company Name", "Owner", "State", "Amount", "Date", "Status"
    ]

    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            if (searchTerm !== '') {
                searchData();
                setSearchState(true);
            } else {
                getCompanyList();
                setSearchState(false);
            }
        }, 500);
    };

    const searchData = async () => {
        try {
            const response = await post_data(`company/search-company/${searchTerm}?pageNumber=${currentPage}`);
            setLoading(false);
            if (response.status) {
                setLoading(false);
                setData(response?.data?.companies)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalCompany)
            } else {
                setData([]);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <>
            <Grid container spacing={0} style={{ ...page, display: "flex", alignItems: 'center', gap: '1%' }}>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            {
                                data?.length === 0 ? (
                                    <Empty title={'No Company to show!'} />
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
                                            <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

                                            <Button
                                                variant="contained"
                                                style={{ backgroundColor: '#000', color: '#fff', display: 'flex', gap: 5, boxShadow: 'none' }}
                                                onClick={() => navigate('/business-formation')}
                                            >
                                                <AddIcon sx={{ fontSize: 18 }} /> New
                                            </Button>
                                        </div>
                                        <CompanyTable
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
                                            getCompanyList={getCompanyList}
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