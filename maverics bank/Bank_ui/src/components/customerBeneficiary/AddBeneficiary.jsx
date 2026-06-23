import { useState } from "react";
import axios from "axios";

const AddBeneficiary = () => {

    const [accountNumber, setAccountNumber] =
        useState("");

    const [nickname, setNickname] =
        useState("");

    const addBeneficiary =
        async (e) => {

            e.preventDefault();

            try {

                await axios.post(

                    "http://localhost:8080/api/beneficiary/add",

                    {
                        customerId:
                            localStorage.getItem(
                                "customerId"
                            ),

                        accountNumber,

                        nickname
                    },

                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Beneficiary Added Successfully"
                );

                setAccountNumber("");
                setNickname("");

            }
            catch(error){

                alert(
                    error.response?.data ||
                    "Failed To Add Beneficiary"
                );
            }
        };

    return (

        <div className="card p-4">

            <h4>
                Add Beneficiary
            </h4>

            <form onSubmit={addBeneficiary}>

                <div className="mb-3">

                    <label>
                        Account Number
                    </label>

                    <input
                        className="form-control"
                        value={accountNumber}
                        onChange={(e)=>
                            setAccountNumber(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="mb-3">

                    <label>
                        Nickname
                    </label>

                    <input
                        className="form-control"
                        value={nickname}
                        onChange={(e)=>
                            setNickname(
                                e.target.value
                            )
                        }
                    />

                </div>

                <button
                    className="btn btn-primary"
                >
                    Add Beneficiary
                </button>

            </form>

        </div>
    );
};

export default AddBeneficiary;