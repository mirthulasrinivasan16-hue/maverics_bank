import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import ViewCustomers from "../components/customer/ViewCustomers";
import UpdateCustomer from "../components/customer/UpdateCustomer";
import DeleteCustomer from "../components/customer/DeleteCustomer";

const CustomerAdminDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

        <AdminLayout>

            <div className="container-fluid p-4">

                {/* Header */}

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Customer Management
                    </h2>

                    <p className="text-muted">
                        Manage customer records, profiles and account holders.
                    </p>

                </div>

                {/* Statistics */}

                <div className="row mb-4">

                    <div className="col-md-4">

                        <div className="card shadow-sm border-0">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Customers
                                </h6>

                                <h2>
                                    4580
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow-sm border-0">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Profile Completed
                                </h6>

                                <h2>
                                    4300
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div className="card shadow-sm border-0">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Pending Profiles
                                </h6>

                                <h2>
                                    280
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Action Cards */}

                <div className="row g-3 mb-4">

                    <div className="col-md-4">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("view")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    View Customers
                                </h5>

                                <p className="text-muted mb-0">
                                    Browse all customers
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("update")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    Update Customer
                                </h5>

                                <p className="text-muted mb-0">
                                    Modify customer details
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("delete")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    Delete Customer
                                </h5>

                                <p className="text-muted mb-0">
                                    Remove customer record
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Components */}

                {
                    activeTab === "view"
                    &&
                    <ViewCustomers />
                }

                {
                    activeTab === "update"
                    &&
                    <UpdateCustomer />
                }

                {
                    activeTab === "delete"
                    &&
                    <DeleteCustomer />
                }

            </div>

        </AdminLayout>

    );
};

export default CustomerAdminDashboard;