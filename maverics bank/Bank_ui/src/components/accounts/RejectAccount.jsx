import { useState } from "react";
import axios from "axios";

const RejectAccount = () => {

    const [accountId,setAccountId] =
        useState("");

    const [reason,setReason] =
        useState("");

    const userId =
    localStorage.getItem("userId");      

    const rejectAccount =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/account/reject/${accountId}?userId=${userId}`,

                    {
                        reason
                    },

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
            }
            catch(error){

                alert(
                    "Rejection Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4>
                Reject Account
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

            <textarea
                className="form-control mb-3"
                placeholder="Reason"
                value={reason}
                onChange={(e)=>
                    setReason(e.target.value)
                }
            />

            <button
                className="btn btn-warning"
                onClick={rejectAccount}
            >
                Reject
            </button>

        </div>
    );
};

export default RejectAccount;