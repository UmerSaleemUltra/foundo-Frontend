import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import { get_data, post_data } from "../../api";
import Loader from "../../user-dashboard/components/Loader";
import Empty from "../../user-dashboard/components/Empty";
import SearchComponent from "../components/SearchComponent";
import AddIcon from "@mui/icons-material/Add";
import AddUser from "../components/AddUser";

export default function UsersList() {

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

    const getAllUsers = async () => {
        try {
            const response = await get_data(`user/get-all-users?pageNumber=${currentPage}`);
            if (response?.status) {
                setLoading(false);
                setData(response?.data?.users)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalUsers)
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
                getAllUsers(currentPage);
            }
        }
    }, [currentPage, searchState])


    const tableHeader = [
        "S No.", "ID", "Name", "Phone", "Email", "Country", "Member since"
    ]


    const handleSearch = () => {
        setLoading(true);
        setTimeout(() => {
            if (searchTerm !== '') {
                searchData();
                setSearchState(true);
            } else {
                getAllUsers();
                setSearchState(false);
            }
        }, 500);
    };

    const searchData = async () => {
        try {
            const response = await post_data(`user/search-user/${searchTerm}?pageNumber=${currentPage}`);
            setLoading(false);
            if (response.status) {
                setLoading(false);
                setData(response?.data?.users)
                setTotalPages(response?.data?.totalPages)
                setTotalData(response?.data?.totalUsers)
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
            <AddUser open={open} setOpen={setOpen} getAllUsers={getAllUsers} />
            <Grid container spacing={0} style={{ ...page, display: "flex", alignItems: 'center', gap: '1%' }}>
                {
                    loading ? (
                        <Loader />
                    ) : (
                        <>
                            {
                                data?.length === 0 ? (
                                    <Empty title={'No User to show!'} />
                                ) : (
                                    <>
                                        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-start' }}>
                                            <SearchComponent searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSearch={handleSearch} />

                                            <Button
                                                variant="contained"
                                                style={{ backgroundColor: '#000', color: '#fff', display: 'flex', gap: 5, boxShadow: 'none' }}
                                                onClick={() => setOpen(true)}
                                            >
                                                <AddIcon sx={{ fontSize: 18 }} /> New
                                            </Button>
                                        </div>

                                        <UsersTable
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
                                            getAllUsers={getAllUsers}
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