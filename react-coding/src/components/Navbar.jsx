import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
            <div className="container-fluid">

                <Link className="navbar-brand fs-2 me-4" to="/"> User Management App </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav">

                        <li className="nav-item">
                            <Link className="nav-link active fs-4" to="/">  Home  </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fs-4" to="/users">User List </Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link fs-4" to="/add-user"> Add User  </Link>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;