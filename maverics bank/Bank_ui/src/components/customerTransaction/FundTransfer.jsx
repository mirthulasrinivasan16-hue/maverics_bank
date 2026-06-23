import { useEffect,useState } from "react";
import axios from "axios";

const FundTransfer = () => {

    const [accounts,setAccounts] =
        useState([]);

    const [beneficiaries,setBeneficiaries] =
        useState([]);

    const [fromAccount,setFromAccount] =
        useState("");

    const [toAccount,setToAccount] =
        useState("");

    const [amount,setAmount] =
        useState("");

    useEffect(() => {

        fetchData();

    }, []);

    const fetchData =
        async () => {

            const customerId =
                localStorage.getItem(
                    "customerId"
                );

            const headers = {

                Authorization:
                    `Bearer ${localStorage.getItem("token")}`
            };

            const accountResponse =
                await axios.get(

                    `http://localhost:8080/api/account/customer/${customerId}/active`,

                    { headers }
                );

            const beneficiaryResponse =
                await axios.get(

                    `http://localhost:8080/api/beneficiary/customer/${customerId}`,

                    { headers }
                );

            setAccounts(
                accountResponse.data
            );

            setBeneficiaries(
                beneficiaryResponse.data
            );
        };

    const transfer =
        async (e) => {

            e.preventDefault();

            await axios.post(

                "http://localhost:8080/api/transaction/transfer",

                {
                    fromAccount,
                    toAccount,
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
                "Transfer Successful"
            );
        };

    return (

        <div className="card p-4">

            <h4>
                Fund Transfer
            </h4>

            <form onSubmit={transfer}>

                <select
                    className="form-select mb-3"
                    value={fromAccount}
                    onChange={(e)=>
                        setFromAccount(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select My Account
                    </option>

                    {
                        accounts.map(account => (

                            <option
                                key={account.id}
                                value={account.accountNumber}
                            >

                                {account.accountNumber}
                                {" | ₹"}
                                {account.balance}

                            </option>
                        ))
                    }

                </select>

                <select
                    className="form-select mb-3"
                    value={toAccount}
                    onChange={(e)=>
                        setToAccount(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Beneficiary
                    </option>

                    {
                        beneficiaries.map(
                            beneficiary => (

                            <option
                                key={beneficiary.id}
                                value={beneficiary.accountNumber}
                            >

                                {beneficiary.nickname}
                                {" - "}
                                {beneficiary.beneficiaryName}

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
                    className="btn btn-primary"
                >
                    Transfer
                </button>

            </form>

        </div>
    );
};

export default FundTransfer;