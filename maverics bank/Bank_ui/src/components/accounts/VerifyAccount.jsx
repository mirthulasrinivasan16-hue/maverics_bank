import { useState } from "react";
import axios from "axios";

const VerifyAccount = () => {

    const [accountId, setAccountId] =
        useState("");

    const verifyAccount = async () => {

        try {

            const userId =
                localStorage.getItem("userId");

            await axios.put(
                `http://localhost:8080/api/account/verify/${accountId}?userId=${userId}`,
                {},
                {
                    headers: {
                        Authorization:
                            `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            alert(
                "Account Verified Successfully"
            );

            setAccountId("");

        }
        catch(error){

            console.log(error);

            if(error.response){
                alert(error.response.data);
            }
            else{
                alert("Verification Failed");
            }
        }
    };

    return (

        <div className="card p-4">

            <h4>
                Verify Account
            </h4>

            <input
                type="number"
                className="form-control mb-3"
                placeholder="Enter Account ID"
                value={accountId}
                onChange={(e)=>
                    setAccountId(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-warning"
                onClick={verifyAccount}
            >
                Verify Account
            </button>

        </div>
    );
};

export default VerifyAccount;