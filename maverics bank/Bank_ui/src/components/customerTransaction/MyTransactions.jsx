import { useEffect,useState } from "react";
import axios from "axios";

const MyTransactions = () => {

    const [transactions,setTransactions] =
        useState([]);

    const [search,setSearch] =
        useState("");

    const fetchTransactions =
        async () => {

            try{

                const customerId =
                    localStorage.getItem(
                        "customerId"
                    );

                const response =
                    await axios.get(

                        `http://localhost:8080/api/transaction/customer/${customerId}`,

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
            }
            catch(error){

                console.log(error);
            }
        };

    useEffect(() => {

        fetchTransactions();

    }, []);

    return(

        <div className="card p-4">

            <h4>
                Transaction History
            </h4>

            <input
                className="form-control mb-3"
                placeholder="Search Reference Number"
                value={search}
                onChange={(e)=>
                    setSearch(
                        e.target.value
                    )
                }
            />

            <table className="table table-bordered">

                <thead>

                <tr>

                    <th>Reference</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>

                </tr>

                </thead>

                <tbody>

                {
                    transactions

                    .filter(txn =>
                        txn.referenceNumber
                            ?.toLowerCase()
                            .includes(
                                search.toLowerCase()
                            )
                    )

                    .map(txn => (

                        <tr key={txn.id}>

                            <td>
                                {txn.referenceNumber}
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

                            <td>
                                {
                                    txn.transactionDate
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

export default MyTransactions;