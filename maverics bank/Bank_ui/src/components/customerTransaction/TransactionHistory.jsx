import { useEffect, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {

    const [transactions, setTransactions] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [type, setType] =
        useState("");

    const [status, setStatus] =
        useState("");

    const size = 5;

    const fetchTransactions =
        async () => {

            try {

                const customerId =
                    localStorage.getItem(
                        "customerId"
                    );

                let url =
                    `http://localhost:8080/api/transaction/customer/${customerId}/v2?page=${page}&size=${size}`;

                if(type){

                    url += `&type=${type}`;
                }

                if(status){

                    url += `&status=${status}`;
                }

                const response =
                    await axios.get(
                        url,
                        {
                            headers:{
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setTransactions(
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

        fetchTransactions();

    }, [page, type, status]);

    return (

        <div className="card p-4">

            <h4 className="mb-4">
                Transaction History
            </h4>

            <div className="row mb-3">

                <div className="col-md-6">

                    <label>
                        Transaction Type
                    </label>

                    <select
                        className="form-select"
                        value={type}
                        onChange={(e) => {

                            setPage(0);

                            setType(
                                e.target.value
                            );
                        }}
                    >

                        <option value="">
                            All
                        </option>

                        <option value="DEPOSIT">
                            Deposit
                        </option>

                        <option value="WITHDRAW">
                            Withdraw
                        </option>

                        <option value="TRANSFER">
                            Transfer
                        </option>

                    </select>

                </div>

                <div className="col-md-6">

                    <label>
                        Status
                    </label>

                    <select
                        className="form-select"
                        value={status}
                        onChange={(e) => {

                            setPage(0);

                            setStatus(
                                e.target.value
                            );
                        }}
                    >

                        <option value="">
                            All
                        </option>

                        <option value="SUCCESS">
                            Success
                        </option>

                        <option value="FAILED">
                            Failed
                        </option>

                        <option value="PENDING">
                            Pending
                        </option>

                    </select>

                </div>

            </div>

            <table className="table table-bordered">

                <thead>

                <tr>

                    <th>
                        Ref No
                    </th>

                    <th>
                        Type
                    </th>

                    <th>
                        From Account
                    </th>

                    <th>
                        To Account
                    </th>

                    <th>
                        Amount
                    </th>

                    <th>
                        Status
                    </th>

                    <th>
                        Date
                    </th>

                </tr>

                </thead>

                <tbody>

                {
                    transactions.length > 0 ?

                        transactions.map(txn => (

                            <tr key={txn.id}>

                                <td>
                                    {txn.referenceNumber}
                                </td>

                                <td>
                                    {txn.transactionType}
                                </td>

                                <td>
                                    {txn.fromAccount}
                                </td>

                                <td>
                                    {txn.toAccount}
                                </td>

                                <td>
                                    ₹{txn.amount}
                                </td>

                                <td>
                                    {txn.status}
                                </td>

                                <td>
                                    {
                                        txn.transactionDate
                                            ?.replace("T"," ")
                                    }
                                </td>

                            </tr>

                        ))

                        :

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center"
                            >

                                No Transactions Found

                            </td>

                        </tr>
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

                    Page {page + 1}
                    {" "}of{" "}
                    {totalPages || 1}

                </span>

                <button
                    className="btn btn-secondary"
                    disabled={
                        page + 1 >= totalPages
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

export default TransactionHistory;