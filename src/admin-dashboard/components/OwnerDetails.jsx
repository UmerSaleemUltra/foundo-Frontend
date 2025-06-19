import { Grid } from "@mui/material";

export default function OwnerDetails({ company }) {

    const user_info_div = {
        borderRadius: 25,
        color: "black",
        background: "#F6F6F6",
        height: "100%",
    };

    const plan_items_div = {
        display: "flex",
        gap: "4%",
        justifyContent: "left",
        padding: "4%",
    };

    const plan_item = {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
    };

    const userItems = [
        {
            title: "Full name",
            value: company?.user_id?.first_name + ' ' + company?.user_id?.last_name
        },
        {
            title: "Phone number",
            value: company?.user_id?.phone,
        },
        {
            title: "Email",
            value: company?.user_id?.email,
        },
        {
            title: "Country",
            value: company?.user_id?.country,
        },
    ];

    console.log('company', company);


    const ownerItems = [
        {
            title: "Full name",
            value: company?.name,
        },
        {
            title: "Phone number",
            value: company?.phone,
        },
        {
            title: "Email",
            value: company?.email,
        },
        {
            title: "Gender",
            value: company?.gender,
        },
    ];


    const userDiv = (role) => {
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "2px solid #F1F1F2",
                        padding: "4%",
                    }}
                >
                    <h2
                        className="global-h2"
                        style={{
                            color: "black",
                            fontSize: 18,
                            margin: 0,
                        }}
                    >
                        {role} Details
                    </h2>
                </div>
            </>
        );
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={8}>
                    <div style={user_info_div}>
                        {userDiv('User')}
                        <div style={plan_items_div}>
                            {userItems?.map((item, i) => {
                                return (
                                    <div style={plan_item}>
                                        <p
                                            className="about-para"
                                            style={{ fontSize: 13, textTransform: "uppercase" }}
                                        >
                                            {item?.title}
                                        </p>
                                        <h3
                                            style={{
                                                margin: "2%",
                                                fontSize: 17,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <>{item?.value}</>
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Grid>

                <Grid item md={8}>
                    <div style={user_info_div}>
                        {userDiv('Owner')}
                        <div style={plan_items_div}>
                            {ownerItems?.map((item, i) => {
                                return (
                                    <div style={plan_item}>
                                        <p
                                            className="about-para"
                                            style={{ fontSize: 13, textTransform: "uppercase" }}
                                        >
                                            {item?.title}
                                        </p>
                                        <h3
                                            style={{
                                                margin: "2%",
                                                fontSize: 17,
                                                fontWeight: 500,
                                            }}
                                        >
                                            <>{item?.value}</>
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Grid>

            </Grid>
        </>
    )
}