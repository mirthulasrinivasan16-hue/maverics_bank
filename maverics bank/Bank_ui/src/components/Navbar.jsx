import { Link } from "react-router-dom";

const Navbar = () => {

    return (

        <nav
            className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">

            <div className="container">

                <Link
                    to="/"
                    className="navbar-brand fw-bold">

                    🏦 Banking System

                </Link>

            </div>

        </nav>

    );
};

export default Navbar;