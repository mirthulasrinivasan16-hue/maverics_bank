import { useState, useEffect } from "react";
import axios from "axios";

const ApplyLoan = () => {

    const [loanType, setLoanType] =
        useState("");

    const [loanAmount, setLoanAmount] =
        useState("");

    const [tenureMonths, setTenureMonths] =
        useState("");

    const [monthlySalary, setMonthlySalary] =
        useState("");

    const [interestRate, setInterestRate] =
        useState(0);

    const [monthlyEmi, setMonthlyEmi] =
        useState(0);

    const handleLoanTypeChange = (value) => {

        setLoanType(value);

        switch (value) {

            case "HOME_LOAN":
                setInterestRate(8.5);
                break;

            case "CAR_LOAN":
                setInterestRate(9.5);
                break;

            case "PERSONAL_LOAN":
                setInterestRate(12);
                break;

            case "EDUCATION_LOAN":
                setInterestRate(7);
                break;

            default:
                setInterestRate(0);
        }
    };

    useEffect(() => {

        if (
            !loanAmount ||
            !tenureMonths ||
            !interestRate
        ) {
            setMonthlyEmi(0);
            return;
        }

        const principal =
            parseFloat(loanAmount);

        const monthlyRate =
            interestRate / 12 / 100;

        const months =
            parseInt(tenureMonths);

        const emi =
            (
                principal *
                monthlyRate *
                Math.pow(
                    1 + monthlyRate,
                    months
                )
            )
            /
            (
                Math.pow(
                    1 + monthlyRate,
                    months
                ) - 1
            );

        setMonthlyEmi(
            emi.toFixed(2)
        );

    }, [
        loanAmount,
        tenureMonths,
        interestRate
    ]);

    const applyLoan =
        async (e) => {

            e.preventDefault();

            try {

               await axios.post(
    "http://localhost:8080/api/loan/add",
    {
        loanType,
        loanAmount,
        interestRate,
        tenureMonths,
        monthlyEmi,
        monthlySalary,
        customerId:
            localStorage.getItem(
                "customerId"
            )
    },
    {
        headers:{
            Authorization:
                `Bearer ${localStorage.getItem("token")}`
        }
    }
);
                alert(
                    "Loan request submitted successfully"
                );

                setLoanType("");
                setLoanAmount("");
                setTenureMonths("");
                setMonthlySalary("");
                setInterestRate(0);
                setMonthlyEmi(0);

            }
            catch (error) {

                console.log(error);

                alert(
                    "Loan application failed"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Apply Loan
            </h4>

            <form onSubmit={applyLoan}>

                <div className="mb-3">

                    <label>
                        Loan Type
                    </label>

                    <select
                        className="form-select"
                        value={loanType}
                        onChange={(e) =>
                            handleLoanTypeChange(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Loan Type
                        </option>

                        <option value="HOME_LOAN">
                            Home Loan
                        </option>

                        <option value="CAR_LOAN">
                            Car Loan
                        </option>

                        <option value="PERSONAL_LOAN">
                            Personal Loan
                        </option>

                        <option value="EDUCATION_LOAN">
                            Education Loan
                        </option>

                    </select>

                </div>

                <div className="mb-3">

                    <label>
                        Loan Amount
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={loanAmount}
                        onChange={(e) =>
                            setLoanAmount(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Tenure (Months)
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={tenureMonths}
                        onChange={(e) =>
                            setTenureMonths(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Monthly Salary
                    </label>

                    <input
                        type="number"
                        className="form-control"
                        value={monthlySalary}
                        onChange={(e) =>
                            setMonthlySalary(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Interest Rate (%)
                    </label>

                    <input
                        className="form-control"
                        value={interestRate}
                        readOnly
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Estimated EMI
                    </label>

                    <input
                        className="form-control"
                        value={
                            monthlyEmi
                                ? `₹${monthlyEmi}`
                                : ""
                        }
                        readOnly
                    />

                </div>

                <button
                    className="btn btn-primary"
                >
                    Apply Loan
                </button>

            </form>

        </div>
    );
};

export default ApplyLoan;