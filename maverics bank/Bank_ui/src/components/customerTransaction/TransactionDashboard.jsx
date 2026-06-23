import { useState } from "react";
import CustomerLayout from "../layouts/CustomerLayout";
import Deposit from "../components/customerTransaction/Deposit";
import Withdraw from "../components/customerTransaction/Withdraw";
import FundTransfer from "../components/customerTransaction/FundTransfer";
import TransactionHistory from "../components/customerTransaction/TransactionHistory";

const CustomerTransactionDashboard = () => {

    const [transactionType, setTransactionType] =
        useState("");

    return (

        <CustomerLayout>

            <div className="container-fluid">

                <h2 className="mb-4">
                    Transaction Management
                </h2>

                <div className="card p-4 mb-4">

                    <h4 className="mb-3">
                        Select Transaction Type
                    </h4>

                    <select
                        className="form-select"
                        value={transactionType}
                        onChange={(e) =>
                            setTransactionType(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Transaction
                        </option>

                        <option value="DEPOSIT">
                            Deposit
                        </option>

                        <option value="WITHDRAW">
                            Withdraw
                        </option>

                        <option value="TRANSFER">
                            Fund Transfer
                        </option>

                    </select>

                </div>

                {
                    transactionType === "DEPOSIT"
                    &&
                    <Deposit />
                }

                {
                    transactionType === "WITHDRAW"
                    &&
                    <Withdraw />
                }

                {
                    transactionType === "TRANSFER"
                    &&
                    <FundTransfer />
                }

                <div className="mt-4">

                    <TransactionHistory />

                </div>

            </div>

        </CustomerLayout>
    );
};

export default CustomerTransactionDashboard;