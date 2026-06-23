import { useState } from "react";
import axios from "axios";

const ApplyAccount = () => {

    const [accountType, setAccountType] =
        useState("");

    const [aadhaarFile, setAadhaarFile] =
        useState(null);

    const [photoFile, setPhotoFile] =
        useState(null);

    const applyAccount =
        async (e) => {

            e.preventDefault();

            try {

                const accountResponse =
                    await axios.post(

                        "http://localhost:8080/api/account/add",

                        {
                            accountType,
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

                const accountId =
                    accountResponse.data.id;

                const formData =
                    new FormData();

                formData.append(
                    "aadhaar",
                    aadhaarFile
                );

                formData.append(
                    "photo",
                    photoFile
                );

                await axios.post(

                    `http://localhost:8080/api/account/upload-documents/${accountId}`,

                    formData,

                    {
                        headers:{
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                );

                alert(
                    "Account request submitted"
                );

            }
            catch(error){

    console.log("FULL ERROR:", error);

    console.log("RESPONSE:", error.response);

    console.log("DATA:", error.response?.data);

    alert(
        JSON.stringify(
            error.response?.data
        )
    );
}
        };

    return (

        <div className="card p-4">

            <h4>
                Apply Account
            </h4>

            <form onSubmit={applyAccount}>

                <select
                    className="form-select mb-3"
                    value={accountType}
                    onChange={(e)=>
                        setAccountType(
                            e.target.value
                        )
                    }
                >

                    <option value="">
                        Select Account Type
                    </option>

                    <option value="SAVINGS">
                        Savings
                    </option>

                    <option value="CURRENT">
                        Current
                    </option>

                </select>

                <label>
                    Aadhaar Document
                </label>

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e)=>
                        setAadhaarFile(
                            e.target.files[0]
                        )
                    }
                />

                <label>
                    Passport Size Photo
                </label>

                <input
                    type="file"
                    className="form-control mb-3"
                    onChange={(e)=>
                        setPhotoFile(
                            e.target.files[0]
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                >
                    Submit Request
                </button>

            </form>

        </div>
    );
};

export default ApplyAccount;