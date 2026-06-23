import { useState } from "react";

import EmployeeLayout from "../layouts/EmployeeLayout";

import ViewCustomers from "../components/customer/ViewCustomers";
import UpdateCustomer from "../components/customer/UpdateCustomer";

const EmployeeCustomerDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

       <EmployeeLayout>

    <div className="container-fluid">

        <h2 className="mb-4">
            Customer Management
        </h2>

        <ViewCustomers />

    </div>

</EmployeeLayout>
    );
};

export default EmployeeCustomerDashboard;