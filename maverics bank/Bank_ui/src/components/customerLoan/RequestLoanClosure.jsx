import { useState } from "react";
import axios from "axios";

const RequestLoanClosure = () => {

    const [loanId, setLoanId] =
        useState("");

    const requestClosure =
        async () => {

            try {

                await axios.put(
                    `http://localhost:8080/api/loan/request-close/${loanId}`,
                    {},
                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Closure request submitted"
                );

            }
            catch(error){

                console.log(error);
            }
        };

    return (

        <div className="card p-4">

            <input
                className="form-control mb-3"
                placeholder="Loan Id"
                value={loanId}
                onChange={(e)=>
                    setLoanId(
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

export default RequestLoanClosure;