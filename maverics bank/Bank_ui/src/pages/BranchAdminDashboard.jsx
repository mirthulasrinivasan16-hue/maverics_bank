import { useState } from "react";

import AdminLayout from "../layouts/AdminLayout";

import AddBranch from "../components/branch/AddBranch";
import UpdateBranch from "../components/branch/UpdateBranch";
import DeleteBranch from "../components/branch/DeleteBranch";
import ViewBranches from "../components/branch/ViewBranches";

const BranchAdminDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

        <AdminLayout>

        <div className="container-fluid p-4">

            <div className="mb-4">

                <h2 className="fw-bold">
                    Branch Management
                </h2>

                <p className="text-muted">
                    Manage branch operations and branch information.
                </p>

            </div>

            {/* Statistics */}

            <div className="row mb-4">

                <div className="col-md-3">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Total Branches
                            </h6>

                            <h2>
                                12
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Active Branches
                            </h6>

                            <h2>
                                10
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Employees
                            </h6>

                            <h2>
                                245
                            </h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div className="card shadow-sm border-0">

                        <div className="card-body">

                            <h6 className="text-muted">
                                Customers
                            </h6>

                            <h2>
                                4580
                            </h2>

                        </div>

                    </div>

                </div>

            </div>

            {/* Actions */}

            <div className="row g-3 mb-4">

                <div className="col-md-3">

                    <div
                        className={`card shadow-sm border-0 h-100 action-card ${
                            activeTab === "add"
                                ? "border-primary"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("add")
                        }
                        style={{
                            cursor: "pointer"
                        }}
                    >

                        <div className="card-body text-center">

                            <h5>
                                Add Branch
                            </h5>

                            <p className="text-muted mb-0">
                                Create a new branch
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className={`card shadow-sm border-0 h-100 action-card ${
                            activeTab === "update"
                                ? "border-warning"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("update")
                        }
                        style={{
                            cursor: "pointer"
                        }}
                    >

                        <div className="card-body text-center">

                            <h5>
                                Update Branch
                            </h5>

                            <p className="text-muted mb-0">
                                Modify branch details
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className={`card shadow-sm border-0 h-100 action-card ${
                            activeTab === "delete"
                                ? "border-danger"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("delete")
                        }
                        style={{
                            cursor: "pointer"
                        }}
                    >

                        <div className="card-body text-center">

                            <h5>
                                Delete Branch
                            </h5>

                            <p className="text-muted mb-0">
                                Remove a branch
                            </p>

                        </div>

                    </div>

                </div>

                <div className="col-md-3">

                    <div
                        className={`card shadow-sm border-0 h-100 action-card ${
                            activeTab === "view"
                                ? "border-dark"
                                : ""
                        }`}
                        onClick={() =>
                            setActiveTab("view")
                        }
                        style={{
                            cursor: "pointer"
                        }}
                    >

                        <div className="card-body text-center">

                            <h5>
                                View Branches
                            </h5>

                            <p className="text-muted mb-0">
                                Browse all branches
                            </p>

                        </div>

                    </div>

                </div>

            </div>

            {/* Component Section */}

            <div className="mt-4">

                {
                    activeTab === "add"
                    &&
                    <AddBranch />
                }

                {
                    activeTab === "update"
                    &&
                    <UpdateBranch />
                }

                {
                    activeTab === "delete"
                    &&
                    <DeleteBranch />
                }

                {
                    activeTab === "view"
                    &&
                    <ViewBranches />
                }

            </div>

        </div>
        </AdminLayout>
    );
};

export default BranchAdminDashboard;