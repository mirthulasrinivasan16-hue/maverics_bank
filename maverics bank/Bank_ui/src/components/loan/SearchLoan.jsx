import { useState } from "react";
import axios from "axios";

const SearchLoan = () => {

    const [loanId, setLoanId] =
        useState("");

    const [loan, setLoan] =
        useState(null);

    const searchLoan =
        async () => {

            if (!loanId) {

                alert(
                    "Enter Loan Id"
                );

                return;
            }

            try {

                const response =
                    await axios.get(

                        `http://localhost:8080/api/loan/get-one/${loanId}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setLoan(
                    response.data
                );
            }
            catch(error){

                alert(
                    "Loan Not Found"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Search Loan
            </h4>

            <div className="row mb-3">

                <div className="col-md-10">

                    <input
                        type="number"
                        className="form-control"
                        placeholder="Loan Id"
                        value={loanId}
                        onChange={(e)=>
                            setLoanId(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-primary w-100"
                        onClick={searchLoan}
                    >
                        Search
                    </button>

                </div>

            </div>

            {
                loan &&

                <table className="table table-bordered">

                    <tbody>

                    <tr>
                        <th>ID</th>
                        <td>{loan.id}</td>
                    </tr>

                    <tr>
                        <th>Customer</th>
                        <td>{loan.customerName}</td>
                    </tr>

                    <tr>
                        <th>Loan Type</th>
                        <td>{loan.loanType}</td>
                    </tr>

                    <tr>
                        <th>Amount</th>
                        <td>₹{loan.loanAmount}</td>
                    </tr>

                    <tr>
                        <th>Interest</th>
                        <td>{loan.interestRate}%</td>
                    </tr>

                    <tr>
                        <th>Tenure</th>
                        <td>{loan.tenureMonths}</td>
                    </tr>

                    <tr>
                        <th>EMI</th>
                        <td>₹{loan.monthlyEmi}</td>
                    </tr>

                    <tr>
                        <th>Status</th>
                        <td>{loan.status}</td>
                    </tr>

                    </tbody>

                </table>
            }

        </div>
    );
};

export default SearchLoan;