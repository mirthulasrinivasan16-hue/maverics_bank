import { useEffect, useState } from "react";
import axios from "axios";
import UpdateCustomer from "./UpdateCustomer";

const ViewCustomers = () => {

    const [customers, setCustomers] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(1);

    const [customerId, setCustomerId] =
        useState("");

    const [customerName, setCustomerName] =
        useState("");

   const [showUpdate,setShowUpdate] =
    useState(false);

const [selectedCustomer,setSelectedCustomer] =
    useState(null); 

    const size = 5;

    const token =
        localStorage.getItem("token");

    const role =
    localStorage.getItem("role");

const userId =
    localStorage.getItem("userId");  
    
    const apiUrl =

    role === "EMPLOYEE"

    ? `http://localhost:8080/api/customer/employee/${userId}/v2?page=${page}&size=${size}`

    : `http://localhost:8080/api/customer/all/v2?page=${page}&size=${size}`;

const fetchCustomers = async () => {

    try {

        const userId =
            localStorage.getItem(
                "userId"
            );

        const response =
    await axios.get(
        apiUrl,
        {
            headers:{
                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            }
        }
    );

        setCustomers(
            response.data.data
        );

        setTotalPages(
            response.data.totalPages
        );
    }
    catch(error){

        console.log(error);
    }
};

    useEffect(() => {

        fetchCustomers();

    }, [page]);

    const searchById =
        async () => {

            if (!customerId) {

                alert(
                    "Enter Customer Id"
                );

                return;
            }

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/customer/get-one/${customerId}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setCustomers([
                    response.data
                ]);

                setTotalPages(1);

            }
            catch (error) {

                alert(
                    "Customer Not Found"
                );
            }
        };

    const searchByName =
        async () => {

            if (!customerName) {

                alert(
                    "Enter Customer Name"
                );

                return;
            }

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/customer/search/name/${customerName}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                setCustomers(
                    response.data
                );

                setTotalPages(1);

            }
            catch (error) {

                alert(
                    "No Customers Found"
                );
            }
        };

    const resetCustomers =
        () => {

            setCustomerId("");
            setCustomerName("");
            setPage(0);

            fetchCustomers();
        };

        const handleEdit =
    (customer) => {

        setSelectedCustomer(
            customer
        );

        setShowUpdate(
            true
        );
    };

    const handleDelete =
    async (id) => {

        if(
            !window.confirm(
                "Delete this customer?"
            )
        ){
            return;
        }

        try{

            await axios.delete(

                `http://localhost:8080/api/customer/delete/${id}`,

                {
                    headers:{
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

            alert(
                "Customer Deleted"
            );

            fetchCustomers();
        }
        catch(error){

            alert(
                "Delete Failed"
            );
        }
    };

    return (

        <div className="card p-4">

            <h4>
                Customer List
            </h4>

            <div className="row mb-4">

                <div className="col-md-4">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Customer Id"
                        value={customerId}
                        onChange={(e) =>
                            setCustomerId(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-primary w-100"
                        onClick={searchById}
                    >
                        Search Id
                    </button>

                </div>

                <div className="col-md-4">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Customer Name"
                        value={customerName}
                        onChange={(e) =>
                            setCustomerName(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-success w-100"
                        onClick={searchByName}
                    >
                        Search Name
                    </button>

                </div>

            </div>

            <div className="mb-3">

                <button
                    className="btn btn-secondary"
                    onClick={resetCustomers}
                >
                    Reset
                </button>

            </div>

            <h5>Total Customers: {customers.length}</h5>

            <table className="table table-bordered table-hover">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Name</th>

                    <th>Username</th>

                    <th>Phone</th>

                    <th>Branch</th>

                    <th>Profile Status</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    customers?.map((customer) => (

                        <tr key={customer.id}>

                            <td>
                                {customer.id}
                            </td>

                            <td>
                                {customer.customerName}
                            </td>

                            <td>
                                {customer.username}
                            </td>

                            <td>
                                {customer.phone}
                            </td>

                            <td>
                                {
                                    customer.branchName
                                        ? customer.branchName
                                        : "Not Assigned"
                                }
                            </td>

                            <td>

                                {
                                    customer.profileCompleted
                                        ?

                                        <span
                                            className="badge bg-success"
                                        >
                                            Completed
                                        </span>

                                        :

                                        <span
                                            className="badge bg-warning text-dark"
                                        >
                                            Pending
                                        </span>
                                }

                            </td>

                           <td>
                            <button
                                className="btn btn-warning btn-sm me-2"
                                onClick={() => handleEdit(customer)}
                            >
                                Edit
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(customer.id)}
                            >
                                Delete
                            </button>
                        </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>
            {
    showUpdate &&

    <UpdateCustomer
        customer={selectedCustomer}
        onClose={() =>
            setShowUpdate(false)
        }
        refreshCustomers={fetchCustomers}
    />
}

            <div className="d-flex justify-content-between align-items-center">

                <button
                    className="btn btn-secondary"
                    disabled={page === 0}
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                >
                    Previous
                </button>

                <span>

                    Page {page + 1} of {totalPages}

                </span>

                <button
                    className="btn btn-secondary"
                    disabled={
                        page + 1 === totalPages
                    }
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default ViewCustomers;