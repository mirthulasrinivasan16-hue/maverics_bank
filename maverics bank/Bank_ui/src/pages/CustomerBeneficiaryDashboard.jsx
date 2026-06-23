import CustomerLayout from "../layouts/CustomerLayout";

import AddBeneficiary from "../components/customerBeneficiary/AddBeneficiary";

import ViewBeneficiaries from "../components/customerBeneficiary/ViewBeneficiaries";

const CustomerBeneficiaryDashboard = () => {

    return (

        <CustomerLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Beneficiary Management
                </h2>

                <div className="row">

                    <div className="col-lg-4">

                        <AddBeneficiary />

                    </div>

                    <div className="col-lg-8">

                        <ViewBeneficiaries />

                    </div>

                </div>

            </div>

        </CustomerLayout>
    );
};

export default CustomerBeneficiaryDashboard;