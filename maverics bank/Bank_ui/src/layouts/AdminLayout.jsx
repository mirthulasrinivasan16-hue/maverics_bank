import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function AdminLayout({children}) {

    return (

        <div className="layout">

            <Sidebar />

            <div className="main-content">

                <Topbar />

                {children}

            </div>

        </div>

    );
}

export default AdminLayout;