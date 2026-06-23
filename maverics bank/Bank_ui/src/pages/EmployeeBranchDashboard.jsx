import EmployeeLayout from "../layouts/EmployeeLayout";
import EmployeeBranchView from "../components/branch/EmployeeBranchView";

const EmployeeBranchDashboard = () => {

    return (

        <EmployeeLayout>

            <div className="container-fluid p-4">

                <h2 className="mb-4">
                    Branch Information
                </h2>

                <EmployeeBranchView />

            </div>

        </EmployeeLayout>
    );
};

export default EmployeeBranchDashboard;