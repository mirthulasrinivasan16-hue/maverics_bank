import { useEffect, useState } from "react";
import axios from "axios";

const ViewMyAccounts = () => {

    const [accounts, setAccounts] =
        useState([]);

    const fetchAccounts =
        async () => {

            try {

                const customerId =
                    localStorage.getItem(
                        "customerId"
                    );

                const response =
                    await axios.get(
                        `http://localhost:8080/api/account/customer/${customerId}`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setAccounts(
                    response.data
                );

            }
            catch(error){

                console.log(error);
            }
        };

    useEffect(() => {

        fetchAccounts();

    }, []);

    return (

        <div className="card p-4">

            <h4>
                My Accounts
            </h4>

            <table className="table table-bordered">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>
                        Account Number
                    </th>

                    <th>
                        Type
                    </th>

                    <th>
                        Balance
                    </th>

                    <th>
                        Status
                    </th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    accounts.map(account => (

                        <tr
                            key={account.id}
                        >

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
                            account.status === "ACTIVE"
                            &&

                            <button
                                className="btn btn-danger btn-sm"
                            >
                                Request Closure
                            </button>
                            }

                            </td>

                        </tr>

                    ))
                }

                </tbody>

            </table>

        </div>
    );
};

export default ViewMyAccounts;