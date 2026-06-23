import { useState } from "react";
import axios from "axios";

const RequestAccountClosure = () => {

    const [accountId, setAccountId] =
        useState("");

    const requestClosure =
        async () => {

            try {

                await axios.put(
                    `http://localhost:8080/api/account/request-close/${accountId}`,
                    {},
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Closure request submitted"
                );

                setAccountId("");

            }
            catch(error){

                alert(
                    "Unable to submit request"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Request Account Closure
            </h4>

            <input
                type="number"
                className="form-control mb-3"
                placeholder="Account Id"
                value={accountId}
                onChange={(e) =>
                    setAccountId(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-danger"
                onClick={requestClosure}
            >
                Request Closure
            </button>

        </div>
    );
};

export default RequestAccountClosure;