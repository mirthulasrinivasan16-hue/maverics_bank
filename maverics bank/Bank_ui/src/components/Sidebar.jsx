import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <div className="sidebar">

            <ul>

                <li>
                    <NavLink to="/admin">
                        Dashboard
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/employees">
                        Employee Management
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/customers">
                        Customer Management
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/branches">
                        Branch Management
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/loans">
                        Loan Management
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/accounts">
                        Account Management
                    </NavLink>
                </li>

                <li>
                    <NavLink to="/admin/transactions">
                        Transaction Management
                    </NavLink>
                </li>

            </ul>

        </div>

    );
}

export default Sidebar;