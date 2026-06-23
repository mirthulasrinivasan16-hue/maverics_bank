import { useState } from "react";

import CustomerLayout from "../layouts/CustomerLayout";

import ApplyAccount from "../components/customerAccount/ApplyAccount";
import ViewMyAccounts from "../components/customerAccount/ViewMyAccounts";
import RequestAccountClosure from "../components/customerAccount/RequestAccountClosure";

const CustomerAccountDashboard = () => {

    const [activeTab, setActiveTab] =
        useState("view");

    return (

<CustomerLayout>

    <div className="container-fluid">

        <h2 className="mb-4">
            My Accounts
        </h2>

        <ApplyAccount />

        <br />

        <ViewMyAccounts />

    </div>

</CustomerLayout>
    );
};

export default CustomerAccountDashboard;