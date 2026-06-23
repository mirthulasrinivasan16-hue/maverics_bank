import CustomerSidebar from "../components/CustomerSidebar";
import Topbar from "../components/Topbar";

function CustomerLayout({ children }) {

    return (

        <div className="layout">

            <CustomerSidebar />

            <div className="main-content">

                <Topbar />

                {children}

            </div>

        </div>
    );
}

export default CustomerLayout;