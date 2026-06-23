import { useState } from "react";
import AdminLayout from "../layouts/AdminLayout";

import AddEmployee from "../components/employee/AddEmployee";
import UpdateEmployee from "../components/employee/UpdateEmployee";
import DeleteEmployee from "../components/employee/DeleteEmployee";
import AssignEmployeeBranch from "../components/employee/AssignEmployeeBranch";
import ViewEmployees from "../components/employee/ViewEmployees";

const EmployeeAdminDashboard = () => {

    const [activeTab, setActiveTab] =
    useState("view");

    const [selectedEmployeeId,setSelectedEmployeeId] =
    useState(null);

    return (

        <AdminLayout>

            <div className="container-fluid p-4">

                {/* Header */}

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Employee Management
                    </h2>

                    <p className="text-muted">
                        Manage employees, branch assignments and employee records.
                    </p>

                </div>

                {/* Statistics */}

                <div className="row mb-4">

                    <div className="col-md-3">

                        <div className="card shadow-sm border-0">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Total Employees
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
                                    Active Employees
                                </h6>

                                <h2>
                                    228
                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card shadow-sm border-0">

                            <div className="card-body">

                                <h6 className="text-muted">
                                    Branch Managers
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
                                    Assigned Branches
                                </h6>

                                <h2>
                                    10
                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Action Cards */}

                <div className="row g-3 mb-4">

                    <div className="col-md-2">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("add")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    Add Employee
                                </h5>

                                <p className="text-muted">
                                    Create employee
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-2">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("update")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    Update Employee
                                </h5>

                                <p className="text-muted">
                                    Edit details
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-2">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("delete")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    Delete Employee
                                </h5>

                                <p className="text-muted">
                                    Remove employee
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("assign")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    Assign Branch
                                </h5>

                                <p className="text-muted">
                                    Link employee to branch
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div
                            className="card shadow-sm border-0 action-card"
                            onClick={() =>
                                setActiveTab("view")
                            }
                        >

                            <div className="card-body text-center">

                                <h5>
                                    View Employees
                                </h5>

                                <p className="text-muted">
                                    Browse all employees
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Components */}

                {
                    activeTab === "add"
                    &&
                    <AddEmployee />
                }

                {
                    activeTab === "update"
                    &&
                    <UpdateEmployee
                        employeeId={
                            selectedEmployeeId
                        }
                    />
                }

                {
                    activeTab === "delete"
                    &&
                    <DeleteEmployee
                        employeeId={
                            selectedEmployeeId
                        }
                    />
                }
                {
                    activeTab === "assign"
                    &&
                    <AssignEmployeeBranch
                        employeeId={
                            selectedEmployeeId
                        }
                    />
                }

                {
                    activeTab === "view"
                    &&
                    <ViewEmployees
                        setActiveTab={setActiveTab}
                        setSelectedEmployeeId={
                            setSelectedEmployeeId
                        }
/>
                }

            </div>

        </AdminLayout>

    );
};

export default EmployeeAdminDashboard;