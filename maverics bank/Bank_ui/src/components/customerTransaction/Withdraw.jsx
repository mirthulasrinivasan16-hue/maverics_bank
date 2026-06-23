import { useEffect,useState } from "react";
import axios from "axios";

const Withdraw = () => {

    const [accounts,setAccounts] =
        useState([]);

    const [accountId,setAccountId] =
        useState("");

    const [amount,setAmount] =
        useState("");

    useEffect(() => {

        fetchAccounts();

    }, []);

    const fetchAccounts =
        async () => {

            const customerId =
                localStorage.getItem(
                    "customerId"
                );

            const response =
                await axios.get(

                    `http://localhost:8080/api/account/customer/${customerId}/active`,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            setAccounts(
                response.data
            );
        };

    const withdraw =
        async (e) => {

            e.preventDefault();

            await axios.post(

                "http://localhost:8080/api/transaction/withdraw",

                {
                    accountId,
                    amount
                },

                {
                    headers:{
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(
                "Withdrawal Successful"
            );
        };

    return (

        <div className="card p-4">

            <h4>
                Withdraw
            </h4>

            <form onSubmit={withdraw}>

                <select
                    className="form-select mb-3"
                    value={accountId}
                    onChange={(e)=>
                        setAccountId(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Account
                    </option>

                    {
                        accounts.map(account => (

                            <option
                                key={account.id}
                                value={account.id}
                            >

                                {account.accountNumber}
                                {" | ₹"}
                                {account.balance}

                            </option>
                        ))
                    }

                </select>

                <input
                    type="number"
                    className="form-control mb-3"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e)=>
                        setAmount(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-danger"
                >
                    Withdraw
                </button>

            </form>

        </div>
    );
};

export default Withdraw;