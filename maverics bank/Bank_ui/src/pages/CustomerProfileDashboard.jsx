import CustomerLayout from "../layouts/CustomerLayout";

import ViewProfile from "../components/customerProfile/ViewProfile";
import UpdateProfile from "../components/customerProfile/UpdateProfile";

const CustomerProfileDashboard = () => {

    return (

        <CustomerLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    My Profile
                </h2>

                <ViewProfile />

                <div className="mt-4">

                    <UpdateProfile />

                </div>

            </div>

        </CustomerLayout>
    );
};

export default CustomerProfileDashboard;