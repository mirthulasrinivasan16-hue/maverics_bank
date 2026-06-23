import { useState } from "react";

import CustomerLayout from "../layouts/CustomerLayout";

import ApplyLoan from "../components/customerLoan/ApplyLoan";
import ViewMyLoans from "../components/customerLoan/ViewMyLoans";

const CustomerLoanDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("loans");

    return (

        <CustomerLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    My Loans
                </h2>

                <div className="mb-4">

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            setActiveTab("apply")
                        }
                    >
                        Apply Loan
                    </button>

                </div>

                {
                    activeTab === "loans"
                    &&
                    <ViewMyLoans />
                }

                {
                    activeTab === "apply"
                    &&
                    <ApplyLoan />
                }

            </div>

        </CustomerLayout>
    );
};

export default CustomerLoanDashboard;