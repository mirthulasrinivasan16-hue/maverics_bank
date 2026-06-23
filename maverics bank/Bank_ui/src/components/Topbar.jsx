import { useNavigate } from "react-router-dom";

function Topbar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.clear();

        navigate("/");
    };

    return (

        <div
            className="d-flex justify-content-end align-items-center px-4 py-3 bg-white shadow-sm"
        >

            <div className="d-flex align-items-center gap-3">

                <span className="fw-bold">
                    {localStorage.getItem("role")}
                </span>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                >
                    Logout
                </button>

            </div>

        </div>

    );
}

export default Topbar;