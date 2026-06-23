import { useEffect, useState } from "react";
import axios from "axios";

import CustomerLayout from "../layouts/CustomerLayout";

const CustomerDashboard = () => {

    const [dashboard, setDashboard] =
        useState({

            totalAccounts: 0,

            totalLoans: 0,

            branchName: "-",

            availableBalance: 0
        });

    const loadDashboard =
        async () => {

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/customer/dashboard/${localStorage.getItem("customerId")}`,

                        {
                            headers:{
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setDashboard(
                    response.data
                );
            }
            catch(error){

                console.log(error);
            }
        };

    useEffect(() => {

        loadDashboard();

    }, []);

    return (

        <CustomerLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Customer Dashboard
                </h2>

                <div className="row">

                    <div className="col-md-3">

                        <div className="card p-3 shadow-sm">

                            <h3>
                                {dashboard.totalAccounts}
                            </h3>

                            <h5>
                                Total Accounts
                            </h5>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card p-3 shadow-sm">

                            <h3>
                                {dashboard.totalLoans}
                            </h3>

                            <h5>
                                Total Loans
                            </h5>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card p-3 shadow-sm">

                            <h5>
                                {dashboard.branchName}
                            </h5>

                            <h5>
                                My Branch
                            </h5>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card p-3 shadow-sm">

                            <h4>
                                ₹{dashboard.availableBalance.toLocaleString()}
                            </h4>

                            <h5>
                                Available Balance
                            </h5>

                        </div>

                    </div>

                </div>

            </div>

        </CustomerLayout>
    );
};

export default CustomerDashboard;