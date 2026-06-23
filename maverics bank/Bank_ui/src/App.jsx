import { Route, Routes } from "react-router-dom"

import Auth from "./pages/Auth"
import Signup from "./auth/Signup";
import CompleteProfile from "./auth/CompleteProfile";

import AdminDashboard from "./pages/AdminDashboard"
import EmployeeDashboard from "./pages/EmployeeDashboard"
import CustomerDashboard from "./pages/CustomerDashboard"
import EmployeeAdminDashboard from "./pages/EmployeeAdminDashboard"
import BranchAdminDashboard from "./pages/BranchAdminDashboard";
import CustomerAdminDashboard from "./pages/CustomerAdminDashboard";
import LoanAdminDashboard from "./pages/LoanAdminDashboard";
import LoanEmployeeDashboard from "./pages/LoanEmployeeDashboard";
import EmployeeCustomerDashboard from "./pages/EmployeeCustomerDashboard";
import EmployeeAccountDashboard from "./pages/EmployeeAccountDashboard";
import EmployeeBranchDashboard from "./pages/EmployeeBranchDashboard";
import AccountAdminDashboard from "./pages/AccountAdminDashboard";
import CustomerProfileDashboard from "./pages/CustomerProfileDashboard";
import CustomerLoanDashboard from "./pages/CustomerLoanDashboard";
import CustomerBranchDashboard from "./pages/CustomerBranchDashboard";
import CustomerAccountDashboard from "./pages/CustomerAccountDashboard";
import CustomerBeneficiaryDashboard from "./pages/CustomerBeneficiaryDashboard";
import CustomerTransactionDashboard from "./pages/CustomerTransactionDashboard";
import EmployeeTransactionDashboard from "./pages/EmployeeTransactionDashboard";
import AdminTransactionDashboard from "./pages/AdminTransactionDashboard";

import PageNotFound from "./pages/PageNotFound"

const App = ()=>{

    return(

        <div>

            <Routes>

                <Route
                    path="/"
                    element={<Auth />}>
                </Route>

                <Route
                    path="/admin"
                    element={<AdminDashboard />}>
                </Route>

                <Route
                    path="/employee"
                    element={<EmployeeDashboard />}>
                </Route>

                <Route
                    path="/customer"
                    element={<CustomerDashboard />}>
                </Route>

                <Route
                    path="*"
                    element={<PageNotFound />}>
                </Route>

                <Route
                    path="/admin/employees"
                    element={<EmployeeAdminDashboard />}/>

                <Route
                    path="/admin/customers"
                    element={<CustomerAdminDashboard />}/>

                <Route
                    path="/admin/branches"
                    element={<BranchAdminDashboard />}/>

                <Route
                    path="/admin/loans"
                    element={<LoanAdminDashboard />}/>

                <Route
                    path="/admin/accounts"
                    element={<AccountAdminDashboard />}/>

                <Route
                    path="/signup"
                     element={<Signup />}/>

                <Route
                    path="/complete-profile"
                    element={<CompleteProfile />}/>

                <Route
                    path="/employee/customers"
                    element={<EmployeeCustomerDashboard />}/>

                <Route
                    path="/employee/accounts"
                    element={<EmployeeAccountDashboard />}/>

                <Route
                    path="/employee/loans"
                    element={<LoanEmployeeDashboard />}/>

                <Route
                    path="/employee/branches"
                    element={<EmployeeBranchDashboard />}/>  

                <Route
                    path="/customer/accounts"
                    element={<CustomerAccountDashboard />}/>

                <Route
                    path="/customer/profile"
                    element={<CustomerProfileDashboard />}/> 

                <Route
                    path="/customer/loans"
                    element={<CustomerLoanDashboard />}/> 

                <Route
                    path="/customer/branches"
                    element={<CustomerBranchDashboard />}/>

                <Route
                    path="/customer/beneficiaries"
                    element={<CustomerBeneficiaryDashboard />}/>

                <Route
                    path="/customer/transactions"
                    element={<CustomerTransactionDashboard />}/>

                <Route
                    path="/employee/transactions"
                    element={<EmployeeTransactionDashboard />}/>

                <Route
                    path="/admin/transactions"
                    element={<AdminTransactionDashboard />}/>                            


            </Routes>

        </div>
    )
}

export default App