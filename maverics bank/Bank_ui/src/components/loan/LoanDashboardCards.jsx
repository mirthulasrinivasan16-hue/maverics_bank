import { useEffect, useState } from "react";
import axios from "axios";

const LoanDashboardCards = () => {

    const [stats, setStats] =
        useState({});

    const fetchStats =
        async () => {

            try {

                const response =
                    await axios.get(

                        "http://localhost:8080/api/loan/dashboard",

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setStats(
                    response.data
                );
            }
            catch(error){

                console.log(error);
            }
        };

    useEffect(() => {

        fetchStats();

    }, []);

    return (

        <div className="row mb-4">

            <div className="col-md-3">

                <div className="card shadow-sm text-center p-3">

                    <h6>Total Loans</h6>

                    <h3>
                        {stats.totalLoans}
                    </h3>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm text-center p-3">

                    <h6>Requested</h6>

                    <h3>
                        {stats.requestedLoans}
                    </h3>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm text-center p-3">

                    <h6>Approved</h6>

                    <h3>
                        {stats.approvedLoans}
                    </h3>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow-sm text-center p-3">

                    <h6>Rejected</h6>

                    <h3>
                        {stats.rejectedLoans}
                    </h3>

                </div>

            </div>

        </div>
    );
};

export default LoanDashboardCards;