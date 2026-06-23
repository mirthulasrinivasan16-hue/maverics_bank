import { Link } from "react-router-dom";

const CustomerSidebar = () => {

    return (

        <div className="sidebar">

            <h3 className="sidebar-title">
                Customer Panel
            </h3>

            <ul className="sidebar-menu">

                <li>
                    <Link to="/customer">
                        Dashboard
                    </Link>
                </li>

                <li>
                    <Link to="/customer/profile">
                        My Profile
                    </Link>
                </li>

                <li>
                    <Link to="/customer/accounts">
                        My Accounts
                    </Link>
                </li>

                <li>
                    <Link to="/customer/loans">
                        My Loans
                    </Link>
                </li>

                <li>
                    <Link to="/customer/branches">
                        Branch Information
                    </Link>
                </li>

                <li>
                    <Link to="/customer/beneficiaries">
                        Beneficiary Management
                    </Link>
                </li>

                <li>
                    <Link to="/customer/transactions">
                        Transactions
                    </Link>
                </li>

            </ul>

        </div>
    );
};

export default CustomerSidebar;