import { useState } from "react";
import axios from "axios";

const SearchAccount = () => {

    const [accountNumber, setAccountNumber] =
        useState("");

    const [account, setAccount] =
        useState(null);

    const searchAccount =
        async () => {

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/account/account-number/${accountNumber}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setAccount(response.data);

            }
            catch(error){

                alert("Account Not Found");
            }
        };

    return(

        <div className="card p-4">

            <h4>Search Account</h4>

            <div className="row">

                <div className="col-md-8">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Account Number"
                        value={accountNumber}
                        onChange={(e)=>
                            setAccountNumber(e.target.value)
                        }
                    />

                </div>

                <div className="col-md-4">

                    <button
                        className="btn btn-primary w-100"
                        onClick={searchAccount}
                    >
                        Search
                    </button>

                </div>

            </div>

            {
                account &&
                <div className="mt-4">

                    <h5>Account Details</h5>

                    <p><b>Customer:</b> {account.customerName}</p>

                    <p><b>Branch:</b> {account.branchName}</p>

                    <p><b>Type:</b> {account.accountType}</p>

                    <p><b>Status:</b> {account.status}</p>

                    <p><b>Balance:</b> ₹{account.balance}</p>

                </div>
            }

        </div>
    );
};

export default SearchAccount;