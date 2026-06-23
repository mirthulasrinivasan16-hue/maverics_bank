import { useState } from "react";
import axios from "axios";

const ApproveAccount = () => {

    const [accountId,setAccountId] =
        useState("");

    const userId =
    localStorage.getItem("userId");    

    const approveAccount =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/account/approve/${accountId}?userId=${userId}`,

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
            }
            catch(error){

                alert(
                    "Approval Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4>
                Approve Account
            </h4>

            <input
                type="number"
                className="form-control mb-3"
                placeholder="Account Id"
                value={accountId}
                onChange={(e)=>
                    setAccountId(e.target.value)
                }
            />

            <button
                className="btn btn-success"
                onClick={approveAccount}
            >
                Approve
            </button>

        </div>
    );
};

export default ApproveAccount;