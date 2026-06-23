import { useState } from "react";

import EmployeeLayout from "../layouts/EmployeeLayout";

import ViewLoans from "../components/loan/ViewLoans";
import SearchLoan from "../components/loan/SearchLoan";
import ApproveLoan from "../components/loan/ApproveLoan";
import RejectLoan from "../components/loan/RejectLoan";
import LoanDashboardCards from "../components/loan/LoanDashboardCards";

const LoanEmployeeDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

        <EmployeeLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Loan Management
                </h2>

                <LoanDashboardCards />

                <div className="d-flex gap-2 flex-wrap mb-4">

                    <button
                        className="btn btn-dark"
                        onClick={() =>
                            setActiveTab("view")
                        }
                    >
                        View Loans
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            setActiveTab("search")
                        }
                    >
                        Search Loan
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() =>
                            setActiveTab("approve")
                        }
                    >
                        Approve Loan
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            setActiveTab("reject")
                        }
                    >
                        Reject Loan
                    </button>

                </div>

                {
                    activeTab === "view"
                    &&
                    <ViewLoans />
                }

                {
                    activeTab === "search"
                    &&
                    <SearchLoan />
                }

                {
                    activeTab === "approve"
                    &&
                    <ApproveLoan />
                }

                {
                    activeTab === "reject"
                    &&
                    <RejectLoan />
                }

            </div>

        </EmployeeLayout>
    );
};

export default LoanEmployeeDashboard;