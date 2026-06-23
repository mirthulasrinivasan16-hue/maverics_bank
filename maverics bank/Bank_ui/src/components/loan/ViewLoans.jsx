import { useEffect, useState } from "react";
import axios from "axios";

const ViewLoans = () => {

    const [loans, setLoans] =
        useState([]);

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const [searchStatus, setSearchStatus] =
        useState("");

    const size = 5;

    const role =
        localStorage.getItem("role");

    const userId =
        localStorage.getItem("userId");

    const apiUrl =

        role === "EMPLOYEE"

            ? `http://localhost:8080/api/loan/employee/${userId}/v2?page=${page}&size=${size}`

            : `http://localhost:8080/api/loan/all/v2?page=${page}&size=${size}`;

    const fetchLoans = async () => {

        try {

            const response =
                await axios.get(

                    apiUrl,

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

            setLoans(
                response.data.data
            );

            setTotalPages(
                response.data.totalPages
            );
        }
        catch(error){

            console.log(error);
        }
    };

    useEffect(() => {

        fetchLoans();

    }, [page]);

    const approveLoan = async (loanId) => {

        try {

            await axios.put(
    `http://localhost:8080/api/loan/approve/${loanId}?userId=${localStorage.getItem("userId")}`,
    {},
    {
        headers:{
            Authorization:
                `Bearer ${localStorage.getItem("token")}`
        }
    }
);

            alert(
                "Loan Approved Successfully"
            );

            fetchLoans();

        }
        catch(error){

            alert(
                error?.response?.data ||
                "Approval Failed"
            );
        }
    };

    const rejectLoan = async (loanId) => {

        const reason =
            prompt(
                "Enter Rejection Reason"
            );

        if(!reason) return;

        try {

            await axios.put(
    `http://localhost:8080/api/loan/reject/${loanId}?userId=${localStorage.getItem("userId")}`,
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
                "Loan Rejected Successfully"
            );

            fetchLoans();

        }
        catch(error){

            alert(
                error?.response?.data ||
                "Rejection Failed"
            );
        }
    };

    const filteredLoans =
        searchStatus === ""

            ? loans

            : loans.filter(

                loan =>
                    loan.status === searchStatus
            );

    return (

        <div className="card p-4">

            <div className="d-flex justify-content-between align-items-center mb-3">

                <h4>
                    Loan Management
                </h4>

                <select
                    className="form-select w-auto"
                    value={searchStatus}
                    onChange={(e)=>
                        setSearchStatus(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        All Status
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
                        ESCALATED_TO_ADMIN
                    </option>

                    <option value="CLOSURE_REQUESTED">
                        CLOSURE_REQUESTED
                    </option>

                </select>

            </div>

            <table className="table table-bordered table-hover">

                <thead>

                <tr>

                    <th>ID</th>

                    <th>Customer</th>

                    <th>Loan Type</th>

                    <th>Amount</th>

                    <th>Interest</th>

                    <th>Tenure</th>

                    <th>Status</th>

                    <th>Recommendation</th>

                    <th>Eligibility Remark</th>

                    <th>Actions</th>

                </tr>

                </thead>

                <tbody>

                {
                    filteredLoans.map(loan => (

                        <tr key={loan.id}>

                            <td>
                                {loan.id}
                            </td>

                            <td>
                                {loan.customerName}
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

                                <span
                                    className={
                                        loan.status === "APPROVED"
                                            ? "badge bg-success"
                                            : loan.status === "REJECTED"
                                                ? "badge bg-danger"
                                                : loan.status === "ESCALATED_TO_ADMIN"
                                                    ? "badge bg-warning text-dark"
                                                    : "badge bg-secondary"
                                    }
                                >
                                    {loan.status}
                                </span>

                            </td>

                            <td>

                                {
                                    loan.recommendedAction === "APPROVE"

                                        ?

                                        <span className="badge bg-success">

                                            APPROVE

                                        </span>

                                        :

                                        <span className="badge bg-danger">

                                            REJECT

                                        </span>
                                }

                            </td>

                            <td
                                style={{
                                    minWidth:"250px"
                                }}
                            >

                                {
                                    loan.eligibilityRemark
                                }

                            </td>

                            <td>

                                {
                                    loan.status === "REQUESTED"
                                    &&

                                    <div className="d-flex gap-2">

                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() =>
                                                approveLoan(
                                                    loan.id
                                                )
                                            }
                                        >
                                            Approve
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() =>
                                                rejectLoan(
                                                    loan.id
                                                )
                                            }
                                        >
                                            Reject
                                        </button>

                                    </div>
                                }

                            </td>

                        </tr>
                    ))
                }

                </tbody>

            </table>

            <div className="d-flex justify-content-between align-items-center">

                <button
                    className="btn btn-secondary"
                    disabled={page === 0}
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                >
                    Previous
                </button>

                <span>

                    Page {page + 1}
                    {" "}
                    of
                    {" "}
                    {totalPages}

                </span>

                <button
                    className="btn btn-secondary"
                    disabled={
                        page + 1 === totalPages
                    }
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </button>

            </div>

        </div>
    );
};

export default ViewLoans;