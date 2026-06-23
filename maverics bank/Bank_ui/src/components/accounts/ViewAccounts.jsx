import { useEffect, useState } from "react";
import axios from "axios";

const ViewAccounts = () => {

    const [accounts, setAccounts] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [search, setSearch] =
        useState("");

    const size = 5;

    const role =
        localStorage.getItem("role");

    const userId =
        localStorage.getItem("userId");

    const apiUrl =

        role === "EMPLOYEE"

        ? `http://localhost:8080/api/account/employee/${userId}/v2?page=${page}&size=${size}`

        : `http://localhost:8080/api/account/all/v2?page=${page}&size=${size}`;

    const fetchAccounts =
        async () => {

            try {

                const response =
                    await axios.get(

                        apiUrl,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setAccounts(
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

        fetchAccounts();

    }, [page]);

    const approveAccount =
        async (id) => {

            try {

                await axios.put(

                    `http://localhost:8080/api/account/approve/${id}?userId=${userId}`,

                    {},

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Account Approved"
                );

                fetchAccounts();
            }
            catch(error){

                console.log(error);

                alert(
                    "Approval Failed"
                );
            }
        };

    const rejectAccount =
        async (id) => {

            const reason =
                prompt(
                    "Enter rejection reason"
                );

            if(!reason)
                return;

            try {

                await axios.put(

                    `http://localhost:8080/api/account/reject/${id}?userId=${userId}&reason=${reason}`,

                    {},

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Account Rejected"
                );

                fetchAccounts();
            }
            catch(error){

                console.log(error);

                alert(
                    "Reject Failed"
                );
            }
        };

    const closeAccount =
        async (id) => {

            try {

                await axios.put(

                    `http://localhost:8080/api/account/close/${id}?userId=${userId}`,

                    {},

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Account Closed"
                );

                fetchAccounts();
            }
            catch(error){

                console.log(error);

                alert(
                    "Close Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4 className="mb-3">
                Account List
            </h4>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search Customer Name"
                value={search}
                onChange={(e)=>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <table className="table table-bordered table-hover">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Account Number</th>

                    <th>Customer</th>

                    <th>Branch</th>

                    <th>Type</th>

                    <th>Balance</th>

                    <th>Status</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    accounts
                    .filter(account =>
                        account.customerName
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                    )
                    .map(account => (

                        <tr key={account.id}>

                            <td>
                                {account.id}
                            </td>

                            <td>
                                {
                                    account.accountNumber
                                    || "Pending"
                                }
                            </td>

                            <td>
                                {account.customerName}
                            </td>

                            <td>
                                {account.branchName}
                            </td>

                            <td>
                                {account.accountType}
                            </td>

                            <td>
                                ₹{account.balance}
                            </td>

                            <td>
                                {account.status}
                            </td>

                            <td>

                                {
                                    account.status === "PENDING"
                                    &&

                                    <>

                                        <button
                                            className="btn btn-success btn-sm me-2"
                                            onClick={() =>
                                                approveAccount(
                                                    account.id
                                                )
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                rejectAccount(
                                                    account.id
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                    </>
                                }

                                {
                                    account.status === "CLOSURE_REQUESTED"
                                    &&

                                    <button
                                        className="btn btn-warning btn-sm"
                                        onClick={() =>
                                            closeAccount(
                                                account.id
                                            )
                                        }
                                    >
                                        Close
                                    </button>
                                }

                                {
                                    account.status === "ACTIVE"
                                    &&

                                    <span
                                        className="badge bg-success"
                                    >
                                        Active
                                    </span>
                                }

                                {
                                    account.status === "REJECTED"
                                    &&

                                    <span
                                        className="badge bg-danger"
                                    >
                                        Rejected
                                    </span>
                                }

                                {
                                    account.status === "CLOSED"
                                    &&

                                    <span
                                        className="badge bg-secondary"
                                    >
                                        Closed
                                    </span>
                                }

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

            <div className="d-flex justify-content-between align-items-center">

                <button
                    className="btn btn-secondary"
                    disabled={page === 0}
                    onClick={() =>
                        setPage(page - 1)
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
                        setPage(page + 1)
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default ViewAccounts;