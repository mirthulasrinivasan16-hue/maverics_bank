import { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTransactions = () => {

    const [transactions,setTransactions] =
        useState([]);

    const fetchTransactions =
        async () => {

            const userId =
                localStorage.getItem(
                    "userId"
                );

            const response =
                await axios.get(

                    `http://localhost:8080/api/transaction/employee/${userId}`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            setTransactions(
                response.data
            );
        };

    useEffect(() => {

        fetchTransactions();

    }, []);

    return (

        <div className="card p-4">

            <h4>
                Branch Transactions
            </h4>

            <table className="table table-bordered">

                <thead>

                <tr>

                    <th>Reference</th>
                    <th>Customer</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>

                </tr>

                </thead>

                <tbody>

                {
                    transactions.map(txn => (

                        <tr key={txn.id}>

                            <td>
                                {txn.referenceNumber}
                            </td>

                            <td>
                                {txn.customerName}
                            </td>

                            <td>
                                {txn.transactionType}
                            </td>

                            <td>
                                ₹{txn.amount}
                            </td>

                            <td>
                                {txn.status}
                            </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>

        </div>
    );
};

export default EmployeeTransactions;