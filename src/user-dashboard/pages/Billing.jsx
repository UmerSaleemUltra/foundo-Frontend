import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LinearProgress, {
    linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { primaryColor, formatDate, formatDollar } from "../../constant";
import { Grid } from "@mui/material";
import RegisterLLC from "../components/RegisterLLC";
import Transactions from "./Transactions";

export default function Billing({ company, isCompany }) {

    const { user_data } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const current_plan_div = {
        borderRadius: 25,
        color: "black",
        background: "#F6F6F6",
        height: "100%",
    };

    const plan_items_div = {
        display: "flex",
        gap: "4%",
        justifyContent: "left",
        padding: "5%",
    };

    const plan_item = {
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        width: "100%",
    };

    const payment_details_div = {
        display: "flex",
        alignItems: 'center',
        gap: "3%",
        padding: "5%",
        border: "1px solid #F1F1F2",
        borderRadius: 5,
    };

    const upgradeDiv = () => {
        return (
            <>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        borderBottom: "2px solid #F1F1F2",
                        padding: "5%",
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
                        Plan Summary
                    </h2>
                    <div
                        style={{
                            background: '#e8f5e9',
                            color: "#43a047",
                            boxShadow: "none",
                            marginLeft: "auto",
                            fontSize: 13,
                            padding: "2.5% 5%",
                            border: "none",
                            borderRadius: 13,
                            fontWeight: 600,
                        }}
                    >
                        Active
                    </div>
                </div>
            </>
        );
    };

    // const expiryProgressBar = () => {
    //     return (
    //         <div style={{ padding: "0 4% 4%" }}>
    //             <p
    //                 className="about-para"
    //                 style={{ fontSize: 13, textTransform: "uppercase" }}
    //             >
    //                 Expiry Date
    //                 <b> {formatDate(new Date())}</b>
    //             </p>
    //             <LinearProgress
    //                 variant="determinate"
    //                 value={65}
    //                 style={{ borderRadius: 5, height: 23, marginTop: "1%" }}
    //             />
    //         </div>
    //     );
    // };

    const paymentDetails = () => {
        return (
            <div style={payment_details_div}>
                <div>
                    <img src="https://d28wu8o6itv89t.cloudfront.net/images/Visadebitcardpng-1599584312349.png" style={{ width: 80, borderRadius: 10 }} />
                </div>
                <div style={plan_item}>
                    <h3 className="global-h3" style={{ color: "black", fontSize: 18, margin: 0 }}>
                        **** **** **** 1234
                    </h3>
                    <p style={{ margin: 0 }}>
                        Expiry 22/10/2024
                    </p>
                </div>
            </div>
        );
    };

    const planItems = [
        {
            title: "Plan name",
            value: 'One-Stop Plan'
        },
        {
            title: "Billing Cycle",
            value: 'One Time',
        },
        {
            title: "Plan cost",
            value: formatDollar(company?.plan_amount),
            type: "currency",
        },
    ];


    const subscriptionSummary = () => {
        return (
            <>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        <div style={current_plan_div}>
                            {upgradeDiv()}
                            <div style={plan_items_div}>
                                {planItems?.map((item, i) => {
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
                                                    textTransform: "capitalize",
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
                    <Grid item md={6}>
                        {/* <div style={current_plan_div}>
                            {upgradeDiv()}
                            <div style={{ padding: "4%" }}>{paymentDetails()}</div>
                        </div> */}
                    </Grid>
                </Grid>
            </>
        );
    };

    return (
        <>
            <div>
                {
                    isCompany ? (
                        <>
                            {subscriptionSummary()}
                            <div style={{ marginTop: '5%' }}>
                                <h3>Transaction History</h3>
                                <Transactions />
                            </div>
                        </>
                    ) : (
                        <RegisterLLC />
                    )
                }
            </div>
        </>
    );
}
