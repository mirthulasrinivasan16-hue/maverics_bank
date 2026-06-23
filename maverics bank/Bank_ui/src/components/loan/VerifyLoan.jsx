import { useState } from "react";
import axios from "axios";

const VerifyLoan = () => {

    const [loanId, setLoanId] =
        useState("");

    const userId =
    localStorage.getItem("userId");      

    const verifyLoan =
        async () => {

            try {

                await axios.put(

                    `http://localhost:8080/api/loan/verify/${loanId}?userId=${userId}`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Loan Verified Successfully"
                );
            }
            catch(error){

                console.log(error);

                alert(
                    "Verification Failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Verify Loan
            </h4>

            <input
                type="number"
                className="form-control mb-3"
                placeholder="Loan Id"
                value={loanId}
                onChange={(e)=>
                    setLoanId(e.target.value)
                }
            />

            <button
                className="btn btn-success"
                onClick={verifyLoan}
            >
                Verify Loan
            </button>

        </div>
    );
};

export default VerifyLoan;