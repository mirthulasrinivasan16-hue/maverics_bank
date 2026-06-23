import { useState } from "react";
import axios from "axios";

const ApproveLoan = () => {

    const [loanId, setLoanId] =
        useState("");

    const userId =
    localStorage.getItem("userId");      

    const approveLoan =
        async () => {

            if (!loanId) {

                alert(
                    "Enter Loan Id"
                );

                return;
            }

            try {

                await axios.put(

                    `http://localhost:8080/api/loan/approve/${loanId}?userId=${userId}`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Loan Approved Successfully"
                );

                setLoanId("");

            }
            catch(error){

                alert(
                    "Approval Failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Approve Loan
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

            <button
                className="btn btn-success"
                onClick={approveLoan}
            >
                Approve Loan
            </button>

        </div>
    );
};

export default ApproveLoan;