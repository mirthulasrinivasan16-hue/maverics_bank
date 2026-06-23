import { useEffect, useState } from "react";
import axios from "axios";

const ViewMyLoans = () => {

    const [loans, setLoans] =
        useState([]);

    const [statusFilter, setStatusFilter] =
        useState("");

    const fetchLoans =
        async () => {

            try {

                const customerId =
                    localStorage.getItem(
                        "customerId"
                    );

                const response =
                    await axios.get(

                        `http://localhost:8080/api/loan/customer/${customerId}`,

                        {
                            headers: {
                                Authorization:
                                    `Bearer ${localStorage.getItem("token")}`
                            }
                        }
                    );

                setLoans(
                    response.data
                );

            }
            catch (error) {

                console.log(error);
            }
        };

    useEffect(() => {

        fetchLoans();

    }, []);

    const requestClosure =
        async (loanId) => {

            try {

                await axios.put(

                    `http://localhost:8080/api/loan/request-closure/${loanId}`,

                    {},

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Loan Closure Request Submitted"
                );

                fetchLoans();

            }
            catch (error) {

                alert(
                    "Request Failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4 className="mb-3">
                My Loans
            </h4>

            <div className="row mb-3">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            All Statuses
                        </option>

                        <option value="REQUESTED">
                            REQUESTED
                        </option>

                        <option value="APPROVED">
                            APPROVED
                        </option>

                        <option value="REJECTED">
                            REJECTED
                        </option>

                        <option value="ESCALATED_TO_ADMIN">
                            ESCALATED TO ADMIN
                        </option>

                        <option value="CLOSURE_REQUESTED">
                            CLOSURE REQUESTED
                        </option>

                    </select>

                </div>

            </div>

            <table className="table table-bordered table-hover">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Loan Type</th>

                    <th>Amount</th>

                    <th>Interest</th>

                    <th>Tenure</th>

                    <th>Status</th>

                    <th>Action</th>

                </tr>

                </thead>

                <tbody>

                {
                    loans

                        .filter(loan =>

                            statusFilter === ""

                            ||

                            loan.status === statusFilter
                        )

                        .map(loan => (

                            <tr key={loan.id}>

                                <td>
                                    {loan.id}
                                </td>

                                <td>
                                    {loan.loanType}
                                </td>

                                <td>
                                    ₹{loan.loanAmount}
                                </td>

                                <td>
                                    {loan.interestRate}%
                                </td>

                                <td>
                                    {loan.tenureMonths}
                                </td>

                                <td>

                                    {
                                        loan.status === "REQUESTED" &&

                                        <span className="badge bg-warning text-dark">
                                            REQUESTED
                                        </span>
                                    }

                                    {
                                        loan.status === "APPROVED" &&

                                        <span className="badge bg-success">
                                            APPROVED
                                        </span>
                                    }

                                    {
                                        loan.status === "REJECTED" &&

                                        <span className="badge bg-danger">
                                            REJECTED
                                        </span>
                                    }

                                    {
                                        loan.status === "ESCALATED_TO_ADMIN" &&

                                        <span className="badge bg-info">
                                            ESCALATED
                                        </span>
                                    }

                                    {
                                        loan.status === "CLOSURE_REQUESTED" &&

                                        <span className="badge bg-secondary">
                                            CLOSURE REQUESTED
                                        </span>
                                    }

                                </td>

                                <td>

                                    {
                                        loan.status === "APPROVED"

                                        &&

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                requestClosure(
                                                    loan.id
                                                )
                                            }
                                        >
                                            Request Closure
                                        </button>
                                    }

                                    {
                                        loan.status === "CLOSURE_REQUESTED"

                                        &&

                                        <span className="text-muted">
                                            Requested
                                        </span>
                                    }

                                </td>

                            </tr>
                        ))
                }

                </tbody>

            </table>

            <div className="text-end">

                <span className="badge bg-primary">

                    Total Loans :
                    {" "}
                    {
                        loans.filter(loan =>

                            statusFilter === ""

                            ||

                            loan.status === statusFilter
                        ).length
                    }

                </span>

            </div>

        </div>
    );
};

export default ViewMyLoans;