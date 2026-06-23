import EmployeeSidebar from "../components/EmployeeSidebar";
import Topbar from "../components/Topbar";

function EmployeeLayout({ children }) {

    return (

        <div className="layout">

            <EmployeeSidebar />

            <div className="main-content">

                <Topbar />

                {children}

            </div>

        </div>

    );
}

export default EmployeeLayout;