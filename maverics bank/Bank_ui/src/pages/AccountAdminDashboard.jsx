import AdminLayout from "../layouts/AdminLayout";
import ViewAccounts from "../components/accounts/ViewAccounts";

const AccountAdminDashboard = () => {

    return (

        <AdminLayout>

            <div className="container-fluid p-4">

                <div className="mb-4">

                    <h2 className="fw-bold">
                        Account Management
                    </h2>

                    <p className="text-muted">
                        Manage account approvals, rejections and closures.
                    </p>

                </div>

                <ViewAccounts />

            </div>

        </AdminLayout>

    );
};

export default AccountAdminDashboard;