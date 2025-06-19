import { Grid } from "@mui/material";
import { formatDollar } from "../../constant";

export default function LastMonthStats({ stats }) {

    const current_plan_div = {
        borderRadius: 25,
        color: "black",
        background: "#F6F6F6",
        height: "100%",
    };

    const plan_items_div = {
        display: "flex",
        gap: "15%",
        justifyContent: "left",
        padding: "4%",
    };

    const plan_item = {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
    };

    const lastMonth = [
        {
            title: "Sales",
            value: formatDollar(stats?.lastMonth?.sales),
        },
        {
            title: "Companies",
            value: stats?.lastMonth?.companies,
        },
        {
            title: "Users",
            value: stats?.lastMonth?.users,
        },
        {
            title: "Documents",
            value: stats?.lastMonth?.documents,
        }
    ];

    const currentMonth = [
        {
            title: "Sales",
            value: formatDollar(stats?.currentMonth?.sales),
        },
        {
            title: "Companies",
            value: stats?.currentMonth?.companies,
        },
        {
            title: "Users",
            value: stats?.currentMonth?.users,
        },
        {
            title: "Documents",
            value: stats?.currentMonth?.documents,
        }
    ];


    const headDiv = (title) => {
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
                        {title}
                    </h2>
                </div>
            </>
        );
    };

    return (
        <>
            <Grid container spacing={0}>
                <Grid item md={8}>
                    <div style={current_plan_div}>
                        {headDiv('This Month So Far')}
                        <div style={plan_items_div}>
                            {currentMonth?.map((item, i) => {
                                return (
                                    <div style={plan_item}>
                                        <p
                                            className="about-para"
                                            style={{ fontSize: 16, textTransform: "uppercase" }}
                                        >
                                            {item?.title}
                                        </p>
                                        <h3
                                            style={{
                                                margin: "2%",
                                                fontSize: 25,
                                                fontWeight: 600,
                                            }}
                                        >
                                            <>{item?.value}</>
                                        </h3>
                                    </div>
                                );
                            })}
                        </div>

                        {headDiv('Last Month Summary')}
                        <div style={plan_items_div}>
                            {lastMonth?.map((item, i) => {
                                return (
                                    <div style={plan_item}>
                                        <p
                                            className="about-para"
                                            style={{ fontSize: 16, textTransform: "uppercase" }}
                                        >
                                            {item?.title}
                                        </p>
                                        <h3
                                            style={{
                                                margin: "2%",
                                                fontSize: 25,
                                                fontWeight: 600,
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