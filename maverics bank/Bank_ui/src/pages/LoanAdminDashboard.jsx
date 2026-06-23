import { useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import LoanDashboardCards from "../components/loan/LoanDashboardCards";
import ViewLoans from "../components/loan/ViewLoans";
import SearchLoan from "../components/loan/SearchLoan";
import ApproveLoan from "../components/loan/ApproveLoan";
import RejectLoan from "../components/loan/RejectLoan";

const LoanAdminDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

       <AdminLayout>

    <div className="container-fluid">

        <h2 className="mb-4">
            Loan Management
        </h2>

        <LoanDashboardCards />

        <ViewLoans />

    </div>

</AdminLayout>
    );
};

export default LoanAdminDashboard;