import { useState } from "react";
import axios from "axios";

const CloseAccount = () => {

    const [accountId,setAccountId] =
        useState("");

    const userId =
    localStorage.getItem("userId");      

    const closeAccount =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/account/close/${accountId}?userId=${userId}`,

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
            }
            catch(error){

                alert(
                    "Close Failed"
                );
            }
        };

    return(

        <div className="card p-4">

            <h4>
                Close Account
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
                className="btn btn-danger"
                onClick={closeAccount}
            >
                Close Account
            </button>

        </div>
    );
};

export default CloseAccount;