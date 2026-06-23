import AdminLayout from "../layouts/AdminLayout";
import { useNavigate } from "react-router-dom";
import "../assets/css/admin.css";

function AdminDashboard() {

    const navigate = useNavigate();

    return (

        <AdminLayout>

            {/* Header */}

            <div className="dashboard-header">
                <p>
                    Maverics Bank Administration Portal
                </p>

            </div>

            {/* Management Modules */}

            <h2 className="section-title">
                Management Modules
            </h2>

            <div className="modules-grid">

                <div
                    className="module-card"
                    onClick={() =>
                        navigate("/admin/employees")
                    }
                >
                    <h3>
                        Employee Management
                    </h3>

                    <p>
                        Add, update, remove employees.
                    </p>
                </div>

                <div
                    className="module-card"
                    onClick={() =>
                        navigate("/admin/customers")
                    }
                >
                    <h3>
                        Customer Management
                    </h3>

                    <p>
                        View and manage customers.
                    </p>
                </div>

                <div
                    className="module-card"
                    onClick={() =>
                        navigate("/admin/loans")
                    }
                >
                    <h3>
                        Loan Management
                    </h3>

                    <p>
                        Review loan applications.
                    </p>
                </div>

                <div
                    className="module-card"
                    onClick={() =>
                        navigate("/admin/branches")
                    }
                >
                    <h3>
                        Branch Management
                    </h3>

                    <p>
                        Manage bank branches.
                    </p>
                </div>

                <div
                    className="module-card"
                    onClick={() =>
                        navigate("/admin/accounts")
                    }
                >
                    <h3>
                        Account Management
                    </h3>

                    <p>
                        Manage customer accounts.
                    </p>
                </div>

                <div
                    className="module-card"
                    onClick={() =>
                        navigate("/admin/reports")
                    }
                >
                    <h3>
                        Reports & Analytics
                    </h3>

                    <p>
                        View system reports and insights.
                    </p>
                </div>

            </div>

        </AdminLayout>
    );
}

export default AdminDashboard;