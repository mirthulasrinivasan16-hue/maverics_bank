import EmployeeLayout from "../layouts/EmployeeLayout";
import { useNavigate } from "react-router-dom";

const EmployeeDashboard = () => {

    const navigate =
        useNavigate();

    return (

        <EmployeeLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Employee Dashboard
                </h2>

                <div className="row g-4">

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card shadow-sm text-center p-4 h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate(
                                    "/employee/customers"
                                )
                            }
                        >

                            <h5>
                                Customer Management
                            </h5>

                            <p className="text-muted">

                                View, Search & Update Customers

                            </p>

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card shadow-sm text-center p-4 h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate(
                                    "/employee/accounts"
                                )
                            }
                        >

                            <h5>
                                Account Management
                            </h5>

                            <p className="text-muted">

                                Review Account Requests

                            </p>

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card shadow-sm text-center p-4 h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate(
                                    "/employee/loans"
                                )
                            }
                        >

                            <h5>
                                Loan Management
                            </h5>

                            <p className="text-muted">

                                Review Loan Requests

                            </p>

                        </div>

                    </div>

                    <div className="col-md-6 col-lg-3">

                        <div
                            className="card shadow-sm text-center p-4 h-100"
                            style={{
                                cursor: "pointer"
                            }}
                            onClick={() =>
                                navigate(
                                    "/employee/branches"
                                )
                            }
                        >

                            <h5>
                                Branch Information
                            </h5>

                            <p className="text-muted">

                                View Branch Details

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </EmployeeLayout>
    );
};

export default EmployeeDashboard;