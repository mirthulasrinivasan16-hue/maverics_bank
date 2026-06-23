import { useState } from "react";
import axios from "axios";

const RejectLoan = () => {

    const [loanId, setLoanId] =
        useState("");

    const [reason, setReason] =
        useState("");

    const userId =
    localStorage.getItem("userId");      

    const rejectLoan =
        async () => {

            if (!loanId) {

                alert(
                    "Enter Loan Id"
                );

                return;
            }

            try {

                await axios.put(

                    `http://localhost:8080/api/loan/reject/${loanId}?userId=${userId}`,

                    {
                        reason
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Loan Rejected Successfully"
                );

                setLoanId("");
                setReason("");

            }
            catch(error){

                alert(
                    "Reject Failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Reject Loan
            </h4>

            <input
                type="number"
                className="form-control mb-3"
                placeholder="Loan Id"
                value={loanId}
                onChange={(e)=>
                    setLoanId(
                        e.target.value
                    )
                }
            />

            <textarea
                className="form-control mb-3"
                placeholder="Rejection Reason"
                value={reason}
                onChange={(e)=>
                    setReason(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-danger"
                onClick={rejectLoan}
            >
                Reject Loan
            </button>

        </div>
    );
};

export default RejectLoan;