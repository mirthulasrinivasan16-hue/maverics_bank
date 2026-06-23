import { useState } from "react";

import EmployeeLayout from "../layouts/EmployeeLayout";

import ViewAccounts from "../components/accounts/ViewAccounts";
import SearchAccount from "../components/accounts/SearchAccount";
import VerifyAccount from "../components/accounts/VerifyAccount";
import ApproveAccount from "../components/accounts/ApproveAccount";
import RejectAccount from "../components/accounts/RejectAccount";

const EmployeeAccountDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

        <EmployeeLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Account Management
                </h2>

                <div className="d-flex gap-2 flex-wrap mb-4">

                    <button
                        className="btn btn-dark"
                        onClick={() =>
                            setActiveTab("view")
                        }
                    >
                        View Accounts
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() =>
                            setActiveTab("search")
                        }
                    >
                        Search Account
                    </button>

                    <button
                        className="btn btn-warning"
                        onClick={() =>
                            setActiveTab("verify")
                        }
                    >
                        Verify Account
                    </button>

                    <button
                        className="btn btn-success"
                        onClick={() =>
                            setActiveTab("approve")
                        }
                    >
                        Approve Account
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() =>
                            setActiveTab("reject")
                        }
                    >
                        Reject Account
                    </button>

                </div>

                {
                    activeTab === "view"
                    &&
                    <ViewAccounts />
                }

                {
                    activeTab === "search"
                    &&
                    <SearchAccount />
                }

                {
                    activeTab === "verify"
                    &&
                    <VerifyAccount />
                }

                {
                    activeTab === "approve"
                    &&
                    <ApproveAccount />
                }

                {
                    activeTab === "reject"
                    &&
                    <RejectAccount />
                }

            </div>

        </EmployeeLayout>
    );
};

export default EmployeeAccountDashboard;