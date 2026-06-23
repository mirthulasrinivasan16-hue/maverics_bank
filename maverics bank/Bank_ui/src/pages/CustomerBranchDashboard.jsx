import CustomerLayout from "../layouts/CustomerLayout";
import CustomerBranchView from "../components/branch/CustomerBranchView";

const CustomerBranchDashboard = () => {

    return (

        <CustomerLayout>

            <div className="container-fluid p-4">

                <h2 className="mb-4">
                    Branch Information
                </h2>

                <CustomerBranchView />

            </div>

        </CustomerLayout>
    );
};

export default CustomerBranchDashboard;