import { Link } from "react-router-dom";

function EmployeeSidebar() {

    return (

        <div className="sidebar">

            <h3 className="sidebar-title">
                Employee Panel
            </h3>

            <ul className="sidebar-menu">

                <li>
                    <Link to="/employee">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/employee/customers">
                        Customer Management
                    </Link>
                </li>

                <li>
                    <Link to="/employee/accounts">
                        Account Management
                    </Link>
                </li>

                <li>
                    <Link to="/employee/loans">
                        Loan Management
                    </Link>
                </li>

                <li>
                    <Link to="/employee/branches">
                        Branch Information
                    </Link>
                </li>

                <li>
                    <Link to="/employee/transactions">
                        Transaction Management
                    </Link>
                </li>

            </ul>

        </div>

    );
}

export default EmployeeSidebar;